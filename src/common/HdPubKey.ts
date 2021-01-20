const {Address, parseHdPath} = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");

export enum KeyState {
  Clean = 'clean',
  Used = 'used'
}

export class HdPubKey {
  public hdPath: string;
  public address: string;
  public state: KeyState;
  public index: number;
  /** Internal means it is for change only. */
  public internal: boolean;

  private readonly publicKey: Buffer;

  constructor(publicKey: Buffer, index: number, fullHdPath: string) {
    const pathIndices = parseHdPath(fullHdPath);
    this.internal = pathIndices[3] > 0;

    this.publicKey = Buffer.from(publicKey);
    this.index = index;

    this.hdPath = fullHdPath;
    this.address = Address.from_public_key(this.publicKey).get_addr();
    this.state = KeyState.Clean;
  }

  public setState(state: KeyState): void {
    this.state = state;
  }

  public pubKey(): Buffer {
    return this.publicKey;
  }
}
