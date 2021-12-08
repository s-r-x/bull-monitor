import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useCodeEditorStore } from '@/stores/code-editor';
import shallow from 'zustand/shallow';

const AVAILABLE_THEMES = [
  'material',
  'solarized',
  'monokai',
  //'material-darker',
  //'material-palenight',
  //'material-ocean',
  'dracula',
];
const AVAILABLE_KEY_MAP = ['vim', 'emacs', 'default', 'sublime'];
const AVAILABLE_TAB_SIZES = [2, 4, 8];

export default function CodeEditorSettings() {
  const [theme, changeTheme, keyMap, changeKeyMap, tabSize, changeTabSize] =
    useCodeEditorStore(
      (state) => [
        state.theme,
        state.changeTheme,
        state.keyMap,
        state.changeKeyMap,
        state.tabSize,
        state.changeTabSize,
      ],
      shallow
    );
  return (
    <div>
      <TextField
        margin="normal"
        value={theme}
        onChange={(e) => changeTheme(e.target.value)}
        variant="outlined"
        fullWidth
        select
        id="editor-settings_theme"
        label="Theme"
      >
        {AVAILABLE_THEMES.map((theme) => (
          <MenuItem key={theme} value={theme}>
            {theme}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        margin="normal"
        value={keyMap}
        onChange={(e) => changeKeyMap(e.target.value)}
        variant="outlined"
        fullWidth
        select
        id="editor-settings_key-map"
        label="Key map"
      >
        {AVAILABLE_KEY_MAP.map((keyMap) => (
          <MenuItem key={theme} value={keyMap}>
            {keyMap}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        margin="normal"
        value={tabSize}
        variant="outlined"
        onChange={(e) => changeTabSize(Number(e.target.value))}
        fullWidth
        select
        id="editor-settings_tab-size"
        label="Tab size"
      >
        {AVAILABLE_TAB_SIZES.map((tabSize) => (
          <MenuItem key={theme} value={tabSize}>
            {tabSize}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
