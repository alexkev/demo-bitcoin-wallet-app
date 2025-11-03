import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ActiveTheme = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  activeTheme: ActiveTheme;
  systemTheme: ActiveTheme;
  setMode: (mode: ThemeMode) => void;
  setSystemTheme: (theme: ActiveTheme) => void;
  toggleTheme: () => void;
}

// Simple storage implementation for React Native without AsyncStorage dependency
const createReactNativeStorage = () => {
  const storage = new Map<string, string>();
  
  return {
    getItem: (name: string) => {
      const value = storage.get(name);
      return value ? Promise.resolve(value) : Promise.resolve(null);
    },
    setItem: (name: string, value: string) => {
      storage.set(name, value);
      return Promise.resolve();
    },
    removeItem: (name: string) => {
      storage.delete(name);
      return Promise.resolve();
    },
  };
};

// For web, we'll use localStorage, for mobile we'll use a simple Map-based storage
const storage = Platform.OS === 'web' 
  ? createJSONStorage(() => localStorage)
  : createJSONStorage(() => createReactNativeStorage());

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'auto',
      activeTheme: 'light',
      systemTheme: 'light',
      
      setMode: (mode: ThemeMode) => {
        set((state) => {
          const newActiveTheme = mode === 'auto' 
            ? state.systemTheme 
            : mode as ActiveTheme;
          
          return {
            mode,
            activeTheme: newActiveTheme,
          };
        });
      },
      
      setSystemTheme: (theme: ActiveTheme) => {
        set((state) => {
          const newActiveTheme = state.mode === 'auto' 
            ? theme 
            : state.activeTheme;
          
          return {
            systemTheme: theme,
            activeTheme: newActiveTheme,
          };
        });
      },
      
      toggleTheme: () => {
        const { mode } = get();
        if (mode === 'auto') {
          set({ mode: 'light', activeTheme: 'light' });
        } else if (mode === 'light') {
          set({ mode: 'dark', activeTheme: 'dark' });
        } else {
          set({ mode: 'auto', activeTheme: get().systemTheme });
        }
      },
    }),
    {
      name: 'theme-storage',
      storage,
      partialize: (state) => ({ 
        mode: state.mode,
        // Don't persist activeTheme and systemTheme as they should be computed
      }),
      onRehydrateStorage: () => (state) => {
        // After rehydration, ensure activeTheme is properly set based on mode
        if (state) {
          const systemTheme = state.systemTheme || 'light';
          const activeTheme = state.mode === 'auto' ? systemTheme : state.mode as ActiveTheme;
          state.activeTheme = activeTheme;
        }
      },
    }
  )
);