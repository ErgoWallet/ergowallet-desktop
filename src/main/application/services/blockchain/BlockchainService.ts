import {SchedulerService} from "../../../../common/SchedulerService";
import {EventEmitter} from 'events';

export class BlockchainService extends EventEmitter {
  public static HEIGHT_CHANGED_EVENT = 'HeightChanged';

  private schedulerService: SchedulerService;
  public currentHeight: number | null = null;
  public lastHeaders: any;
  private connector: any;

  constructor(connector) {
    super();
    this.connector = connector;
    this.schedulerService = new SchedulerService(() => {
      this.retrieveState();
    }, 20000);
  }

  public start(): void {
    this.schedulerService.start();
    console.log("Blockchain Service started");
  }

  public stop(): void {
    this.schedulerService.stop();
    console.log("Blockchain Service stopped");
  }

  private async retrieveState(): Promise<void> {
    try {
      // Retrieve last 10 blocks headers
      const headers  = await this.connector.getLatestBlockHeaders(10);
      this.lastHeaders = headers.items;
      console.debug("Last Block " + this.lastHeaders[0].id + " at " + this.lastHeaders[0].height)

      const newHeight = this.lastHeaders[0].height;
      const prevHeight = this.currentHeight;
      this.currentHeight = newHeight;

      if (prevHeight != newHeight) {
        // Height changed notification
        this.emit(BlockchainService.HEIGHT_CHANGED_EVENT, {
          height: newHeight
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
}
