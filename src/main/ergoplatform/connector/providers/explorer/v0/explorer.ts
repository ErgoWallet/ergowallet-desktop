import {Provider} from "../../../Provider";
import {default as fetch} from 'node-fetch';
import {AddressSummaryResponse, TransactionsResponse, TransItem} from "./responses";
import {AddressSummary, Block, Output, Transaction} from "../../../types";

export class ExplorerClient implements Provider {
  private readonly baseUri: string;

  constructor(baseUri: string) {
    this.baseUri = baseUri;
  }
  getLatestBlockHeaders(num: number): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public async sendTransaction(tx: any): Promise<string> {
    const broadcastingTx = {
      inputs: tx.inputs,
      dataInputs: tx.dataInputs,
      outputs: tx.outputs
    };

    const url = `${this.baseUri}/transactions/send`;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(broadcastingTx)
    };
    const response = await ExplorerClient.api<{id: string}>(url, options);
    return response.id;
  }

  async getLatestBlock(): Promise<Block> {
    const url = `${this.baseUri}/blocks`;
    const response = await ExplorerClient.api<{items: Array<Block>; total: number}>(url);
    return {
      height: response.total,
      id: ''
    };
  }

  public async getBlocks(): Promise<{items: Array<Block>; total: number}> {
    const url = `${this.baseUri}/blocks`;
    return ExplorerClient.api<{items: Array<Block>; total: number}>(url);
  }

  public async getUnspentOutputs(address: string): Promise<Array<Output>> {
    const url = `${this.baseUri}/transactions/boxes/byAddress/unspent/${address}`;
    return ExplorerClient.api<Array<Output>>(url);
  }

  public async getAddressSummary(address: string): Promise<AddressSummary> {
    const url = `${this.baseUri}/addresses/${address}`;
    const response = await ExplorerClient.api<AddressSummaryResponse>(url);
    return {
      id: response.summary.id,
      confirmedTransactions: response.transactions.confirmed
    };
  }

  public async getAddressTransactions(address: string, offset = 0, limit = 20): Promise<{ items: Array<Transaction>; total: number }> {
    const url = `${this.baseUri}/addresses/${address}/transactions?offset=${offset}&limit=${limit}`;
    return ExplorerClient.api(url);
  }

  public async getUnconfirmedTransactions(address: string, offset = 0, limit = 20): Promise<{ items: Array<Transaction>; total: number }> {
    const url = `${this.baseUri}/transactions/unconfirmed/byAddress/${address}?offset=${offset}&limit=${limit}`;
    return ExplorerClient.api(url);
  }

  public async getUnconfirmed(txId: string) {
    const url = `${this.baseUri}/transactions/unconfirmed/${txId}`;
    return ExplorerClient.api<TransItem>(url);
  }

  private static async api<T>(url: string, options?: any): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
      const body = await response.json();
      console.error(url);
      console.error(body);
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json<T>();
  }
}
