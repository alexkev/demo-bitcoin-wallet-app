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
  networkFee: number;
  
  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  calculateBalance: () => number;
  canSendAmount: (amount: number) => boolean;
  getNetworkFee: () => number;
  setNetworkFee: (fee: number) => void;
  initializeTransactions: () => void;
};

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      transactions: MOCK_TRANSACTIONS,
      balance: 0,
      networkFee: NETWORK_FEE,
      
      addTransaction: (transaction) => {
        const { networkFee } = get();
        const newTransaction: Transaction = {
          ...transaction,
          id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
          // Include network fee for send transactions
          ...(transaction.type === 'send' && { networkFee }),
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
            // Subtract both the amount and network fee for send transactions
            const totalSent = tx.amount + (tx.networkFee || 0);
            return balance - totalSent;
          }
          return balance;
        }, 0);
      },
      
      canSendAmount: (amount: number) => {
        const balance = get().calculateBalance();
        const { networkFee } = get();
        const totalRequired = amount + networkFee;
        return totalRequired <= balance && amount > 0;
      },
      
      getNetworkFee: () => get().networkFee,
      
      setNetworkFee: (fee: number) => {
        set({ networkFee: fee });
      },
      
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
