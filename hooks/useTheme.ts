/**
 * Unified theme management hook that combines Colors and Theme functionality
 * with Zustand for persistent user preference storage.
 */

import { Colors } from '@/constants/Colors';
import { useThemeStore, type ActiveTheme, type ThemeMode } from '@/stores/useThemeStore';
import { useEffect } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

interface UseThemeReturn {
  // Current theme values
  theme: ActiveTheme;
  mode: ThemeMode;
  colors: typeof Colors.light | typeof Colors.dark;
  
  // Theme management functions
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  
  // Color utilities
  getColor: (colorName: ColorName) => string;
  getThemedColor: (props: { light?: string; dark?: string }, colorName?: ColorName) => string;
}

/**
 * Main theme hook that provides theme state and color utilities
 */
export function useTheme(): UseThemeReturn {
  const systemColorScheme = useRNColorScheme();
  const { 
    mode, 
    activeTheme, 
    setMode, 
    setSystemTheme, 
    toggleTheme 
  } = useThemeStore();

  // Update system theme when it changes
  useEffect(() => {
    const detectedTheme = (systemColorScheme === 'dark' ? 'dark' : 'light') as ActiveTheme;
    setSystemTheme(detectedTheme);
  }, [systemColorScheme, setSystemTheme]);

  const colors = Colors[activeTheme];

  const getColor = (colorName: ColorName): string => {
    return colors[colorName];
  };

  const getThemedColor = (
    props: { light?: string; dark?: string }, 
    colorName?: ColorName
  ): string => {
    const colorFromProps = props[activeTheme];
    
    if (colorFromProps) {
      return colorFromProps;
    } else if (colorName) {
      return colors[colorName];
    } else {
      return colors.text; // fallback
    }
  };

  return {
    theme: activeTheme,
    mode,
    colors,
    setMode,
    toggleTheme,
    getColor,
    getThemedColor,
  };
}
/**
 * Hook to get current color scheme, enhanced with user preference support
 */
export function useColorScheme(): ActiveTheme {
  const { theme } = useTheme();
  return theme;
}