import {UnspentMonitor} from "./UnspentMonitor";
import {TransactionMonitor} from "./TransactionMonitor";
import {Connector} from "../../../ergoplatform/connector/Connector";
import {Wallet, WalletBox, WalletTx} from "./Wallet";
import {KeyManager as KeyManager3} from "../../../../common/KeyManager";
import {SingleKeyManager} from "../../../../common/SingleKeyManager";
import TransactionBuilder, {SignedTransaction, UnsignedTransaction} from "./TransactionBuilder";
import {MoneyUnits} from "../../../../common/MoneyUnits";
import {Output, TokenValue, Transaction, UnconfirmedTransaction} from "../../../ergoplatform/connector/types";
import {EventEmitter} from "events";
import {BIP39, SingleKeyWallet} from "../vault/Vault";
import {IKeyManager} from "../../../../common/IKeyManager";
import logger from "../../logger";

// @ts-ignore
const {KeyManager, Address, Transaction} = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");

export class WalletImpl extends EventEmitter implements Wallet {
  public static UPDATED_EVENT = 'WalletUpdated';
  public static TXS_LOADING = 'LoadingHistory';
  public static UNSPENT_LOADING = 'LoadingUnspent';

  private connector: Connector;

  private unspentMonitor: UnspentMonitor;
  private transMonitor: TransactionMonitor;

  private unspentBoxes = new Map<string, WalletBox>();
  private transactions = new Map<string, WalletTx>();
  private keyManager3: IKeyManager;

  constructor(bip39: BIP39 | SingleKeyWallet, connector: Connector) {
    super();
    if ("mnemonic" in bip39) {
      this.keyManager3 = KeyManager3.recover(bip39.mnemonic, bip39.passphrase);
    } else if ((bip39 as SingleKeyWallet).privateKey) {
      this.keyManager3 = SingleKeyManager.recover(bip39.privateKey);
    }

    //this._keyManager = KeyManager.recover(bip32.mnemonic);

    this.connector = connector;
    this.unspentMonitor = new UnspentMonitor(connector, this);
    this.transMonitor = new TransactionMonitor(connector, this);
    //TODO: may be one event with true/false ?
    this.transMonitor.on('LoadingStarted', ()  => {
      this.emit(WalletImpl.TXS_LOADING, true);
    });
    this.transMonitor.on('LoadingFinished', () => {
      this.emit(WalletImpl.TXS_LOADING, false);
    });

    this.unspentMonitor.on('LoadingStarted', ()  => {
      this.emit(WalletImpl.UNSPENT_LOADING, true);
    });
    this.unspentMonitor.on('LoadingFinished', () => {
      this.emit(WalletImpl.UNSPENT_LOADING, false);
    });

    this.unspentMonitor.start();
    this.transMonitor.start();
  }
  getTransaction(txId: string): WalletTx {
    return this.transactions.get(txId);
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
    const signed = Transaction
      .sign(privateKeys, boxesToSpend, tx.ergoTx)
      .to_json();
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
    const changeKey = this.keyManager3.getNextChangeKey();

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
      logger.debug(`Adding ${JSON.stringify(box)}`);

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

  public processTransactions(transactions: Array<Transaction | UnconfirmedTransaction>): void {
    transactions.forEach((tx: Transaction | UnconfirmedTransaction) => {

      const timestamp = (tx as Transaction).timestamp || (tx as UnconfirmedTransaction).creationTimestamp;
      const walletTx: WalletTx = {
        ...tx,
        timestamp,
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
    logger.debug(`Wallet processed ${transactions.length} txs. Current hold ${this.transactions.size} txs.`);
  }

  public getAddresses(): any {
    return this.keyManager3.allKeys().map((item) => {
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
    this.removeAllListeners(WalletImpl.TXS_LOADING);
  }

  /**
   * Returns array sorted by Timestamp
   */
  public getAllTransactions(): Array<WalletTx> {
    const txs = Array.from(this.transactions.values());
    // return txs.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
    return txs;
  }

  public getUnspentBoxes(): Array<WalletBox> {
    return Array.from(this.unspentBoxes.values());
  }

  public static validateAddress(address: string): string {
    if (!Address.validate(address)) {
      return "Invalid address";
    }
    return '';
  }
}
