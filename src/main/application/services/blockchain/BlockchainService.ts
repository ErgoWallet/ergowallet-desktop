import {SchedulerService} from "../../../../common/SchedulerService";
import {EventEmitter} from 'events';

export class BlockchainService extends EventEmitter {
  public static HEIGHT_CHANGED_EVENT = 'HeightChanged';

  private schedulerService: SchedulerService;
  public currentHeight: number | null = null;
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
      const response = await this.connector.getBlocks();

      const newHeight = response.total;
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
