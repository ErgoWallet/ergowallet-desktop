"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoragePeriod = exports.BlocksPerDay = exports.termsVersion = exports.minBoxValue = void 0;
exports.minBoxValue = 100000;
exports.termsVersion = "2020-09-12";
var BlocksPerHour = 30;
exports.BlocksPerDay = BlocksPerHour * 24;
var BlocksPerYear = exports.BlocksPerDay * 365;
// For how many blocks a box could be put into the state with no paying storage rent.
// 4 years ()
exports.StoragePeriod = 4 * BlocksPerYear;
