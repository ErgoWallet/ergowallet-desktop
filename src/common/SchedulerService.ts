import {EventEmitter} from 'events';

export class SchedulerService extends EventEmitter {
  private readonly action: () => void;
  private timer: NodeJS.Timeout;
  private readonly interval: number;

  constructor(action: () => void, ms: number) {
    super();
    this.action = action;
    this.interval = ms;
  }

  public start(): void {
    if (!this.timer) {
      this.addListener('run', this.action);
      this.timer = global.setInterval(() => this.emit('run'), this.interval);
    }
  }

  public stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.removeAllListeners('run');
    }
  }
}
