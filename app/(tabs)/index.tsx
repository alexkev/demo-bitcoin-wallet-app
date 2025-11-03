import { NavBar } from "@/components/ui/NavBar";
import { TransactionList } from "@/components/wallet/TransactionList";
import { useTheme } from "@/hooks/useTheme";
import { Transaction } from "@/types/wallet";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  // Get theme colors
  const { colors } = useTheme();

  const handleTransactionPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>

      <TransactionList 
        onTransactionPress={handleTransactionPress} 
      />

      {/* Transaction Detail Modal - We'll implement this properly later */}
      <Modal
        visible={selectedTransaction !== null}
        animationType="slide"
        presentationStyle="formSheet"
        onRequestClose={() => setSelectedTransaction(null)}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <NavBar 
            title="Transaction Details"
            showBackButton={false}
            rightComponent={
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setSelectedTransaction(null)}
              >
                <Text style={[styles.closeButtonText, { color: colors.tint }]}>Close</Text>
              </TouchableOpacity>
            }
          />
          {selectedTransaction && (
            <View style={styles.modalContent}>
              <Text style={[styles.detailText, { color: colors.text }]}>ID: {selectedTransaction.id}</Text>
              <Text style={[styles.detailText, { color: colors.text }]}>Type: {selectedTransaction.type}</Text>
              <Text style={[styles.detailText, { color: colors.text }]}>Amount: {selectedTransaction.amount} BTC</Text>
              {selectedTransaction.networkFee && (
                <Text style={[styles.detailText, { color: colors.text }]}>Network Fee: {selectedTransaction.networkFee} BTC</Text>
              )}
              <Text style={[styles.detailText, { color: colors.text }]}>Address: {selectedTransaction.address}</Text>
              <Text style={[styles.detailText, { color: colors.text }]}>Status: {selectedTransaction.status}</Text>
              <Text style={[styles.detailText, { color: colors.text }]}>
                Date: {new Date(selectedTransaction.timestamp).toLocaleString()}
              </Text>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  themeContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
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
  modalContainer: {
    flex: 1,
  },

  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    padding: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 12,
  },
});
