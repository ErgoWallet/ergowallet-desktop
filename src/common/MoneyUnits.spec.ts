import {MoneyUnits} from "./MoneyUnits";

describe('MoneyUnits', () => {
  it('should be able convert from base', () => {
    const u = new MoneyUnits(123000, 9);
    expect(u.toMainUnits()).toEqual('0.000123');
  });

  it('should construct from number', () => {
    const u = new MoneyUnits(123000, 9);
    expect(u.amount).toEqual('123000');
  });

  it('should construct from main units', () => {
    const m = MoneyUnits.fromMainUnits('0.0123', 9);
    expect(m.amount).toEqual('12300000');
  });

  it('no decimals case', () => {
    const m = new MoneyUnits(55, 0);
    expect(m.toMainUnits()).toEqual('55');
  });

  it('should handle negative', () => {
    const one = new MoneyUnits('1', 9);
    const two = new MoneyUnits('2', 9);
    const result = one.minus(two);
    const minusOne = new MoneyUnits('-1', 9);
    expect(result.amount).toEqual(minusOne.amount);
  });

  it('toMainUnits should present correct string for small values', () => {
    const small = new MoneyUnits('123', 9);
    expect(small.toMainUnits()).toEqual('0.000000123');
  });

  it('minus should work', () => {
    const result = new MoneyUnits('678', 9).minus(new MoneyUnits('1', 9));
    expect(result.amount).toEqual('677');
  });

  it('isZero', () => {
    const result = new MoneyUnits('678', 9).minus(new MoneyUnits('678', 9));
    expect(result.isZero()).toBeTruthy();
  });

  it('must be constructed only from integer value', () => {
    expect(() => new MoneyUnits('0.97', 9)).toThrow();
  });
});
