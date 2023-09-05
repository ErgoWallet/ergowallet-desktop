import { Transaction } from "../../../types";

export interface AddressTransactionsResponse {
  total: number;
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
  items: Transaction[];
}
