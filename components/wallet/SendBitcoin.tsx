import { Button } from "@/components/ui/Button";
import { StyledTextInput } from "@/components/ui/StyledTextInput";
import { AvailableBalance } from "@/components/wallet/AvailableBalance";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import { useNetworkFee } from "@/hooks/useNetworkFee";
import { useTheme } from "@/hooks/useTheme";
import { useWalletStore } from "@/stores/useWalletStore";
import { formatBitcoinAmount, isValidBitcoinAddress, validateBitcoinAmount } from "@/utils/bitcoinValidation";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
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

  // Get theme colors
  const { colors } = useTheme();

  // Get wallet data from Zustand store
  const { calculateBalance, canSendAmount, getNetworkFee, setNetworkFee, addTransaction } = useWalletStore();
  const { price: usdRate } = useBitcoinPrice();
  const { selectedFee: dynamicNetworkFee, isLoading: feeLoading } = useNetworkFee('halfHour');
  const balance = calculateBalance();
  const networkFee = getNetworkFee();

  // Update the wallet store with the dynamic network fee
  React.useEffect(() => {
    if (!feeLoading && dynamicNetworkFee > 0) {
      setNetworkFee(dynamicNetworkFee);
    }
  }, [dynamicNetworkFee, feeLoading, setNetworkFee]);

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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.navBar]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={[styles.backButtonText, { color: colors.text }]}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Send Bitcoin</Text>
        <View style={styles.rightSpace} />
      </View>
      <View style={{flex: 1, justifyContent: "flex-start"}}>
        <AvailableBalance />
        <View style={styles.form}>
          <StyledTextInput
            label="Amount (BTC)"
            placeholder="0.00000000"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={handleAmountChange}
            error={amountError}
            helperText={`≈ ${usdValue}`}
            rightButton={{
              title: "MAX",
              onPress: handleMaxPress,
              disabled: maxSendableAmount <= 0,
            }}
          />
  
          <StyledTextInput
            label="Recipient Address"
            placeholder="Enter Bitcoin address"
            value={address}
            onChangeText={handleAddressChange}
            error={addressError}
            autoCapitalize="none"
          />
  
          <View style={[styles.feeContainer, { backgroundColor: colors.icon + "10" }]}>
            <Text style={[styles.feeText, { color: colors.icon }]}>Network Fee:</Text>
            <Text style={[styles.feeAmount, { color: colors.text }]}>{formatBitcoinAmount(networkFee)} BTC</Text>
          </View>
  
          <Button
            title="Send Bitcoin"
            onPress={handleSend}
            disabled={!isFormValid || feeLoading}
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
    borderBottomWidth: 0.5,
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
    fontWeight: '400',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  rightSpace: {
    minWidth: 60,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    padding: 20,
  },
  feeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  feeText: {
    fontSize: 14,
  },
  feeAmount: {
    fontSize: 14,
    fontWeight: "500",
  },
  sendButton: {
    height: 56, 
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    alignSelf: "center",
  },
  sendButtonDisabled: {
  },
  sendButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
