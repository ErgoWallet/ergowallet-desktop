import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import {BIP32Interface} from "bip32";

const {Address, parse_hd_path} = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");

export enum KeyState {
  Clean = 'clean',
  Used = 'used'
}

class HdPubKey {
  private bip32: BIP32Interface;
  public hdPath: string;
  public address: string;
  public state: KeyState;

  /** Internal means it is for change only. */
  public internal: boolean;

  constructor(bip32: BIP32Interface, fullHdPath: string) {
    const pathIndices = parse_hd_path(fullHdPath);
    this.internal = pathIndices[3] > 0;

    this.bip32 = bip32;
    this.hdPath = fullHdPath;
    this.address = Address.from_public_key(this.bip32.publicKey).get_addr();
    this.state = KeyState.Clean;
  }

  public setState(state: KeyState): void {
    this.state = state;
  }

  public index(): number {
    return this.bip32.index;
  }

  public pubKey(): Buffer {
    return this.bip32.publicKey;
  }

  public privateKey(): Buffer {
    return this.bip32.privateKey;
  }

}

export class KeyManager {

  static AccountDerivationPath = "m/44'/429'/0'";
  private accountExtKey: BIP32Interface;
  private watchOnly: boolean;

  hdPubKeys: Array<HdPubKey> = [];

  static recover(mnemonic: string): KeyManager {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const masterKey = bip32.fromSeed(seed);
    const accountExtKey = masterKey.derivePath(KeyManager.AccountDerivationPath);
    const km = new KeyManager(accountExtKey);

    km.assertCleanKeys();

    return km;
  }

  constructor(accountExtKey: BIP32Interface) {
    this.accountExtKey = accountExtKey;
    this.watchOnly = (accountExtKey.privateKey === undefined);
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
   * Make sure there's always clean keys generated.
   */
  public  assertCleanKeys(): void {
    while (this.getKeys(KeyState.Clean, false).length < 21) {
      this.generateNewKey(false);
    }

    while (this.getKeys(KeyState.Clean, true).length < 21) {
      this.generateNewKey(true);
    }
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

    const bip32Interface = this.accountExtKey.derivePath(path);
    const newKey = new HdPubKey(bip32Interface, `${KeyManager.AccountDerivationPath}/${path}`);
    this.hdPubKeys.push(newKey);
    return newKey;
  }

  private maxKeyIndex(keys: HdPubKey[]): number {
    let max = 0;
    keys.forEach((key: HdPubKey) => {
      if (key.index() > max) {
        max = key.index();
      }
    });
    return max;
  }

}
