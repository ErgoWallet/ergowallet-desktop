import {Provider} from "./Provider";
import {AddressSummary, Block, Output} from "./types";

/*
  Connector to Ergo blockchain.
  It uses different providers as a transport and etc.
 */
export class Connector {
  private provider: Provider;

  constructor(provider: Provider) {
    this.provider = provider;
  }

  public getBlocks(): Promise<{items: Array<Block>; total: number}> {
    return this.provider.getBlocks();
  }

  public getUnspentOutputs(address: string): Promise<Array<Output>> {
    return this.provider.getUnspentOutputs(address);
  }

  public getAddressSummary(address: string): Promise<AddressSummary> {
    return this.provider.getAddressSummary(address);
  }

  public getAddressTransactions(address: string, offset = 0, limit = 100): Promise<{ items: Array<any>; total: number }> {
    return this.provider.getAddressTransactions(address, offset, limit);
  }

  public sendTransaction(tx: any): Promise<string> {
    return this.provider.sendTransaction(tx);
  }

  public getUnconfirmed(txId: string): any {
    return this.provider.getUnconfirmed(txId);
  }

  public getUnconfirmedTransactions(address: string, offset = 0, limit = 100): Promise<{ items: Array<any>; total: number }> {
    return this.provider.getUnconfirmedTransactions(address, offset, limit);
  }

}
