import {AddressSummary, Block, Output} from "./types";

export interface Provider {
  getLatestBlock(): Promise<Block>;
  getBlocks(): Promise<{items: Array<Block>; total: number}>;
  getUnspentOutputs(address: string): Promise<Array<Output>>;
  getAddressSummary(address: string): Promise<AddressSummary>;
  getAddressTransactions(address: string, offset?: number, limit?: number): Promise<{ items: Array<any>; total: number }>;
  getUnconfirmedTransactions(address: string, offset?: number, limit?: number): Promise<{ items: Array<any>; total: number }>;
  getUnconfirmed(txId: string): any;
  sendTransaction(tx: any): Promise<string>;
}
