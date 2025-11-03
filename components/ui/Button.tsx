import { Colors } from '@/constants/Colors';
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
  iconColor = Colors.light.icon,
  variant = 'rounded',
  size = 'md',
  fullWidth = true,
  backgroundColor = Colors.light.tint,
  textColor = Colors.light.text,
  textStyle,
  buttonStyle,
  ...props
}: ButtonProps) {
  const isRectangular = variant === 'rectangular';
  
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
          backgroundColor,
          borderRadius: currentSize.borderRadius,
          height: currentSize.height,
          width: fullWidth ? '100%' : 'auto',
          paddingHorizontal: fullWidth ? 16 : 24,
        },
        buttonStyle
      ]} 
      onPress={onPress}
      {...props}
    >
      <Text style={[
        styles.buttonText,
        { 
          color: textColor,
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
          color={iconColor} 
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
