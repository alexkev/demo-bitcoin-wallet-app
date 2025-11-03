export interface Transaction {
  id: string;
  amount: number;
  timestamp: Date;
  type: "send" | "receive";
  address: string;
  status: "pending" | "completed" | "failed";
  networkFee?: number; // Only present for send transactions
}

export interface Wallet {
  balance: number;
  address: string;
  transactions: Transaction[];
}

export interface BitcoinAddress {
  value: string;
  isValid: boolean;
}
