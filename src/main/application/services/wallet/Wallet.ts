import {SignedTransaction, UnsignedTransaction} from "./TransactionBuilder";
import {AdditionalRegisters, Output, TokenValue, Transaction} from "../../../ergoplatform/connector/types";

export interface WalletTx extends Transaction {
  value: any;
}

export interface WalletBox {
  boxId: string;
  transactionId: string;
  index: number;
  value: bigint;
  creationHeight: bigint;
  ergoTree: string;
  address: string;
  spentTransactionId: string | null;
  assets: Array<TokenValue>;
  additionalRegisters: AdditionalRegisters;
}

export interface Wallet {
  addUnspent(box: Output): void;
  getAddresses(): Array<any>;
  getUnspentBoxes(): Array<WalletBox>;
  getConfirmedTransactions(address: string): Array<any>;
  processTransactions(transactions: Array<Transaction>): void;
  getAllTransactions(): Array<WalletTx>;
  createTransaction(inputs: Array<any>, recipient: string, amount: string, fee: string, currentHeight: number): UnsignedTransaction;
  signTransaction(tx: UnsignedTransaction): SignedTransaction;
  close(): void;
}

