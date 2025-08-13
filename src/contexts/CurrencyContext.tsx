'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { getDefaultCurrency, detectUserCurrency } from '@/lib/currency';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const locale = useLocale();
  const [currency, setCurrencyState] = useState<string>('USD');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
          setCurrencyState('USD');
          setIsLoading(false);
          return;
        }

        // Check if user has a saved preference
        const savedCurrency = localStorage.getItem('preferred-currency');

        if (savedCurrency) {
          setCurrencyState(savedCurrency);
        } else {
          // Try to detect user's currency based on browser locale
          try {
            const detectedCurrency = await detectUserCurrency();
            setCurrencyState(detectedCurrency);
          } catch (error) {
            console.error('Currency detection failed:', error);
            // Fallback to locale-based default
            const defaultCurrency = getDefaultCurrency(locale);
            setCurrencyState(defaultCurrency);
          }
        }
      } catch (error) {
        console.error('Failed to initialize currency:', error);
        setCurrencyState('USD');
      } finally {
        setIsLoading(false);
      }
    };

    initializeCurrency();
  }, [locale]);

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);

    // Only use localStorage in browser environment
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-currency', newCurrency);

      // Track currency change for analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', 'currency_change', {
          currency: newCurrency,
          previous_currency: currency
        });
      }
    }
  };

  const value = {
    currency,
    setCurrency,
    isLoading
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

// Hook for formatting prices with current currency
export function usePrice() {
  const { currency } = useCurrency();
  
  const formatPrice = (priceUSD: number): string => {
    const { formatPrice: format } = require('@/lib/currency');
    return format(priceUSD, currency);
  };

  const convertPrice = (priceUSD: number): number => {
    const { convertPrice: convert } = require('@/lib/currency');
    return convert(priceUSD, currency);
  };

  return {
    currency,
    formatPrice,
    convertPrice
  };
}
