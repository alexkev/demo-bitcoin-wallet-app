import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { IconSymbol } from './IconSymbol';

type IconSymbolName = 'house.fill' | 'paperplane.fill' | 'chevron.left.forwardslash.chevron.right' | 'chevron.right' | 'bitcoinsign.circle.fill' | 'arrow.down.left' | 'arrow.up.right';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  icon?: IconSymbolName;
  iconSize?: number;
  iconColor?: string;
  variant?: 'rounded' | 'rectangular';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  backgroundColor?: string;
  textColor?: string;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
}

export function Button({
  title,
  onPress,
  icon,
  iconSize,
  iconColor,
  variant = 'rectangular',
  size = 'md',
  fullWidth = true,
  backgroundColor,
  textColor,
  textStyle,
  buttonStyle,
  disabled,
  ...props
}: ButtonProps) {
  const { colors } = useTheme();
  const isRectangular = variant === 'rectangular';
  
  const finalBackgroundColor = disabled ? colors.icon + '40' : colors.tint;
  const finalTextColor = disabled ? colors.icon : colors.buttonText;
  const finalIconColor = disabled ? colors.icon : colors.buttonIcon;
  
  // Size configurations
  const sizeConfig = {
    sm: { height: 40, fontSize: 14, iconSize: 20, borderRadius: isRectangular ? 8 : 20 },
    md: { height: 56, fontSize: 16, iconSize: 24, borderRadius: isRectangular ? 12 : 28 },
    lg: { height: 64, fontSize: 18, iconSize: 28, borderRadius: isRectangular ? 16 : 32 },
  };
  
  const currentSize = sizeConfig[size];
  const finalIconSize = iconSize || currentSize.iconSize;
  
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        {
          backgroundColor: finalBackgroundColor,
          borderRadius: currentSize.borderRadius,
          height: currentSize.height,
          width: fullWidth ? '100%' : 'auto',
          paddingHorizontal: fullWidth ? 16 : 24,
        },
        buttonStyle
      ]} 
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <Text style={[
        styles.buttonText,
        { 
          color: finalTextColor,
          fontSize: currentSize.fontSize,
        },
        textStyle
      ]}>
        {title}
      </Text>
      {icon && (
        <IconSymbol 
          size={finalIconSize} 
          name={icon} 
          color={finalIconColor} 
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    fontWeight: '600',
  },
});
