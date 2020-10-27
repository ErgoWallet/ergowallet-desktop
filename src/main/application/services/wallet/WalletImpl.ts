import {UnspentMonitor} from "./UnspentMonitor";
import {TransactionMonitor} from "./TransactionMonitor";
import {Connector} from "../../../ergoplatform/connector/Connector";
import {Wallet, WalletBox, WalletTx} from "./Wallet";
import {KeyManager as KeyManager3, KeyState} from "../../../../common/KeyManager";
import TransactionBuilder, {SignedTransaction, UnsignedTransaction} from "./TransactionBuilder";
import {MoneyUnits} from "../../../../common/MoneyUnits";
import {Output, TokenValue, Transaction} from "../../../ergoplatform/connector/types";
import {EventEmitter} from "events";

const {KeyManager, Address, sign_tx} = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");

export class WalletImpl extends EventEmitter implements Wallet {
  public static UPDATED_EVENT = 'WalletUpdated';

  private _keyManager: any;
  private connector: Connector;

  private unspentMonitor: UnspentMonitor;
  private transMonitor: TransactionMonitor;

  private unspentBoxes = new Map<string, WalletBox>();
  private transactions = new Map<string, WalletTx>();
  private keyManager3: KeyManager3;

  constructor(mnemonic: string, connector: Connector) {
    super();
    this.keyManager3 = KeyManager3.recover(mnemonic);
    this._keyManager = KeyManager.recover(mnemonic);

    this.connector = connector;
    this.unspentMonitor = new UnspentMonitor(this, connector);
    this.transMonitor = new TransactionMonitor(connector, this);
    this.transMonitor.on('LoadingStarted', ()  => {
      console.debug('transMonitor.LoadingStarted');
    });
    this.transMonitor.on('LoadingFinished', () => {
      console.debug('transMonitor.LoadingFinished');
    });

    this.unspentMonitor.start();
    this.transMonitor.start();
  }

  public signTransaction(tx: UnsignedTransaction): SignedTransaction {
    const boxesToSpend = [];
    const privateKeys = [];
    tx.ergoTx.inputs.forEach((input) => {
      const box = this.unspentBoxes.get(input.boxId);
      const ergBox = {
        ...box,
        value: Number(box.value),
        assets: box.assets.map((a) => ({ tokenId: a.tokenId, amount: Number(a.amount) }))
      };
      boxesToSpend.push(ergBox);

      const address = box.address;
      // get private key for address
      const privateKey = this.keyManager3.getSecretKey(address);
      privateKeys.push(privateKey.toString('hex'));
    });

    // Sign tx

    // console.debug("ergoTx");
    // console.debug(JSON.stringify(tx.ergoTx));
    // console.debug("-------------");

    const signed = sign_tx(privateKeys, boxesToSpend, tx.ergoTx);
    // console.log('Signed TX: ' + JSON.stringify(signed));
    tx.ergoTx = signed;
    return tx;
  }

  public createTransaction(
    spendingBoxes: Array<string>,
    recipient: string,
    amount: string,
    fee: string,
    tokenId: string,
    currentHeight: number
  ): UnsignedTransaction {
    // get next clean change address
    this.keyManager3.assertCleanKeys();
    const changeKey = this.keyManager3.getKeys(KeyState.Clean, true)[0];

    const context = { height: currentHeight };
    const builder = new TransactionBuilder(this.unspentBoxes, context);
    return builder.create(spendingBoxes, recipient, amount, fee, changeKey.address, tokenId);
  }

  public getConfirmedTransactions(address: string): Array<any> {
    const addressFilter = (tx: WalletTx) =>
      (tx.inputs.find(i => i.address === address) || tx.outputs.find(o => o.address === address)) &&
      tx.confirmationsCount > 0;

    return Array.from(this.transactions.values()).filter(tx =>addressFilter(tx));
  }

