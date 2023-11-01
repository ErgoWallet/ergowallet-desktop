import {HdPubKey} from "./HdPubKey";

export interface IKeyManager {
  markUsed(address: string): void;
  getSecretKey(address: string): Uint8Array;
  getKey(address: string): HdPubKey;
  getNextChangeKey(): HdPubKey;
  allKeys(): Array<HdPubKey>;
}