import Mnemonic from "./Mnemonic";

describe('Mnemonic', () => {
  it('should validate mnemonic', () => {
    // https://github.com/ergoplatform/ergo/issues/1627
    expect(Mnemonic.isValid('race relax argue hair sorry riot there spirit ready fetch food hedgehog hybrid mobile pretty')).toBeTruthy();
  });
});
