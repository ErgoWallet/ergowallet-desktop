import * as bip39 from 'bip39';

class Mnemonic {
  static isValid(mnemonic: string): boolean {
    const words = mnemonic.split(' ');
    const wordCount = words.length;
    return (wordCount === 24 || wordCount === 12) &&
      bip39.validateMnemonic(mnemonic);
  }
}

export default Mnemonic;