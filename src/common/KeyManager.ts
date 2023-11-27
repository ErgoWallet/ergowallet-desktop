import * as bip39 from './bip39';
import { IKeyManager } from "./IKeyManager";
import { HdPubKey, KeyState } from "./HdPubKey";
import { HDKey } from '@scure/bip32';
import { invoke } from "@tauri-apps/api/primitives";
import { toHexString } from './utils';

export class KeyManager implements IKeyManager {
  static AccountDerivationPath = "m/44'/429'/0'";
  private accountExtPubKey: HDKey;
  private extMasterKey: HDKey;
  private watchOnly: boolean;

  hdPubKeys: Array<HdPubKey> = [];

  static async recover(mnemonic: string, passphrase?: string): Promise<KeyManager> {
    const seed = bip39.mnemonicToSeedSync(mnemonic, passphrase);

    const masterKey = HDKey.fromMasterSeed(seed);
    //const masterKey = //bip32.fromSeed(seed);
    const km = new KeyManager(masterKey);

    await km.assertCleanKeys();
    return km;
  }

  constructor(masterKey: HDKey) {
    this.extMasterKey = masterKey;
    this.accountExtPubKey = masterKey
      .derive(KeyManager.AccountDerivationPath)
      .wipePrivateData();

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
  public async getNextChangeKey(): Promise<HdPubKey> {
    await this.assertCleanKeys();
    return this.getKeys(KeyState.Clean, true)[0];
  }
  /**
   * Make sure there's always clean keys generated.
   */
  public async assertCleanKeys(): Promise<void> {
    while (this.getKeys(KeyState.Clean, false).length < 21) {
      await this.generateNewKey(false);
    }

    while (this.getKeys(KeyState.Clean, true).length < 21) {
      await this.generateNewKey(true);
    }
  }

  public getSecretKey(address: string): Uint8Array {
    // find HD Public Key
    const hdPubKey = this.getKey(address);
    const hdPath = hdPubKey.hdPath;

    const bip32Interface = this.extMasterKey.derive(hdPath);
    return bip32Interface.privateKey!;
  }

  public async generateNewKey(internal = false): Promise<HdPubKey> {
    // BIP44 derivation scheme
    // m / purpose' / coin_type' / account' / change / address_index

    const change = internal ? 1 : 0;
    let path = `${change}/0`; // path part for first key

    const relevantKeys = this.hdPubKeys.filter((key) => key.internal === internal);
    let index = 0;
    if (relevantKeys.length > 0) {
      // there is keys -> should calculate correct path for next one
      const largestIndex = this.maxKeyIndex(relevantKeys);
      // TODO: detect gaps by finding smallest indexes and etc
      index = largestIndex + 1;
    }
    path = `${change}/${index}`;

    const hdKey = this.accountExtPubKey.deriveChild(change).deriveChild(index);
    const addr: string = await invoke('pk2address', { pubKey: toHexString(hdKey.publicKey) })
    const newKey = new HdPubKey(
      hdKey.publicKey,
      hdKey.index,
      `${KeyManager.AccountDerivationPath}/${path}`,
      internal,
      addr);
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
