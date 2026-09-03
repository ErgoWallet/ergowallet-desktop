//const {Address, parseHdPath} = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");

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

  private readonly publicKey: Uint8Array;

  constructor(publicKey: Uint8Array, index: number, fullHdPath: string, internal: boolean, address: string) {
    //FIXME parseHdPath(fullHdPath);
    // const pathIndices = []; 
    // this.internal = pathIndices[3] > 0;

    this.internal = internal;
    this.publicKey = publicKey;
    this.index = index;

    this.hdPath = fullHdPath;
    this.state = KeyState.Clean;
    this.address = address;
  }

  public setState(state: KeyState): void {
    this.state = state;
  }

  public pubKey(): Uint8Array {
    return this.publicKey;
  }
}
