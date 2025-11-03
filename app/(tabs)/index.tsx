import { Button } from "@/components/ui/Button";
import { AvailableBalance } from "@/components/wallet/AvailableBalance";
import { TransactionList } from "@/components/wallet/TransactionList";
import { useTheme } from "@/hooks/useTheme";
import { useWalletStore } from "@/stores/useWalletStore";
import { Transaction } from "@/types/wallet";
import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  // Get data from Zustand store
  const { transactions, balance} = useWalletStore();
  
  // Get theme colors
  const { colors } = useTheme();

  const handleTransactionPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleSendPress = () => {
    router.push('/send');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <AvailableBalance  />
        <View style={styles.actionsContainer}>
          <Button
            title={balance > 0 ? 'Send Bitcoin' : 'Send your first bitcoin'}
            onPress={handleSendPress}
            icon="paperplane.fill"
            size="sm"
            fullWidth={false}
          />
        </View>
      </View>

      <TransactionList 
        transactions={transactions}
        onTransactionPress={handleTransactionPress} 
      />

      {/* Transaction Detail Modal - We'll implement this properly later */}
      <Modal
        visible={selectedTransaction !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedTransaction(null)}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.outline }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Transaction Details</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedTransaction(null)}
            >
              <Text style={[styles.closeButtonText, { color: colors.tint }]}>Close</Text>
            </TouchableOpacity>
          </View>
          {selectedTransaction && (
            <View style={styles.modalContent}>
              <Text style={[styles.detailText, { color: colors.text }]}>ID: {selectedTransaction.id}</Text>
              <Text style={[styles.detailText, { color: colors.text }]}>Type: {selectedTransaction.type}</Text>
              <Text style={[styles.detailText, { color: colors.text }]}>Amount: {selectedTransaction.amount} BTC</Text>
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
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
