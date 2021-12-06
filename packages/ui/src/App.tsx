import React from 'react';
import Shell from '@/shell';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'notistack';
import { useRunStoreSideEffects } from './stores/side-effects';
import { useDynamicPageTitle } from './hooks/use-dynamic-page-title';
import WorkspaceShareGate from '@/gates/workspace-share';
import { NetworkProvider } from '@/providers/network';
import { QueuesQueryProvider } from '@/providers/queues-query';
import { ThemeProvider } from '@/providers/theme';
import ScreensSwitch from './screens/switch';

const queryClient = new QueryClient();

export default function App() {
  useRunStoreSideEffects();
  useDynamicPageTitle();
  return (
    <WorkspaceShareGate>
      <NetworkProvider>
        <ThemeProvider>
          <ConfirmProvider>
            <SnackbarProvider maxSnack={3}>
              <QueryClientProvider client={queryClient}>
                <QueuesQueryProvider>
                  <Shell>
                    <ScreensSwitch />
                  </Shell>
                </QueuesQueryProvider>
              </QueryClientProvider>
            </SnackbarProvider>
          </ConfirmProvider>
        </ThemeProvider>
      </NetworkProvider>
    </WorkspaceShareGate>
  );
}
