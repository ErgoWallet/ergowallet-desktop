import {MoneyUnits} from "../../../../common/MoneyUnits";
import {fromErg} from "../../../../common/utils";
import {minBoxValue} from "../../../../common/constants";
import {WalletBox} from "./Wallet";

const {Address, create_tx} = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");

export interface UnsignedTransaction {
  inputs: Array<{
    boxId: string;
  }>;
  outputs: Array<{
    value: string;
    address: string;
    assets: Array<{tokenId: string; amount: string}>;
  }>;
  fee: string;

  /** Unsigned Tx for broadcasting */
  ergoTx?: any;
}

export interface SignedTransaction {
  inputs: Array<{
    boxId: string;
  }>;
  outputs: Array<{
    value: string;
    address: string;
  }>;
  fee: string;

  /** Signed Tx for broadcasting */
  ergoTx?: any;
}

export default class TransactionBuilder {
  private unspentBoxes: Map<string, WalletBox>;
  private ergoContext: { height: number };

  constructor(unspentBoxes: Map<string, WalletBox>, ergoContext: { height: number }) {
    this.unspentBoxes = unspentBoxes;
    this.ergoContext = ergoContext;
  }

  public create(
    spendingBoxes: Array<string>,
    recipient: string,
    amount: string,
    fee: string,
    changeAddress: string
  ): UnsignedTransaction {

    if (Address.validate(recipient).length > 0) {
      throw new Error(`Invalid recipient address ${recipient}`);
    }

    const spendingAmount = fromErg(amount);
    const feeAmount = fromErg(fee);

    const tx: UnsignedTransaction = {
      fee: feeAmount.amount,
      inputs: [],
      outputs: []
    };

    const fromBoxes = new Array<WalletBox>();
    spendingBoxes.forEach((id) => {
      const box = this.unspentBoxes.get(id);
      if (box) {
        fromBoxes.push(box);
        tx.inputs.push({ boxId: id });
      } else {
        throw new Error(`Unspent box ${id} not found`);
      }
    });

    let totalAvailable: MoneyUnits = fromBoxes.reduce(
      (total: MoneyUnits, item: any) => total.plus(new MoneyUnits(item.value, 9)),
      new MoneyUnits(0, 9)
    );

    // For each input which holds tokens we create separate output
    fromBoxes.forEach((inputBox: any) => {
      if (inputBox.assets && inputBox.assets.length > 0) {
        tx.outputs.push({
          address: inputBox.address,
          value: minBoxValue.toString(),
          assets: inputBox.assets.map((a: any) => ({ tokenId: a.tokenId, amount: a.amount.toString() }))
        });
        totalAvailable = totalAvailable.minus(new MoneyUnits(minBoxValue, 9));
      }
    });

    const change = totalAvailable
      .minus(spendingAmount)
      .minus(feeAmount);

    if (change.isNegative()) {
      throw new Error('Not enough ERG');
    }

    // Change
    if (change.isPositive()) {
      tx.outputs.push({
        assets: [],
        address: changeAddress,
        value: change.amount
      });
    }

    // Recipient output
    tx.outputs.push({
      assets: [],
      address: recipient,
      value: spendingAmount.amount
    });

    tx.ergoTx = create_tx(
      tx.inputs,
      tx.outputs,
      BigInt(feeAmount.amount),
      this.ergoContext.height
    );

    return tx;
  }
}
