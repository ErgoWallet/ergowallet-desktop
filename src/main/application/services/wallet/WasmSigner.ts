import Signer from "./Signer";

// @ts-ignore
const { KeyManager, Address, Transaction } = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");


export default class WasmSigner implements Signer {
  signTx(privateKeys: any, boxesToSpend: any, ergoTx: any, headers: any = null) {
    const signed = Transaction
      .sign(privateKeys, boxesToSpend, ergoTx)
      .to_json();
    // console.log('Signed TX: ' + JSON.stringify(signed));
    return signed;
  }
  validateAddress(address: string): string {
    return Address.validate(address);
  }
};

