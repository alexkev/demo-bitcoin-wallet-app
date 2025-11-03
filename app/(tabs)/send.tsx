import { SendBitcoin } from "@/components/wallet/SendBitcoin";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function SendScreen() {
  return (
    <View style={styles.container}>
      <SendBitcoin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});
