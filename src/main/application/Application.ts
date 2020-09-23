import * as vault from './ipc-handlers/vault';
import * as wallet from './ipc-handlers/wallet';
import {Connector} from '../ergoplatform/connector/Connector';
import {ExplorerClient} from '../ergoplatform/connector/providers/explorer/explorer';
import {Vault} from "./services/vault/Vault";
import {Wallet} from './services/wallet/Wallet';
import {WalletImpl} from "./services/wallet/WalletImpl";
import {BlockchainService} from './services/blockchain/BlockchainService';
import * as bip39 from 'bip39';
import {SignedTransaction, UnsignedTransaction} from "./services/wallet/TransactionBuilder";
import {ErgoBox} from "../../common/backend-types";
import { EventEmitter } from 'events';

export default class Application extends EventEmitter {

  private baseUri = "https://api.ergoplatform.com/api/v0";

  private vault = new Vault();
  private currentWallet: Wallet | null = null;
  private readonly connector: Connector;
  private blockchain: BlockchainService;

  constructor() {
    super();
    this.connector = new Connector(new ExplorerClient(this.baseUri));
    this.blockchain = new BlockchainService(this.connector);
    this.blockchain.on(BlockchainService.HEIGHT_CHANGED_EVENT, (event) => {
      console.log(JSON.stringify(event));
    });
  }

  public start(): void {
    this.blockchain.start();
    this.setIpcHandlers();
  }

  public stop(): void {
    this.blockchain.stop();
    this.blockchain.removeAllListeners(BlockchainService.HEIGHT_CHANGED_EVENT);
    this.closeCurrentWallet();
    this.removeAllListeners('WalletUpdated');
  }

  private setIpcHandlers(): void {
    vault.setHandlers(this);
    wallet.setHandlers(this);
  }

  public generateMnemonic(): string {
    return bip39.generateMnemonic(128);
  }

  public getWallets(): Array<any> {
    return this.vault.getWallets();
  }

  public isWalletExists(walletName: string): boolean {
    const wallet = this.vault.getWalletData(walletName);
    return !!wallet;
  }

  public importWallet(walletName: string, mnemonic: string, password: string): void {
    return this.vault.importWallet(walletName, mnemonic, password);
  }

  public loadWallet(walletName: string, walletPwd: string): boolean {
    const walletData = this.vault.getWalletData(walletName);

    console.log(`Loading wallet [${walletName}]`);

    const wallet = new WalletImpl(
      walletData.mnemonic,
      this.connector,
    );
    wallet.on(WalletImpl.UPDATED_EVENT, () => {
      this.emit('WalletUpdated');
    });
    this.currentWallet = wallet;
    return true;
  }

  public getAddresses(): Array<any> {
    if (this.currentWallet != null) {
      return this.currentWallet.getAddresses();
    }
    return [];
  }

  public getUnspentBoxes(): Array<ErgoBox> {
    if (this.currentWallet == null) {
      return [];
    }
    return this.currentWallet.getUnspentBoxes();
  }

  public getTransactions(): Array<any> {
    if (this.currentWallet != null) {
      return this.currentWallet.getAllTransactions();
    }
    return [];
  }

  public closeCurrentWallet(): void {
    this.currentWallet?.close();
    this.currentWallet = null;
  }

  public validateAddress(address: string): string {
    return WalletImpl.validateAddress(address);
  }

  public createTx(spendingBoxes: Array<string>, recipient: string, amount: string, fee: string) {
    if (this.currentWallet != null) {
      const height = this.blockchain.currentHeight;
      if (!height) {
        throw new Error('Current height is undefined');
      }

      return this.currentWallet.createTransaction(spendingBoxes, recipient, amount, fee, height);
    }
    throw new Error('There is no loaded wallet');
  }

  public signTx(tx: UnsignedTransaction): SignedTransaction {
    if (this.currentWallet != null) {
      return this.currentWallet.signTransaction(tx);
    }
    throw new Error('There is no loaded wallet');
  }

  public async sendTx(tx: any) {
    const txId = await this.connector.sendTransaction(tx);
    if (this.currentWallet != null) {
      // get tx from mempool
      try {
        const unconfirmedTx = await this.connector.getUnconfirmed(txId);
        this.currentWallet.processTransactions([unconfirmedTx]);
      } catch (e) {
        // this is not critical error, tx will be obtained later
        console.warn(e);
      }
    }
    return txId;
  }
}


