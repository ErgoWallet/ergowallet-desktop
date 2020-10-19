import {SchedulerService} from "../../../../common/SchedulerService";
import {EventEmitter} from 'events';
import {default as fetch} from 'node-fetch';

export class UpdateService extends EventEmitter {
  public static CURRENT_VERSION_EVENT = 'CURRENT_VERSION_EVENT';

  private schedulerService: SchedulerService;

  constructor() {
    super();
    this.schedulerService = new SchedulerService(() => {
      this.retrieveVersion();
    }, 60_000 * 10);
  }

  public start(): void {
    this.retrieveVersion();
    this.schedulerService.start();
    console.log("UpdateService started");
  }

  public stop(): void {
    this.schedulerService.stop();
    console.log("UpdateService stopped");
  }


  private async retrieveVersion(): Promise<void> {
    try {
      const response = await fetch(`https://api.github.com/repos/ErgoWallet/ergowallet-desktop/releases/latest`);
      if (!response.ok) {
        console.error(new Error(`${response.status}: ${response.statusText}`));
      }
      const body = await response.json();

      this.emit(UpdateService.CURRENT_VERSION_EVENT, body);
    } catch (e) {
      console.error(e);
    }
  }
}
