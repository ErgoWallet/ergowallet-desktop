"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupByDay = groupByDay;
/**
 * Group transactions by common day in the year. yyyy-mm-dd
 * @param txs
 */
function groupByDay(txs) {
    var byDate = {};
    txs.forEach(function (tx) {
        var d = new Date(Number(tx.timestamp || tx.creationTimestamp));
        var day = ("0" + d.getDate()).slice(-2);
        var month = ("0" + (d.getMonth() + 1)).slice(-2);
        var year = d.getFullYear();
        var dateString = "".concat(year, "-").concat(month, "-").concat(day);
        if (!byDate[dateString]) {
            byDate[dateString] = [];
        }
        byDate[dateString].push(tx);
    });
    return byDate;
}
