import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/hooks/useTheme';
import { Transaction } from '@/types/wallet';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TransactionItemProps {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onPress }) => {
  const { colors } = useTheme();
  const isReceive = transaction.type === 'receive';
  const amount = isReceive ? `+${transaction.amount.toFixed(8)}` : `-${transaction.amount.toFixed(8)}`;
  const iconName = isReceive ? 'arrow.down.left' : 'arrow.up.right';
  const iconColor = isReceive ? colors.success : colors.error;
  
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return colors.success;
      case 'pending': return colors.warning;
      case 'failed': return colors.error;
      default: return colors.icon;
    }
  };

  return (
    <TouchableOpacity style={[styles.transactionItem, { backgroundColor: colors.surface }]} onPress={() => onPress(transaction)}>
      <View style={styles.transactionLeft}>
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
          <IconSymbol name={iconName as any} size={20} color={iconColor} />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={[styles.transactionType, { color: colors.text }]}>
            {isReceive ? 'Received' : 'Sent'}
          </Text>
          <Text style={[styles.transactionAddress, { color: colors.icon }]}>
            {isReceive ? `From ${formatAddress(transaction.address)}` : `To ${formatAddress(transaction.address)}`}
          </Text>
          <Text style={[styles.transactionTime, { color: colors.icon }]}>
            {formatTime(transaction.timestamp)}
          </Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <IconSymbol name="arrow.up.right.square" size={16} color={colors.text} style={{ marginBottom: 8 }} />
        <Text style={[styles.transactionAmount, { color: iconColor }]}>
          {amount} BTC
        </Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(transaction.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface TransactionListProps {
  onTransactionPress?: (transaction: Transaction) => void;
  transactions?: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ 
  onTransactionPress, 
  transactions 
}) => {
  const { colors } = useTheme();

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TransactionItem 
      transaction={item} 
      onPress={onTransactionPress || (() => {})} 
    />
  );

  const keyExtractor = (item: Transaction) => item.id;

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyStateText, { color: colors.icon }]}>No transactions yet</Text>
      <Text style={[styles.emptyStateSubtext, { color: colors.icon }]}>Your transactions will appear here</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={keyExtractor}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        // ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.icon + '20' }]} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    paddingLeft: 20,
  },
  list: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 4,
    marginHorizontal: 20,
    paddingHorizontal: 8,
  },
  transactionLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionAddress: {
    fontSize: 14,
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 12,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    marginHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});