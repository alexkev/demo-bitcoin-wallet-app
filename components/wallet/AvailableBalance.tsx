import { useTheme } from '@/hooks/useTheme';
import { useWalletStore } from '@/stores/useWalletStore';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function AvailableBalance() {
  const { usdRate, calculateBalance } = useWalletStore();
  const balance = calculateBalance();

  const { colors } = useTheme();
  
  const usdValue = (balance * usdRate).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <View style={styles.balanceContainer}>
      <Text style={[styles.label, { color: colors.icon }]}>Available Balance</Text>
      <View style={styles.amountRow}>
        <Text style={[styles.balance, { color: colors.text }]}>{balance.toFixed(8)}</Text>
        <Text style={[styles.currency, { color: colors.icon }]}> BTC</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.fiatValue, { color: colors.icon }]}>≈ {usdValue}</Text>
        <Text style={[styles.usCurrency, { color: colors.icon }]}> USD</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceContainer: {
    alignItems: "flex-start",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 12,
    fontWeight: "500",
  },
  usCurrency: {
    fontSize: 10,
    fontWeight: "500",
  },
  fiatValue: {
    fontSize: 16,
  },
});