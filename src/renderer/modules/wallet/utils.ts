/**
 * Group transactions by common day in the year. yyyy-mm-dd
 * @param txs
 */
export function groupByDay(txs: Array<any>): Record<string, Array<any>> {
  const byDate = {};
  txs.forEach((tx) => {
    const d = new Date(Number(tx.timestamp || tx.creationTimestamp));

    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0"+(d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    const dateString = `${year}-${month}-${day}`;

    if (!byDate[dateString]) {
      byDate[dateString] = [];
    }
    byDate[dateString].push(tx);
  });
  return byDate;
}




