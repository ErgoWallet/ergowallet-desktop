import TransactionBuilder from './TransactionBuilder';
import {WalletBox} from "./Wallet";
import {AdditionalRegisters} from "../../../ergoplatform/connector/types";
import {MoneyUnits} from "../../../../common/MoneyUnits";
import {minBoxValue} from "../../../../common/constants";

const {Address, create_tx} = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");

describe('TransactionBuilder', () => {
  it('should create token transfer tx', () => {
    const token1 = "d3798defcd423bf9609e793959a0114322ce5c4181868341ae772d1a9054e9ca";
    const token2 = "0ecb00855050a124f4100fa9a29a57419961ccceb909d5cacb72f67a0ad53092";
    const unspent = new Map<string, WalletBox>();
    const context = {
      height: 320
    };
    const box1: WalletBox = {
      boxId: "626925e6a7bb08e3b7cf73de2e71a98966e881e7fc0c54fbbc94b83c79de8c19",
      value: "10000000000",
      ergoTree: "",
      creationHeight: 100,
      assets: [{tokenId: token1, amount: "55"}, {tokenId: token2, amount: "1"}],
      additionalRegisters: {} as AdditionalRegisters,
      transactionId: "",
      spentTransactionId: "",
      index: 0,
      address: ""
    };
    unspent.set(box1.boxId, box1);
    const builder = new TransactionBuilder(unspent, context);
    const tx = builder.create(
      [box1.boxId],
      "9hzP24a2q8KLPVCUk7gdMDXYc7vinmGuxmLp5KU7k9UwptgYBYV",
      "1",
      "0.000001",
      "9gmNsqrqdSppLUBqg2UzREmmivgqh1r3jmNcLAc53hk3YCvAGWE",
      token1
    );
    console.log(JSON.stringify(tx));
    expect(tx.outputs.length).toEqual(2); // recipient and change
    const recipient = tx.outputs.filter((b) => b.address === '9hzP24a2q8KLPVCUk7gdMDXYc7vinmGuxmLp5KU7k9UwptgYBYV')[0];
    expect(recipient.value).toEqual(minBoxValue.toString());

    const ergoTx = create_tx(
      tx.inputs,
      tx.outputs,
      BigInt(tx.fee),
      context.height
    );

    const totalOutput = ergoTx.outputs.reduce(
      (total: MoneyUnits, item: any) => total.plus(new MoneyUnits(item.value, 9)),
      new MoneyUnits(0, 9));
    expect(totalOutput.amount).toEqual(box1.value);

    console.log(JSON.stringify(ergoTx));
  });

  it('should create tx', () => {
    const unspent = new Map<string, WalletBox>();
    const context = {
      height: 320
    };

    const box1: WalletBox = {
      boxId: "626925e6a7bb08e3b7cf73de2e71a98966e881e7fc0c54fbbc94b83c79de8c19",
      value: "10000000000",
      ergoTree: "",
      creationHeight: 100,
      assets: [],
      additionalRegisters: {} as AdditionalRegisters,
      transactionId: "",
      spentTransactionId: "",
      index: 0,
      address: ""
    };
    unspent.set(box1.boxId, box1);

    const builder = new TransactionBuilder(unspent, context);
    const fee = "0.000001";
    const tx = builder.create(
      [box1.boxId],
      "9hzP24a2q8KLPVCUk7gdMDXYc7vinmGuxmLp5KU7k9UwptgYBYV",
      "1",
      "0.000001",
      "9gmNsqrqdSppLUBqg2UzREmmivgqh1r3jmNcLAc53hk3YCvAGWE",
      "ERG"
    );
    expect(tx.fee).toEqual(MoneyUnits.fromMainUnits(fee, 9).amount);

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

  });
});
