export interface AddressSummaryResponse {
  summary: {
    id: string;
  };
  transactions: {
    confirmed: number;
    totalReceived: bigint;
    confirmedBalance: bigint;
    totalBalance: bigint;
  };
}

export interface TransItem {
  id: string;
  headerId: string;
  inclusionHeight: number;
  timestamp?: number; // for confirmed
  creationTimestamp?: number; // for unconfirmed
  confirmationsCount: number;
  inputs: Array<{}>;
  outputs: Array<{}>;
}


export interface TransactionsResponse {
  total: number;
  items: TransItem[];
}
