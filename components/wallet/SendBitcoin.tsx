import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const SendBitcoin = () => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const handleSend = () => {
    Alert.alert("Confirm Transaction", `Send ${amount} BTC to ${address}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Confirm",
        onPress: () => Alert.alert("Success", "Transaction initiated! (Mock)"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Send Bitcoin</Text>
        <Text style={styles.subtitle}>Available: 0.17500000 BTC</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount (BTC)</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="0.00000000"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              placeholderTextColor={Colors.light.icon}
            />
            <TouchableOpacity style={styles.maxButton}>
              <Text style={styles.maxButtonText}>MAX</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.fiatValue}>≈ $0.00 USD</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Recipient Address</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Bitcoin address"
              value={address}
              onChangeText={setAddress}
              placeholderTextColor={Colors.light.icon}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.feeContainer}>
          <Text style={styles.feeText}>Network Fee:</Text>
          <Text style={styles.feeAmount}>0.00001 BTC</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.sendButton,
            (!amount || !address) && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!amount || !address}
        >
          <Text style={styles.sendButtonText}>Send Bitcoin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.icon + "20",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.icon,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.icon + "40",
    borderRadius: 12,
    backgroundColor: Colors.light.background,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  maxButton: {
    paddingHorizontal: 12,
    height: 30,
    backgroundColor: Colors.light.tint + "20",
    borderRadius: 15,
    justifyContent: "center",
    marginRight: 8,
  },
  maxButtonText: {
    color: Colors.light.tint,
    fontWeight: "600",
    fontSize: 12,
  },
  scanButton: {
    padding: 12,
  },
  fiatValue: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.light.icon,
  },
  feeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.light.icon + "10",
    borderRadius: 12,
    marginBottom: 24,
  },
  feeText: {
    fontSize: 14,
    color: Colors.light.icon,
  },
  feeAmount: {
    fontSize: 14,
    fontWeight: "500",
  },
  sendButton: {
    backgroundColor: Colors.light.tint,
    height: 56, 
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    alignSelf: "center",
  },
  sendButtonDisabled: {
    backgroundColor: Colors.light.icon + "40",
  },
  sendButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
