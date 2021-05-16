import React from 'react';
import Shell from '@/components/Shell';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getMuiTheme, useThemeStore } from '@/stores/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import JobsScreen from '@/screens/jobs';
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'notistack';
import { NetworkProvider } from './providers/network';
import { useRunStoreSideEffects } from './stores/side-effects';
import { usePreferencesStore } from './stores/preferences';
import { useNetworkSettingsStore } from './stores/network-settings';
import { useQueuesFilterStore } from './stores/queues-filter';

const queryClient = new QueryClient();

export default function App() {
  const muiTheme = getMuiTheme();
  useRunStoreSideEffects();
  usePreferencesStore();
  useQueuesFilterStore();
  useNetworkSettingsStore();
  useThemeStore();
  return (
    <NetworkProvider>
      <MuiThemeProvider theme={muiTheme}>
        <ConfirmProvider>
          <SnackbarProvider maxSnack={3}>
            <QueryClientProvider client={queryClient}>
              <Shell>
                <JobsScreen />
              </Shell>
            </QueryClientProvider>
          </SnackbarProvider>
        </ConfirmProvider>
      </MuiThemeProvider>
    </NetworkProvider>
  );
}
