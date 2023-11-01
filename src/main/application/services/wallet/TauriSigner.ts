import Signer from "./Signer";

export default class TauriSigner implements Signer {
  signTx(privateKeys: any, boxesToSpend: any, ergoTx: any) {
    throw new Error("Method not implemented.");
  }
  validateAddress(address: string): string {
    throw new Error("Method not implemented.");
  }

}