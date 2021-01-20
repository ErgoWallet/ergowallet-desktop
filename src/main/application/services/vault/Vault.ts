/**
 * Secure store of wallets seed/mnemonic data
 * TODO: encrypt / decrypt
 */
export interface BIP39 {
  mnemonic: string;
  passphrase?: string;
}

export interface SingleKeyWallet {
  privateKey: string;
}

export class Vault {

  private wallets = new Map<string, BIP39 | SingleKeyWallet>();
  private dataDir: string;

  public constructor(dataDir: string) {
    console.debug(`Vault directory: ${dataDir}`);
    this.dataDir = dataDir;
  }

  public getWallets(): string[] {
    return Array.from(this.wallets.keys());
  }

  public importWallet(name: string, mnemonic: string, passphrase: string, password: string): void {
    if (this.wallets.get(name)) {
      throw new Error("Wallet with such name already exists");
    }
    this.wallets.set(name, { mnemonic, passphrase });
  }

  public importPrivateKey(name: string, privateKey: string, password: string): void {
    if (this.wallets.get(name)) {
      throw new Error("Wallet with such name already exists");
    }
    this.wallets.set(name, { privateKey });
  }

  public getWalletData(walletName: string): BIP39 | SingleKeyWallet {
    const found = this.wallets.get(walletName);
    if (!found) {
      return null;
    }
    return found;
  }
}
