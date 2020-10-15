export interface Block {
  id: string;
  height: number;
}

export interface AdditionalRegisters {
  R4: string;
  R5: string;
  R6: string;
  R7: string;
  R8: string;
  R9: string;
}

export interface TokenValue {
  tokenId: string;
  amount: bigint;
}

export interface Output {
  id: string;
  txId: string;
  index: number;
  value: bigint;
  creationHeight: bigint;
  ergoTree: string;
  address: string;
  spentTransactionId: string;
  assets: Array<TokenValue>;
  additionalRegisters: AdditionalRegisters | {};
}

export interface Input {
  id: string;
  address: string;
  value: bigint;
}

export interface AddressSummary {
  id: string;
  confirmedTransactions: number;
}

export interface Transaction {
  id: string;
  timestamp: bigint;
  inclusionHeight: number;
  size: number;
  confirmationsCount: number;
  inputs: Array<Input>;
  outputs: Array<Output>;
}
