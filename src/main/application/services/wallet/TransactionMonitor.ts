import {SchedulerService} from "../../../../common/SchedulerService";
import {Connector} from "../../../ergoplatform/connector/Connector";
import {Wallet} from "./Wallet";
import {EventEmitter} from "events";

export class TransactionMonitor extends EventEmitter {
  private schedulerService: SchedulerService;
  private connector: Connector;
  private wallet: Wallet;

  constructor(connector: Connector, wallet: Wallet) {
    super();
    this.connector = connector;
    this.wallet = wallet;
    this.schedulerService = new SchedulerService(() => {
      this.loadTransactions();
    }, 30000);
  }


  public start(): void {
    this.loadTransactions();
    this.schedulerService.start();
    console.log("TransactionMonitor started");
  }

  public stop(): void {
    this.schedulerService.stop();
    console.log("TransactionMonitor stopped");
  }


  private async loadTransactions(): Promise<void> {
    this.emit('LoadingStarted');
    for (const addr of this.wallet.getAddresses()) {
      try {
        const result = await this.connector.getAddressSummary(addr.address);
        const totalConfirmed = result.confirmedTransactions;
        const currentTxs = this.wallet.getConfirmedTransactions(addr.address);
        if (currentTxs.length < totalConfirmed) {
          // It seems there is new txs we should load
          const allTxs = await this.loadAll(totalConfirmed, addr.address);
          // Add address to tx
          const txs = allTxs.map((tx) => ({...tx, address: addr.address}));

          this.wallet.processTransactions(txs);

          // TODO: we could fire event about new txs
        }

        // Just load unconfirmed txs
        const unconfirmed = await this.connector.getUnconfirmedTransactions(addr.address, 0, 200);
        if (unconfirmed.items.length > 0) {
          console.log('Found unconfirmed txs: '+JSON.stringify(unconfirmed));
        }
        this.wallet.processTransactions(unconfirmed.items);

      } catch (e) {
        console.error(e);
      }
    }
    this.emit('LoadingFinished');
  }

  private async loadAll(totalCount: number, address: string): Promise<Array<any>> {
    const limit = 100;
    let requestCount = (totalCount / limit) + 1;
    let offset = 0;
    const result = [];

    while (requestCount > 0) {
      const response = await this.connector.getAddressTransactions(address, offset, limit);
      result.push(...response.items);
      offset += limit;
      requestCount--;
    }

    return result;
  }
}
