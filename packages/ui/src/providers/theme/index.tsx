import React from 'react';
import { getMuiTheme } from '@/stores/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

export const ThemeProvider: React.FC = (props) => {
  const muiTheme = getMuiTheme();
  return <MuiThemeProvider theme={muiTheme}>{props.children}</MuiThemeProvider>;
};
