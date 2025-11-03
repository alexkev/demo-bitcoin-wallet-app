import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useNetworkActivityDevTools } from '@rozenite/network-activity-plugin';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SWRConfig } from 'swr';

import { useTheme } from '@/hooks/useTheme';

export default function RootLayout() {
  useNetworkActivityDevTools();
  const theme = useTheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SWRConfig
      value={{
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
      }}
    >
      <ThemeProvider value={theme.mode === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SWRConfig>
  );
}
