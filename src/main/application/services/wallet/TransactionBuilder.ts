import {MoneyUnits} from "../../../../common/MoneyUnits";
import {fromErg} from "../../../../common/utils";
import {minBoxValue} from "../../../../common/constants";
import {WalletBox} from "./Wallet";
import {ErgoBoxSet} from "../../../../common/ErgoBoxSet";

const {Address, Transaction} = require("@ergowallet/ergowallet-wasm/ergowallet_wasm");

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

  createErgTx(
    spendingBoxes: Array<WalletBox>,
    recipient: string,
    amount: string,
    fee: string,
    changeAddress: string,
    tokenId: string,
  ): UnsignedTransaction {
    const spendingErgAmount = MoneyUnits.fromMainUnits(amount, 9);
    const feeAmount = fromErg(fee);

    const tx: UnsignedTransaction = {
      fee: feeAmount.amount,
      inputs: spendingBoxes.map((box) => ({ boxId: box.boxId })),
      outputs: []
    };

    let totalErgAvailable: MoneyUnits = spendingBoxes.reduce(
      (total: MoneyUnits, item: any) => total.plus(new MoneyUnits(item.value, 9)),
      new MoneyUnits(0, 9)
    );

    // For each input which holds tokens we create separate output
    spendingBoxes.forEach((inputBox: WalletBox) => {
      if (inputBox.assets && inputBox.assets.length > 0) {
        tx.outputs.push({
          address: inputBox.address,
          value: minBoxValue.toString(),
          assets: Array.from(inputBox.assets)
        });
        totalErgAvailable = totalErgAvailable.minus(new MoneyUnits(minBoxValue, 9));
      }
    });

    const change = totalErgAvailable
      .minus(spendingErgAmount)
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
      value: spendingErgAmount.amount
    });

    const unsigned = Transaction.create(
      tx.inputs,
      tx.outputs,
      BigInt(feeAmount.amount),
      this.ergoContext.height
    );

    tx.ergoTx = unsigned.to_json();
    return tx;
  }

  public createTokenTx(
    spendingBoxes: Array<WalletBox>,
    recipient: string,
    amount: string,
    fee: string,
    changeAddress: string,
    tokenId: string,
  ): UnsignedTransaction {
    const feeAmount = fromErg(fee);
    const tx: UnsignedTransaction = {
      fee: feeAmount.amount,
      inputs: spendingBoxes.map((box: WalletBox) => ({ boxId: box.boxId })),
      outputs: []
    };

    const inputSet = new ErgoBoxSet(spendingBoxes);
    const totalErgAvailable = new MoneyUnits(inputSet.balance('ERG').toString(), 9);
    const tokenAvailable = new MoneyUnits(inputSet.balance(tokenId), 0);
    const recipientTokenAmount = MoneyUnits.fromMainUnits(amount, 0);

    if (tokenAvailable.lessThen(recipientTokenAmount)) {
      throw new Error('Not enough token amount');
    }

    const changeTokens = [];
    inputSet.filter((id, balance) => (id !== 'ERG' && tokenId !== id)).forEach((balance, id) => {
      changeTokens.push({
        tokenId: id,
        amount: balance.toString()
      });
    });

    const tokenChange = tokenAvailable.minus(recipientTokenAmount);
    if (tokenChange.isPositive()) {
      changeTokens.push({
        tokenId,
        amount: tokenChange.amount
      });
    }

    // ERG needs for Recipient Output
    const recipientErgAmount = new MoneyUnits(minBoxValue, 9);

    const changeErg = totalErgAvailable
      .minus(recipientErgAmount)
      .minus(feeAmount);

    if (changeErg.isNegative()) {
      throw new Error('Not enough ERG');
    }

    // Change
    if (changeErg.isPositive()) {
      tx.outputs.push({
        assets: changeTokens,
        address: changeAddress,
        value: changeErg.amount
      });
    }

    if (changeErg.isZero() && changeTokens.length > 0) {
      throw new Error('Not enough ERG for tokens change ouputs');
    }
    // Recipient output
    tx.outputs.push({
      assets: [{ tokenId, amount: recipientTokenAmount.amount }],
      address: recipient,
      value: recipientErgAmount.amount
    });

    tx.ergoTx = Transaction.create(
      tx.inputs,
      tx.outputs,
      BigInt(feeAmount.amount),
      this.ergoContext.height
    ).to_json();

    return tx;
  }

  public create(
    spendingBoxes: Array<string>,
    recipient: string,
    amount: string,
    fee: string,
    changeAddress: string,
    tokenId: string,
  ): UnsignedTransaction {
    this.assertAddress(recipient, `Invalid recipient address ${recipient}`);
    this.assertAddress(changeAddress, `Invalid change address ${changeAddress}`);

    const fromBoxes = new Array<WalletBox>();
    spendingBoxes.forEach((id) => {
      const box = this.unspentBoxes.get(id);
      if (box) {
        fromBoxes.push(box);
      } else {
        throw new Error(`Unspent box ${id} not found`);
      }
    });

    if (tokenId === 'ERG') {
      return this.createErgTx(fromBoxes, recipient, amount, fee, changeAddress, tokenId);
    }
    return this.createTokenTx(fromBoxes, recipient, amount, fee, changeAddress, tokenId);
  }

  private assertAddress(address: string, errorMessage: string) {
    if (Address.validate(address).length > 0) {
      throw new Error(errorMessage);
    }
  }
}
