/**
 * Secure store of wallets seed/mnemonic data
 * TODO: encrypt / decrypt
 */
export interface BIP39 {
  mnemonic: string;
  passphrase?: string;
}

export class Vault {

  private wallets = new Map<string, BIP39>();
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

  public getWalletData(walletName: string): BIP39 {
    const found = this.wallets.get(walletName);
    if (!found) {
      return null;
    }
    return found;
  }
}
