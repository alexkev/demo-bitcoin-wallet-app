import { MOCK_TRANSACTIONS } from '@/constants/MockTransactions';
import { NETWORK_FEE } from '@/constants/NetorkFee';
import { Transaction } from '@/types/wallet';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

// TODO : Replace with MMKV or another persistent storage solution for production apps
const storage = new Map();

const zustandStorage: StateStorage = {
  getItem: (name: string) => {
    const value: any = storage.get(name);
    return value ?? null;
  },
  setItem: (name, value: any) => {
    storage.set(name, value);
  },
  removeItem: name => {
    return storage.delete(name);
  },
};

type WalletStore = {
  transactions: Transaction[];
  balance: number;
  
  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  calculateBalance: () => number;
  canSendAmount: (amount: number) => boolean;
  getNetworkFee: () => number;
  initializeTransactions: () => void;
};

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      transactions: MOCK_TRANSACTIONS,
      balance: 0,
      
      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
        };
        
        set((state) => {
          const updatedTransactions = [newTransaction, ...state.transactions];
          const newBalance = get().calculateBalance();
          return {
            transactions: updatedTransactions,
            balance: newBalance,
          };
        });
      },
      
      calculateBalance: () => {
        const { transactions } = get();
        return transactions.reduce((balance, tx) => {
          if (tx.status !== 'completed') return balance;
          
          if (tx.type === 'receive') {
            return balance + tx.amount;
          } else if (tx.type === 'send') {
            return balance - tx.amount - NETWORK_FEE;
          }
          return balance;
        }, 0);
      },
      
      canSendAmount: (amount: number) => {
        const balance = get().calculateBalance();
        const totalRequired = amount + NETWORK_FEE;
        return totalRequired <= balance && amount > 0;
      },
      
      getNetworkFee: () => NETWORK_FEE,
      
      initializeTransactions: () => {
        const balance = get().calculateBalance();
        set({ balance });
      },
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.initializeTransactions();
          state.balance = state.calculateBalance();
        }
      },
    },
  ),
);
