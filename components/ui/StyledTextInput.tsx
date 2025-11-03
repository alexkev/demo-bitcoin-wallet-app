import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface StyledTextInputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  helperText?: string;
  rightButton?: {
    title: string;
    onPress: () => void;
    disabled?: boolean;
  };
  containerStyle?: ViewStyle;
}

export const StyledTextInput: React.FC<StyledTextInputProps> = ({
  label,
  error,
  helperText,
  rightButton,
  containerStyle,
  ...textInputProps
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View style={[
        styles.inputWrapper,
        { borderColor: colors.icon + "40", backgroundColor: colors.background },
        error ? styles.inputError : null,
        containerStyle
      ]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholderTextColor={colors.icon}
          {...textInputProps}
        />
        {rightButton && (
          <TouchableOpacity
            style={[styles.rightButton, { backgroundColor: colors.tint }]}
            onPress={rightButton.onPress}
            disabled={rightButton.disabled}
          >
            <Text style={styles.rightButtonText}>{rightButton.title}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {helperText && !error ? (
        <Text style={[styles.helperText, { color: colors.icon }]}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 12,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  rightButton: {
    paddingHorizontal: 12,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    marginRight: 8,
  },
  rightButtonText: {
    fontWeight: "600",
    fontSize: 12,
  },
  helperText: {
    marginTop: 8,
    fontSize: 14,
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