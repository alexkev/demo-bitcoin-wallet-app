import { Colors } from '@/constants/Colors';
import { useWalletStore } from '@/stores/useWalletStore';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function AvailableBalance() {
  const { usdRate, calculateBalance } = useWalletStore();
  const balance = calculateBalance();
  
  const usdValue = (balance * usdRate).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <View style={styles.balanceContainer}>
      <Text style={styles.label}>Available Balance</Text>
      <View style={styles.amountRow}>
        <Text style={styles.balance}>{balance.toFixed(8)}</Text>
        <Text style={styles.currency}> BTC</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.fiatValue}>≈ {usdValue}</Text>
        <Text style={styles.usCurrency}> USD</Text>
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
    color: Colors.light.icon,
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
    color: Colors.light.icon,
  },
  usCurrency: {
    fontSize: 10,
    fontWeight: "500",
    color: Colors.light.icon,
  },
  fiatValue: {
    fontSize: 16,
    color: Colors.light.icon,
  },
});