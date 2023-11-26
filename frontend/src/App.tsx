import { ThemeProvider } from '@mui/material';
import theme from '@/shared/theme/theme';
import AuthProvider from '@/providers/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ToastProvider from '@/providers/ToastProvider';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import { SWRConfig } from 'swr';
import { swrFetcher } from '@/shared/api/api';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SWRConfig
          value={{
            fetcher: swrFetcher,
            dedupingInterval: 4000,
            focusThrottleInterval: 10000,
            loadingTimeout: 4000,
            revalidateOnFocus: false,
          }}
        >
          <AuthProvider>
            <ToastProvider>
              <AppWrapper />
            </ToastProvider>
          </AuthProvider>
        </SWRConfig>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
