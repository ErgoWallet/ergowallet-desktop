import {IKeyManager} from "./IKeyManager";
import {HdPubKey, KeyState} from "./HdPubKey";

const {Address, publicFromSecret} = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");

export class SingleKeyManager implements IKeyManager {
  private secretKey: string;
  private hdPubKey: HdPubKey;

  static recover(privateKey: string): IKeyManager {

    const km = new SingleKeyManager(privateKey);

    km.assertCleanKeys();
    return km;
  }

  constructor(secretKey: string) {
    this.secretKey = secretKey;
    const publicKey = publicFromSecret(this.secretKey);
    this.hdPubKey = new HdPubKey(Buffer.from(publicKey), 0, "m/44'/429'/0'/0/0");
  }

  public allKeys(): HdPubKey[] {
    return [this.hdPubKey];
  }

  /**
   * Mark key for address as used
   * @param address
   */
  public markUsed(address: string): void {
    this.hdPubKey.setState(KeyState.Used);
  }

  public getKey(address: string): HdPubKey {
    if (this.hdPubKey.address === address)
      return this.hdPubKey;
    return undefined;
  }

  public getKeys(state: KeyState, internal: boolean): Array<HdPubKey> {
    return [this.hdPubKey];
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
    return;
  }

  public getSecretKey(address: string): Buffer {
    return Buffer.from(this.secretKey, 'hex');
  }

  public generateNewKey(internal = false): HdPubKey {
    return this.hdPubKey;
  }
}
