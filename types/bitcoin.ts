export interface Transaction {
  id: string;
  type: "send" | "receive";
  amount: number;
  timestamp: Date;
  address: string;
  status: "pending" | "completed" | "failed";
}

export interface WalletBalance {
  btc: number;
  usdRate: number;
  lastUpdated: Date;
}

export interface NetworkFee {
  slow: number;
  medium: number;
  fast: number;
  recommended: "slow" | "medium" | "fast";
}
