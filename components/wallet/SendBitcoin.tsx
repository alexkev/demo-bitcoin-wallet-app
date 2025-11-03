import { Button } from "@/components/ui/Button";
import { AvailableBalance } from "@/components/wallet/AvailableBalance";
import { Colors } from "@/constants/Colors";
import { useWalletStore } from "@/stores/useWalletStore";
import { formatBitcoinAmount, isValidBitcoinAddress, validateBitcoinAmount } from "@/utils/bitcoinValidation";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, } from "react-native-safe-area-context";

/*
 * DEMO ADDRESSES FOR TESTING:
 * 
 * ✅ VALID ADDRESSES:
 * Legacy (P2PKH):     1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
 * Legacy (P2PKH):     1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2
 * P2SH:               3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy
 * Testnet Legacy:     mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef
 * Testnet P2SH:       2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc
 * Testnet Bech32:     tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx
 * 
 * ❌ INVALID ADDRESSES:
 * Too short:         1A1zP1eP5QGefi2DMPTfTL5SL
 * Too long:          1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNaExtraChars123456789
 * Invalid characters: 1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf0a
 * Wrong prefix:       4A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
 * Empty string:       
 * Non-address:        not-a-bitcoin-address
 * Mixed case bech32:  BC1QXY2KGDYGJRSQTZQ2N0YRF2493P83KKFJHX0WLH
 */

export const SendBitcoin = () => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [amountError, setAmountError] = useState("");
  const [addressError, setAddressError] = useState("");

  // Get wallet data from Zustand store
  const { calculateBalance, canSendAmount, getNetworkFee, usdRate, addTransaction } = useWalletStore();
  const balance = calculateBalance();
  const networkFee = getNetworkFee();

  // Validation logic
  const amountValidation = useMemo(() => {
    if (!amount) return { isValid: true, value: 0 };
    return validateBitcoinAmount(amount);
  }, [amount]);

  const isAddressValid = useMemo(() => {
    if (!address) return true;
    return isValidBitcoinAddress(address);
  }, [address]);

  const maxSendableAmount = useMemo(() => {
    const maxAmount = balance - networkFee;
    return Math.max(0, maxAmount);
  }, [balance, networkFee]);

  const usdValue = useMemo(() => {
    if (amountValidation.isValid && amountValidation.value > 0) {
      return (amountValidation.value * usdRate).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    }
    return '$0.00';
  }, [amountValidation, usdRate]);

  const handleAmountChange = (text: string) => {
    setAmount(text);
    setAmountError("");
    
    if (text) {
      const validation = validateBitcoinAmount(text);
      if (!validation.isValid) {
        setAmountError(validation.error || "Invalid amount");
      } else if (!canSendAmount(validation.value)) {
        setAmountError(`Insufficient balance. Max sendable: ${formatBitcoinAmount(maxSendableAmount)} BTC`);
      }
    }
  };

  const handleAddressChange = (text: string) => {
    setAddress(text);
    setAddressError("");
    
    if (text && !isValidBitcoinAddress(text)) {
      setAddressError("Invalid Bitcoin address");
    }
  };

  const handleMaxPress = () => {
    if (maxSendableAmount > 0) {
      const maxAmountStr = formatBitcoinAmount(maxSendableAmount);
      setAmount(maxAmountStr);
      setAmountError("");
    }
  };

  const handleSend = () => {
    // Final validation before sending
    if (!amountValidation.isValid) {
      setAmountError(amountValidation.error || "Invalid amount");
      return;
    }
    
    if (!isAddressValid) {
      setAddressError("Invalid Bitcoin address");
      return;
    }

    if (!canSendAmount(amountValidation.value)) {
      setAmountError(`Insufficient balance. Max sendable: ${formatBitcoinAmount(maxSendableAmount)} BTC`);
      return;
    }

    const confirmTransaction = () => {
      // Create new transaction using Zustand store
      addTransaction({
        type: 'send',
        amount: amountValidation.value,
        address: address.trim(),
        status: 'completed', // In a real app, this would start as 'pending'
      });

      // Clear form
      setAmount("");
      setAddress("");
      setAmountError("");
      setAddressError("");

      // Show success message
      Alert.alert(
        "Transaction Sent!", 
        `Successfully sent ${formatBitcoinAmount(amountValidation.value)} BTC to ${address.slice(0, 8)}...${address.slice(-8)}`,
        [{ text: "OK", style: "default", onPress: () => {
          router.push('/')
        } }]
      );
    };

    Alert.alert(
      "Confirm Transaction", 
      `Send ${formatBitcoinAmount(amountValidation.value)} BTC to ${address.slice(0, 8)}...${address.slice(-8)}?\n\nNetwork Fee: ${formatBitcoinAmount(networkFee)} BTC`, 
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: confirmTransaction, style: "default" },
      ]
    );
  };

  const isFormValid = amountValidation.isValid && isAddressValid && amount && address && !amountError && !addressError;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.navBar]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Send Bitcoin</Text>
        <View style={styles.rightSpace} />
      </View>
      <View style={{flex: 1, justifyContent: "flex-start"}}>
        <AvailableBalance />
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amount (BTC)</Text>
            <View style={[
              styles.inputWrapper,
              amountError ? styles.inputError : null
            ]}>
              <TextInput
                style={styles.input}
                placeholder="0.00000000"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={handleAmountChange}
                placeholderTextColor={Colors.light.icon}
              />
              <TouchableOpacity
                style={styles.maxButton}
                onPress={handleMaxPress}
                disabled={maxSendableAmount <= 0}
              >
                <Text style={styles.maxButtonText}>MAX</Text>
              </TouchableOpacity>
            </View>
            {amountError ? <Text style={styles.errorText}>{amountError}</Text> : null}
            <Text style={styles.fiatValue}>≈ {usdValue}</Text>
          </View>
  
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Recipient Address</Text>
            <View style={[
              styles.inputWrapper,
              addressError ? styles.inputError : null
            ]}>
              <TextInput
                style={styles.input}
                placeholder="Enter Bitcoin address"
                value={address}
                onChangeText={handleAddressChange}
                placeholderTextColor={Colors.light.icon}
                autoCapitalize="none"
              />
            </View>
            {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}
          </View>
  
          <View style={styles.feeContainer}>
            <Text style={styles.feeText}>Network Fee:</Text>
            <Text style={styles.feeAmount}>{formatBitcoinAmount(networkFee)} BTC</Text>
          </View>
  
          <Button
            title="Send Bitcoin"
            onPress={handleSend}
            disabled={!isFormValid}
            icon="paperplane.fill"
            size="md"
            fullWidth={false}
          />
        </View>
      </View> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  header: {
    backgroundColor: Colors.light.background,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.light.icon + "30",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    minWidth: 60,
  },
  backButtonText: {
    fontSize: 17,
    color: Colors.light.tint,
    fontWeight: '400',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.light.text,
    textAlign: 'center',
    flex: 1,
  },
  rightSpace: {
    minWidth: 60,
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
  inputError: {
    borderColor: "#FF6B6B",
    borderWidth: 2,
  },
  errorText: {
    fontSize: 14,
    color: "#FF6B6B",
    marginTop: 4,
    marginLeft: 4,
  },
});
