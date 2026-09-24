import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

function generateMnemonic(): string {
  return bip39.generateMnemonic(wordlist, 128);
}

function validateMnemonic(mnemonic: string): boolean {
  return bip39.validateMnemonic(mnemonic, wordlist);
}

function mnemonicToSeedSync(mnemonic: string, passphrase?: string): Uint8Array {
  return bip39.mnemonicToSeedSync(mnemonic, passphrase)
}

export {
  mnemonicToSeedSync,
  generateMnemonic,
  validateMnemonic
}