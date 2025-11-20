'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
            },
          },
        })
      }
    >
      {children}
    </QueryClientProvider>
  );
};
