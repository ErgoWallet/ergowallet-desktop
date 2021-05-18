import * as vault from './ipc-handlers/vault';
import * as wallet from './ipc-handlers/wallet';
import * as app from './ipc-handlers/app';
import {Connector} from '../ergoplatform/connector/Connector';
import {ExplorerClient} from '../ergoplatform/connector/providers/explorer/explorer';
import {Vault} from "./services/vault/Vault";
import {Wallet, WalletBox} from './services/wallet/Wallet';
import {WalletImpl} from "./services/wallet/WalletImpl";
import {BlockchainService} from './services/blockchain/BlockchainService';
import {UpdateService} from "./services/updater/UpdateService";
import * as bip39 from 'bip39';
import {SignedTransaction, UnsignedTransaction} from "./services/wallet/TransactionBuilder";
import {EventEmitter} from 'events';
import Settings from "./Settings";
import _ from "lodash";
import logger from "./logger";

export default class Application extends EventEmitter {
  public static APP_READY_EVENT = 'AppReady';
  public static APP_LATEST_VERSION = 'LatestVersion';

  private baseUri = "https://api.ergoplatform.com/api/v0";

  private vault: Vault;
  private currentWallet: Wallet | null = null;
  private readonly connector: Connector;
  private blockchain: BlockchainService;
  private settings: Settings;
  private updater: UpdateService;
  private started: boolean;
  private userDataDir: string;

  constructor(userDataDir: string) {
    super();
    this.userDataDir = userDataDir;
    this.vault = new Vault(userDataDir);
    this.started = false;
    this.connector = new Connector(new ExplorerClient(this.baseUri));
    this.blockchain = new BlockchainService(this.connector);
    this.blockchain.on(BlockchainService.HEIGHT_CHANGED_EVENT, (event) => {
      logger.debug(JSON.stringify(event));
    });
    this.updater = new UpdateService();
    this.updater.on(UpdateService.CURRENT_VERSION_EVENT, (event) => {
      const latestVer = event.tag_name ? _.trimStart(event.tag_name, "v") : null;
      logger.debug(`Latest version: ${latestVer}`);
      this.emit(Application.APP_LATEST_VERSION, latestVer);
    });
  }

  public start(): void {
    if (this.started) {
      return;
    }
    this.blockchain.start();
    this.updater.start();
    this.setIpcHandlers();

    // Load settings
    this.settings = new Settings();
    this.emit(Application.APP_READY_EVENT);
    this.started = true;
  }

  public stop(): void {
    this.updater.stop();
    this.blockchain.stop();
    this.blockchain.removeAllListeners(BlockchainService.HEIGHT_CHANGED_EVENT);
    this.closeCurrentWallet();
  }

  private setIpcHandlers(): void {
    vault.setHandlers(this);
    wallet.setHandlers(this);
    app.setHandlers(this);
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

  public importPrivateKey(walletName: string, privateKey: string, walletPassword: string): void {
    return this.vault.importPrivateKey(walletName, privateKey, walletPassword);
  }

  public importWallet(walletName: string, mnemonic: string, passphrase: string, walletPassword: string): void {
    return this.vault.importWallet(walletName, mnemonic, passphrase, walletPassword);
  }

  public loadWallet(walletName: string, walletPassword: string): boolean {
    const bip39Data = this.vault.getWalletData(walletName);

    logger.info(`Loading wallet [${walletName}]`);

    const wallet = new WalletImpl(
      bip39Data,
      this.connector,
    );
    wallet.on(WalletImpl.UPDATED_EVENT, () => {
      this.emit('WalletUpdated');
    });
    wallet.on(WalletImpl.TXS_LOADING, (isLoading) => {
      logger.debug(`Received WalletImpl.TXS_LOADING:${isLoading}`);
      this.emit('WalletHistoryLoading', isLoading);
    });
    wallet.on(WalletImpl.UNSPENT_LOADING, (isLoading) => {
      this.emit('WalletUnspentLoading', isLoading);
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

  public getUnspentBoxes(): Array<WalletBox> {
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

  public createTx(spendingBoxes: Array<string>, recipient: string, amount: string, fee: string, tokenId: string) {
    if (this.currentWallet != null) {
      const height = this.blockchain.currentHeight;
      if (!height) {
        throw new Error('Current height is undefined');
      }

      return this.currentWallet.createTransaction(spendingBoxes, recipient, amount, fee, tokenId, height);
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

  public getSettings(): any {
    return this.settings.data();
  }

  public updateSettings(settings: any) {
    logger.debug('Updating settings: ' + JSON.stringify(settings));
    this.settings.update(settings);
    this.emit('SettingsUpdated');
  }
}
