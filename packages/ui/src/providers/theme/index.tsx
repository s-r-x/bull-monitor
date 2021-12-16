import React from 'react';
import { getMuiTheme } from '@/stores/theme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/styled-engine';

export const ThemeProvider: React.FC = (props) => {
  const muiTheme = getMuiTheme();
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>{props.children}</MuiThemeProvider>
    </StyledEngineProvider>
  );
};
