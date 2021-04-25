import { useMemo } from 'react';
import createStore from 'zustand';
import { createMuiTheme } from '@material-ui/core/styles';
import { persist } from 'zustand/middleware';
import { StorageConfig } from '@/config/storage';
import deepPurple from '@material-ui/core/colors/deepPurple';
import deepOrange from '@material-ui/core/colors/deepOrange';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import teal from '@material-ui/core/colors/teal';
import amber from '@material-ui/core/colors/amber';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';
import lightGreen from '@material-ui/core/colors/lightGreen';
import blueGrey from '@material-ui/core/colors/blueGrey';
import brown from '@material-ui/core/colors/brown';
import cyan from '@material-ui/core/colors/cyan';
import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';

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
    },
  ),
);
export const getMuiTheme = () => {
  const [theme, palette] = useThemeStore((state) => [
    state.theme,
    state.palette,
  ]);
  return useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: palettesMap[palette],
          type: theme,
        },
      }),
    [theme, palette],
  );
};
