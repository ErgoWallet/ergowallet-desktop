import {Provider} from "../../../Provider";
import {default as fetch} from 'node-fetch';
import {AddressTransactionsResponse, TransactionsResponse, TransItem} from "./responses";
import {AddressSummary, Block, Output, Input, Transaction} from "../../../types";
import { max } from "lodash";

export class ExplorerClient implements Provider {
  private readonly baseUri: string;

  constructor(baseUri: string) {
    this.baseUri = baseUri;
  }

  public async sendTransaction(tx: any): Promise<string> {
    const broadcastingTx = {
      inputs: tx.inputs,
      dataInputs: tx.dataInputs,
      outputs: tx.outputs
    };

    const url = `${this.baseUri}/mempool/transactions/submit`;
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
    const url = `${this.baseUri}/networkState`;
    const response = await ExplorerClient.api<{height: number}>(url);
    return {
      height: response.height,
      id: ''
    };
  }

  public async getBlocks(): Promise<{items: Array<Block>; total: number}> {
    const url = `${this.baseUri}/blocks`;
    return ExplorerClient.api<{items: Array<Block>; total: number}>(url);
  }

  /**
   * It loads all unspent boxes for address my portion of 100.
   * @param address
   * @returns 
   */
  public async getUnspentOutputs(address: string): Promise<Array<Output>> {
    const limit = 100;
    let offset = 0;
    let total = 0;
    const result = [];

    do {
      const url = `${this.baseUri}/boxes/unspent/byAddress/${address}?offset=${offset}&limit=${limit}`;
      const resp = await ExplorerClient.api<{ items: Array<any>, total: number }>(url)
      total = max([total, resp.total])
      const dto = resp.items.map(i => <Output>{
        id: i.boxId,
        txId: i.transactionId,
        index: i.index,
        value: i.value,
        creationHeight: i.creationHeight,
        ergoTree: i.ergoTree,
        address: i.address,
        spentTransactionId: i.spentTransactionId,
        assets: i.assets,
        additionalRegisters: i.additionalRegisters
      });
      result.push(...dto);
      offset += limit;
    } while (result.length < total && total > 0)
    return result;
  }

  public async getAddressSummary(address: string): Promise<AddressSummary> {
    const url = `${this.baseUri}/addresses/${address}/transactions?offset=0&limit=5`;
    const response = await ExplorerClient.api<AddressTransactionsResponse>(url);
    return {
      id: address,
      confirmedTransactions: response.total
    };
  }

  public async getAddressTransactions(address: string, offset = 0, limit = 30): Promise<TransactionsResponse> {
    const url = `${this.baseUri}/addresses/${address}/transactions?offset=${offset}&limit=${limit}`;
    const result = await ExplorerClient.api<{ total: number, items: Array<any> }>(url);
    return {
      total: result.total,
      items: result.items.map(i => <Transaction>{
        id: i.id,
        // headerId: i.blockId,
        inclusionHeight: i.inclusionHeight,
        timestamp: i.timestamp, 
        // creationTimestamp: i.creationTimestamp,
        confirmationsCount: i.numConfirmations,
        inputs: i.inputs.map(x => <Input>{id: x.boxId, txId: x.transactionId, ...x}),
        outputs: i.outputs.map(x => <Output>{id: x.boxId, txId: x.transactionId, ...x}),
        size: i.size
      })
    }
  }

  public async getUnconfirmedTransactions(address: string, offset = 0, limit = 20): Promise<TransactionsResponse> {
    const url = `${this.baseUri}/mempool/transactions/byAddress/${address}?offset=${offset}&limit=${limit}`;
    const result = await ExplorerClient.api<{ total: number, items: Array<any> }>(url);
    return {
      total: result.total,
      items: result.items.map(i => <Transaction>{
        id: i.id,
        headerId: i.blockId,
        inclusionHeight: i.inclusionHeight,
        timestamp: i.timestamp, 
        creationTimestamp: i.creationTimestamp,
        confirmationsCount: i.numConfirmations,
        inputs: i.inputs.map(x => <Input>{id: x.boxId, txId: x.transactionId, ...x}),
        outputs: i.outputs.map(x => <Output>{id: x.boxId, txId: x.transactionId, ...x}),
        size: i.size
      })
    }
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
