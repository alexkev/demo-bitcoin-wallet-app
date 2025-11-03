export interface Transaction {
  id: string;
  amount: number;
  timestamp: Date;
  type: "send" | "receive";
  address: string;
  status: "pending" | "completed" | "failed";
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
