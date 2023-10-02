import {SignedTransaction, UnsignedTransaction} from "./TransactionBuilder";
import {AdditionalRegisters, Output, Transaction, UnconfirmedTransaction} from "../../../ergoplatform/connector/types";

export type WalletTx = Omit<Transaction, 'outputs'> & {
  value: any;
  outputs: Array<WalletBox>;
};


export interface WalletBox {
  boxId: string;
  transactionId: string;
  index: number;
  value: string;
  creationHeight: number;
  ergoTree: string;
  address: string;
  addressType?: string;
  spentTransactionId: string | null;
  assets: Array<{ tokenId: string; amount: string }>;
  additionalRegisters: AdditionalRegisters | {};
}

export interface Wallet {
  addUnspent(box: Output): void;
  getAddresses(): Array<any>;
  getUnspentBoxes(): Array<WalletBox>;
  getConfirmedTransactions(address: string): Array<any>;
  processTransactions(transactions: Array<Transaction | UnconfirmedTransaction>): void;
  getAllTransactions(): Array<WalletTx>;
  getTransaction(txId: string): WalletTx|null;
  createTransaction(inputs: Array<any>, recipient: string, amount: string, fee: string, tokenId: string, currentHeight: number): UnsignedTransaction;
  signTransaction(tx: UnsignedTransaction): SignedTransaction;
  close(): void;
}

