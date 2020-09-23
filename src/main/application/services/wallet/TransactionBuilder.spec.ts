import TransactionBuilder from './TransactionBuilder';
import {WalletBox} from "./Wallet";
import {AdditionalRegisters} from "../../../ergoplatform/connector/types";

const {Address, create_tx} = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");

describe('TransactionBuilder', () => {
  it('should create tx', () => {
    const unspent = new Map<string, WalletBox>();
    const context = {
      height: 320
    };

    const box1: WalletBox = {
      boxId: "626925e6a7bb08e3b7cf73de2e71a98966e881e7fc0c54fbbc94b83c79de8c19",
      value: BigInt("10000000000"),
      ergoTree: "",
      creationHeight: BigInt(100),
      assets: [],
      additionalRegisters: {} as AdditionalRegisters,
      transactionId: "",
      spentTransactionId: "",
      index: 0,
      address: ""
    };
    unspent.set(box1.boxId, box1);

    const buidler = new TransactionBuilder(unspent, context);
    const tx = buidler.create(
      [box1.boxId],
      "9hzP24a2q8KLPVCUk7gdMDXYc7vinmGuxmLp5KU7k9UwptgYBYV",
      "1",
      "0.000001",
      "9hzP24a2q8KLPVCUk7gdMDXYc7vinmGuxmLp5KU7k9UwptgYBYV"
    );
    console.log(JSON.stringify(tx));
  });

  it('JS test for wasm Transaction', () => {

    const inputs = [
      {
        boxId: '626925e6a7bb08e3b7cf73de2e71a98966e881e7fc0c54fbbc94b83c79de8c19'
      }
    ];
    const outputs = [
      {
        value: "1",
        address: "9hzP24a2q8KLPVCUk7gdMDXYc7vinmGuxmLp5KU7k9UwptgYBYV",
        assets: []
      }
    ];
    const fee = "1";

    const result = create_tx(
      inputs,
      outputs,
      BigInt(fee),
      0
    );

    console.log(result);
  });
});
