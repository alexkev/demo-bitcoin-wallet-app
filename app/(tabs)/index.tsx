import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
     <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.label}>Available Balance</Text>
        <View style={styles.amountRow}>
          <Text style={styles.balance}>{0.175.toFixed(8)}</Text>
          <Text style={styles.currency}> BTC</Text>
        </View>

        <Text style={styles.fiatValue}>≈ $5,250.00 USD</Text>
      </View>

      <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send your first bitcoin</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

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
  sendButton: {
    backgroundColor: Colors.light.tint,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  sendButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
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
