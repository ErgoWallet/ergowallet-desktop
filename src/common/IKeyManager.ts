import {HdPubKey} from "./HdPubKey";

export interface IKeyManager {
  markUsed(address: string): void;
  getSecretKey(address: string): Buffer;
  getKey(address: string): HdPubKey;
  getNextChangeKey(): HdPubKey;
  allKeys(): Array<HdPubKey>;
}