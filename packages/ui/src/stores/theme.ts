import { useMemo } from 'react';
import createStore from 'zustand';
import { createTheme } from '@mui/material/styles';
import { persist } from 'zustand/middleware';
import { StorageConfig } from '@/config/storage';

import {
  deepPurple,
  deepOrange,
  blue,
  indigo,
  pink,
  teal,
  amber,
  lightBlue,
  red,
  lightGreen,
  blueGrey,
  brown,
  cyan,
  yellow,
  grey,
} from '@mui/material/colors';

const palettesMap = {
  deepPurple,
  deepOrange,
  blue,
  indigo,
  pink,
  teal,
  amber,
  red,
  lightBlue,
  lightGreen,
  blueGrey,
  brown,
  grey,
  cyan,
  yellow,
};
type TTheme = 'light' | 'dark';
type TPalette = keyof typeof palettesMap;
export const SUPPORTED_PALETTES = Object.keys(palettesMap) as TPalette[];
type TState = {
  theme: TTheme;
  palette: TPalette;

  changeTheme: (theme: TTheme) => void;
  toggleTheme: () => void;
  changePalette: (palette: TPalette) => void;
};

export const useThemeStore = createStore<TState>(
  persist(
    (set) => ({
      palette: 'deepPurple',
      theme: 'dark',
      changeTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      changePalette: (palette) => set({ palette }),
    }),
    {
      name: `${StorageConfig.persistNs}theme`,
    }
  )
);
export const getMuiTheme = () => {
  const [theme, palette] = useThemeStore((state) => [
    state.theme,
    state.palette,
  ]);
  return useMemo(
    () =>
      createTheme({
        palette: {
          primary: palettesMap[palette],
          secondary: red,
          mode: theme,
        },
      }),
    [theme, palette]
  );
};
