import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import {BIP32Interface} from "bip32";
import {IKeyManager} from "./IKeyManager";
import {HdPubKey, KeyState} from "./HdPubKey";

const {Address, parse_hd_path} = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");


export class KeyManager implements IKeyManager {
  static AccountDerivationPath = "m/44'/429'/0'";
  private accountExtPubKey: BIP32Interface;
  private extMasterKey: BIP32Interface;
  private watchOnly: boolean;

  hdPubKeys: Array<HdPubKey> = [];

  static recover(mnemonic: string, passphrase?: string): KeyManager {
    const seed: Buffer = bip39.mnemonicToSeedSync(mnemonic, passphrase);

    const masterKey = bip32.fromSeed(seed);
    const km = new KeyManager(masterKey);

    km.assertCleanKeys();
    return km;
  }

  constructor(masterKey: BIP32Interface) {
    this.extMasterKey = masterKey;
    this.accountExtPubKey = masterKey.derivePath(KeyManager.AccountDerivationPath);

    delete this.accountExtPubKey.privateKey;

    this.watchOnly = (masterKey.privateKey === undefined);
  }

  public allKeys(): Array<HdPubKey> {
    return this.hdPubKeys;
  }
  /**
   * Mark key for address as used
   * @param address
   */
  public markUsed(address: string): void {
    const key = this.getKey(address);
    if (key) {
      const index = this.hdPubKeys.indexOf(key);
      this.hdPubKeys[index].setState(KeyState.Used);
    } else {
      throw new Error(`Key for address ${address} not found`);
    }
  }

  public getKey(address: string): HdPubKey {
    return this.hdPubKeys.find((key) => key.address === address);
  }

  public getKeys(state: KeyState, internal: boolean): Array<HdPubKey> {
    return this.hdPubKeys.filter((k) => k.state === state && k.internal === internal);
  }

  /**
   * Returns next unused key for change
   */
  public getNextChangeKey(): HdPubKey {
    this.assertCleanKeys();
    return this.getKeys(KeyState.Clean, true)[0];
  }
  /**
   * Make sure there's always clean keys generated.
   */
  public assertCleanKeys(): void {
    while (this.getKeys(KeyState.Clean, false).length < 21) {
      this.generateNewKey(false);
    }

    while (this.getKeys(KeyState.Clean, true).length < 21) {
      this.generateNewKey(true);
    }
  }

  public getSecretKey(address: string): Buffer {
    // find HD Public Key
    const hdPubKey = this.getKey(address);
    const hdPath = hdPubKey.hdPath;

    const bip32Interface = this.extMasterKey.derivePath(hdPath);
    return bip32Interface.privateKey!;
  }

  public generateNewKey(internal = false): HdPubKey {
    // BIP44 derivation scheme
    // m / purpose' / coin_type' / account' / change / address_index

    const change = internal ? 1 : 0;
    let path = `${change}/0`; // path part for first key

    const relevantKeys = this.hdPubKeys.filter((key) => key.internal === internal);
    if (relevantKeys.length > 0) {
      // there is keys -> should calculate correct path for next one
      const largestIndex = this.maxKeyIndex(relevantKeys);
      // TODO: detect gaps by finding smallest indexes and etc
      path = `${change}/${largestIndex + 1}`;
    }

    const bip32Interface = this.accountExtPubKey.derivePath(path);
    const newKey = new HdPubKey(
      bip32Interface.publicKey,
      bip32Interface.index,
      `${KeyManager.AccountDerivationPath}/${path}`);
    this.hdPubKeys.push(newKey);
    return newKey;
  }

  private maxKeyIndex(keys: HdPubKey[]): number {
    let max = 0;
    keys.forEach((key: HdPubKey) => {
      if (key.index > max) {
        max = key.index;
      }
    });
    return max;
  }
}