  public addUnspent(box: Output): void {
    if (!this.unspentBoxes.get(box.id)) {
      console.log(`Adding ${JSON.stringify(box)}`);

      const foundKey = this.keyManager3.getKey(box.address);
      let addressType = "foreign";
      if (foundKey) {
        addressType = foundKey.internal ? "change" : "receive";
      }

      const walletBox: WalletBox = {
        boxId: box.id,
        transactionId: box.txId,
        value: box.value.toString(),
        additionalRegisters: box.additionalRegisters,
        assets: Array.from(box.assets.map((a: TokenValue) => ({tokenId: a.tokenId, amount: a.amount.toString()}))),
        index: box.index,
        ergoTree: box.ergoTree,
        creationHeight: Number(box.creationHeight.toString()),
        address: box.address,
        addressType,
        spentTransactionId: box.spentTransactionId
      };
      this.unspentBoxes.set(box.id, walletBox);
      this.emit(WalletImpl.UPDATED_EVENT, {});
    }
  }

  public processTransactions(transactions: Array<Transaction>): void {
    transactions.forEach((tx: Transaction) => {

      const walletTx: WalletTx = {
        ...tx,
        value: "",
        outputs: []
      };

      tx.outputs.forEach((output, index) => {

        let addressType = "foreign";
        // TODO: search key for ErgoTree
        const foundKey = this.keyManager3.getKey(output.address);
        if (foundKey) {
          addressType = foundKey.internal ? "change" : "receive";
          this.keyManager3.markUsed(output.address);
        }

        const walletBox: WalletBox = {
          boxId: output.id,
          transactionId: output.txId,
          value: output.value.toString(),
          additionalRegisters: output.additionalRegisters,
          assets: Array.from(output.assets.map((a: TokenValue) => ({tokenId: a.tokenId, amount: a.amount.toString()}))),
          index: output.index,
          ergoTree: output.ergoTree,
          creationHeight: Number(output.creationHeight.toString()),
          address: output.address,
          addressType,
          spentTransactionId: output.spentTransactionId
        };

        walletTx.outputs.push(walletBox);
      });

      tx.inputs.forEach((input) => {
        // remove spent boxes from wallet
        if (tx.confirmationsCount >= 1) {
          this.unspentBoxes.delete(input.id);
        } else {
          this.unspentBoxes.get(input.id).spentTransactionId = tx.id;
        }
      });

      const walletInputs = tx.inputs.filter((i) => this.keyManager3.getKey(i.address) !== undefined);
      const walletOutputs = tx.outputs.filter((i) => this.keyManager3.getKey(i.address) !== undefined);

      // calculate tx value regarding our wallet
      const received = walletOutputs.reduce(
          (total: MoneyUnits, item: any) => total.plus(new MoneyUnits(item.value, 9)),
          new MoneyUnits(0, 9)
        );

      const spent = walletInputs.reduce(
          (total: MoneyUnits, item: any) => total.plus(new MoneyUnits(item.value, 9)),
          new MoneyUnits(0, 9)
        );

      const balance = received.minus(spent);

      walletTx.value = balance.amount;


      // update tx in storage
      this.transactions.set(tx.id, walletTx);
      this.emit(WalletImpl.UPDATED_EVENT, {});

    });
  }

  public getAddresses(): any {
    return this.keyManager3.hdPubKeys.map((item) => {
      return {
        address: item.address,
        publicKey: item.pubKey().toString('hex'),
        path: item.hdPath,
        state: item.state.toString(),
        internal: item.internal
      };
    });
  }

  public close(): void {
    this.unspentMonitor.stop();
    this.transMonitor.stop();
    this.removeAllListeners(WalletImpl.UPDATED_EVENT);
  }

  public getAllTransactions(): Array<WalletTx> {
    return Array.from(this.transactions.values());
  }

  public getUnspentBoxes(): Array<WalletBox> {
    return Array.from(this.unspentBoxes.values());
  }

  public static validateAddress(address: string): string {
    return Address.validate(address);
  }
}
