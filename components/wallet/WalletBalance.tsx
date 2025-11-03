import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MOCK_BALANCE = 0.175;

export const WalletBalance = () => {
  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.label}>Available Balance</Text>
        <View style={styles.amountRow}>
          <Text style={styles.balance}>{MOCK_BALANCE.toFixed(8)}</Text>
          <Text style={styles.currency}> BTC</Text>
        </View>

        <Text style={styles.fiatValue}>≈ $5,250.00 USD</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <View
            style={[styles.actionIcon, { backgroundColor: Colors.light.tint }]}
          >
            <IconSymbol size={24} name="arrow.down.left" color="#FFF" />
          </View>
          <Text style={styles.actionText}>Receive</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={[styles.actionIcon, { backgroundColor: "#FF6B6B" }]}>
            <IconSymbol size={24} name="arrow.up.right" color="#FFF" />
          </View>
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 16,
  },
  balanceContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: Colors.light.icon,
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  balance: {
    paddingTop: 10,
    fontSize: 32,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.light.icon,
  },
  fiatValue: {
    fontSize: 16,
    color: Colors.light.icon,
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
  actionButton: {
    alignItems: "center",
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
