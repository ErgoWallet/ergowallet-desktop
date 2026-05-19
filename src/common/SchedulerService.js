"use strict";
// import {EventEmitter} from 'events';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
// export class SchedulerService extends EventEmitter {
//   private readonly action: () => void;
//   private timer: NodeJS.Timeout;
//   private readonly interval: number;
//   constructor(action: () => void, ms: number) {
//     super();
//     this.action = action;
//     this.interval = ms;
//   }
//   public start(): void {
//     if (!this.timer) {
//       this.addListener('run', this.action);
//       this.timer = global.setInterval(() => this.emit('run'), this.interval);
//     }
//   }
//   public stop(): void {
//     if (this.timer) {
//       clearInterval(this.timer);
//       this.removeAllListeners('run');
//     }
//   }
// }
var events_1 = require("events");
var SchedulerService = /** @class */ (function (_super) {
    __extends(SchedulerService, _super);
    function SchedulerService(action, ms) {
        var _this = _super.call(this) || this;
        _this.timer = null;
        _this.action = action;
        _this.interval = ms;
        return _this;
    }
    SchedulerService.prototype.start = function () {
        var _this = this;
        if (!this.timer) {
            this.addListener('run', this.action);
            this.timer = setInterval(function () {
                _this.emit('run');
            }, this.interval);
        }
    };
    SchedulerService.prototype.stop = function () {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            this.removeAllListeners('run');
        }
    };
    return SchedulerService;
}(events_1.EventEmitter));
exports.SchedulerService = SchedulerService;
