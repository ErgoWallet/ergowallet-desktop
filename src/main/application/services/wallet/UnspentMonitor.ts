import {SchedulerService} from '../../../../common/SchedulerService';
import {Connector} from '../../../ergoplatform/connector/Connector';
import {Wallet} from './Wallet';
import {Output} from "../../../ergoplatform/connector/types";
import {EventEmitter} from "events";

export class UnspentMonitor extends EventEmitter {
  private schedulerService: SchedulerService;
  private connector: Connector;
  private wallet: Wallet;
  private isLoading: boolean;

  constructor(connector: Connector, wallet: Wallet) {
    super();
    this.connector = connector;
    this.wallet = wallet;

    this.schedulerService = new SchedulerService(() => {
      this.checkUnspentBoxes();
    }, 90000);
  }


  public start(): void {
    this.checkUnspentBoxes(); // call immediately
    this.schedulerService.start();

    console.log("UnspentMonitor started");
  }

  private async checkUnspentBoxes(): Promise<void> {
    this.isLoading = true;
    this.emit('LoadingStarted');
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

    this.isLoading = false;
    this.emit('LoadingFinished');
  }

  public stop(): void {

    this.schedulerService.stop();
    console.log("UnspentMonitor stopped");
  }
}
