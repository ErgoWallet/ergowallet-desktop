/**
 * Secure store of wallets seed/mnemonic data
 * TODO: encrypt / decrypt
 */
export class Vault {

  private wallets = new Map<string, string>();

  public getWallets(): string[] {
    return Array.from(this.wallets.keys());
  }

  public importWallet(name: string, mnemonic: string, password: string): void {
    if (this.wallets.get(name)) {
      throw new Error("Wallet with such name already exists");
    }
    this.wallets.set(name, mnemonic);
  }

  public getWalletData(walletName: string): any {
    const mnemonic = this.wallets.get(walletName);
    if (!mnemonic) {
      return null;
    }
    return {
      mnemonic
    };
  }
}
