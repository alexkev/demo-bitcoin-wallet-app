import { useTheme } from "@/hooks/useTheme";
import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface NavBarProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  backButtonText?: string;
}

export const NavBar: React.FC<NavBarProps> = ({
  title,
  showBackButton = true,
  onBackPress,
  rightComponent,
  leftComponent,
  backButtonText = "‹ Back",
}) => {
  const { colors } = useTheme();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.navBar}>
      {/* Left side */}
      <View style={styles.leftSide}>
        {leftComponent ? (
          leftComponent
        ) : showBackButton ? (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Text style={[styles.backButtonText, { color: colors.text }]}>
              {backButtonText}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}
      </View>

      {/* Center - Title */}
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

      {/* Right side */}
      <View style={styles.rightSide}>
        {rightComponent || <View style={styles.spacer} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  leftSide: {
    minWidth: 60,
    alignItems: 'flex-start',
  },
  rightSide: {
    minWidth: 60,
    alignItems: 'flex-end',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
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
  spacer: {
    minWidth: 60,
  },
});