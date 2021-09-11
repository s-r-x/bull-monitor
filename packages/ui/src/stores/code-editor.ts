import { StorageConfig } from '@/config/storage';
import createStore from 'zustand';
import { persist } from 'zustand/middleware';

type TState = {
  theme: string;
  keyMap: string;
  tabSize: number;

  changeTabSize: (tabSize: number) => void;
  changeTheme: (theme: string) => void;
  changeKeyMap: (keyMap: string) => void;
};

export const useCodeEditorStore = createStore<TState>(
  persist(
    (set) => ({
      keyMap: 'default',
      theme: 'material',
      tabSize: 2,

      changeTabSize: (tabSize) => set({ tabSize }),
      changeKeyMap: (keyMap) => set({ keyMap }),
      changeTheme: (theme) => set({ theme }),
    }),
    {
      name: `${StorageConfig.persistNs}code-editor`,
    }
  )
);
