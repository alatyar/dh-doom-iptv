'use client';

import { ReactNode } from 'react';
import { ToastProvider } from '@/components/ui/Toast';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ToastProvider>
      <CurrencyProvider>
        {children}
      </CurrencyProvider>
    </ToastProvider>
  );
}
