
export default interface Signer {
  validateAddress(address: string): string;
  signTx(privateKeys: any, boxesToSpend: any, ergoTx: any, headers: any): any
}