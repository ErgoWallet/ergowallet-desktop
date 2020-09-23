import BigNumber from 'bignumber.js';

const BIG_INT_ZERO = BigInt(0);

export class MoneyUnits {

  public readonly amount: string;
  public readonly decimals: number;

  /**
   *
   * @param amount base (usually smallest) units such as satoshi or nanoERG
   * @param decimals
   */
  constructor(amount: string | number | bigint, decimals: number) {
    if (typeof amount === 'bigint') {
      this.amount = amount.toString();
    } else {
      this.amount = (typeof amount === 'string') ? amount : amount.toFixed(0);
    }
    // Try convert amount to bigint
    BigInt(this.amount);
    this.decimals = decimals;
  }

  /**
   * Example: Converts 0.0123 ERG to 12300000 nanoERG
   * @param value
   * @param decimals
   */
  static fromMainUnits(value: string, decimals: number): MoneyUnits {
    const baseInUnit = new BigNumber(10).pow(decimals);
    const baseUnits = new BigNumber(value).multipliedBy(baseInUnit);
    return new MoneyUnits(baseUnits.toFixed(0), decimals);
  }

  plus(other: MoneyUnits): MoneyUnits {
    const result = BigInt(this.amount) + BigInt(other.amount);
    return new MoneyUnits(result.toString(), this.decimals);
  }

  minus(other: MoneyUnits): MoneyUnits {
    const result = BigInt(this.amount) - BigInt(other.amount);
    return new MoneyUnits(result.toString(), this.decimals);
  }

  isNegative(): boolean {
    return BigInt(this.amount) < BIG_INT_ZERO;
  }

  isPositive(): boolean {
    return BigInt(this.amount) > BIG_INT_ZERO;
  }

  // Convert from smallest denomination (base units) to amount of token
  toMainUnits(): string {
    const baseInUnit = new BigNumber(10).pow(this.decimals);
    const tokens = new BigNumber(this.amount).div(baseInUnit);
    return tokens.toFixed();
  }
}
