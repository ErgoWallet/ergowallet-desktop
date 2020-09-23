import {SchedulerService} from '../../../../common/SchedulerService';
import {Connector} from '../../../ergoplatform/connector/Connector';
import {Wallet} from './Wallet';
import {Output} from "../../../ergoplatform/connector/types";

export class UnspentMonitor {
  private schedulerService: SchedulerService;
  private connector: Connector;
  private wallet: Wallet;

  constructor(wallet, connector) {
    this.connector = connector;
    this.wallet = wallet;

    this.schedulerService = new SchedulerService(() => {
      this.checkUnspentBoxes();
    }, 10000);
  }


  public start(): void {
    this.checkUnspentBoxes(); // call immediately
    this.schedulerService.start();

    console.log("UnspentMonitor started");
  }

  private async checkUnspentBoxes(): Promise<void> {
    try {

      const outputs: Array<Output[]> = await Promise.all(
        this.wallet.getAddresses().map((addr) => {
          return this.connector.getUnspentOutputs(addr.address);
        })
      );

      [].concat(...outputs).forEach((item) => {
        this.wallet.addUnspent(item);
      });

    } catch (e) {
      console.error(e);
    }
  }

  public stop(): void {

    this.schedulerService.stop();
    console.log("UnspentMonitor stopped");
  }
}
