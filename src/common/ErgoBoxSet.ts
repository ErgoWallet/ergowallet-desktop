import {ErgoTokenAmount} from "./backend-types";
import {WalletBox} from "../main/application/services/wallet/Wallet";

export class ErgoBoxSet {
  private boxes: Array<WalletBox>;
  private balances: Map<string, bigint> = new Map();

  constructor(boxes: Array<WalletBox>) {
    this.boxes = Array.from(boxes);
    // Calculate balances balances
    let ergValue = BigInt(0);
    this.boxes.forEach((box: WalletBox) => {
      ergValue += BigInt(box.value);
      box.assets.forEach((a: ErgoTokenAmount) => {
        let amount = this.balances.get(a.tokenId);
        amount = (amount||BigInt(0)) + BigInt(a.amount);
        this.balances.set(a.tokenId, amount);
      });
    });
    this.balances.set('ERG', ergValue);
  }

  public assetsIds(): Array<string> {
    return Array.from(this.balances.keys());
  }

  public balance(tokenId: string): bigint {
    return this.balances.get(tokenId) || BigInt(0);
  }

  public filter(f: (key: string, value: bigint) => boolean): Map<string, bigint> {
    const result = new Map<string, bigint>();
    this.balances.forEach((value, key) => {
      if (f(key, value)) {
        result.set(key, value);
      }
    });
    return result;
  }
}