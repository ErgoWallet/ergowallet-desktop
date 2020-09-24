import {ErgoBox, ErgoTokenAmount} from "./backend-types";

export class ErgoBoxSet {
  private boxes: Array<ErgoBox>;
  private balances: Map<string, bigint> = new Map();

  constructor(boxes: Array<ErgoBox>) {
    this.boxes = Array.from(boxes);
    // Calculate balances balances
    let ergValue = BigInt(0);
    this.boxes.forEach((box: ErgoBox) => {
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
    return this.balances.get(tokenId);
  }
}