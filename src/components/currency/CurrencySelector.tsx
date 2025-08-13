'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { currencies, getCurrencyDisplayInfo } from '@/lib/currency';

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  className?: string;
}

export function CurrencySelector({ 
  selectedCurrency, 
  onCurrencyChange, 
  className = '' 
}: CurrencySelectorProps) {
  const t = useTranslations('currency');
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedCurrencyInfo = getCurrencyDisplayInfo(selectedCurrency);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.currency-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleCurrencySelect = (currencyCode: string) => {
    onCurrencyChange(currencyCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative currency-selector ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg hover:border-gray-400 dark:hover:border-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        aria-label={t('selectCurrency', { defaultValue: 'Select Currency' })}
      >
        <span className="text-lg">{selectedCurrencyInfo?.flag}</span>
        <span className="font-medium text-gray-900 dark:text-white">{selectedCurrency}</span>
        <svg
          className={`w-4 h-4 text-gray-500 dark:text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide px-2 py-1 mb-1">
              {t('selectCurrency', { defaultValue: 'Select Currency' })}
            </div>
            {currencies.map((currency) => {
              const isSelected = currency.code === selectedCurrency;
              return (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencySelect(currency.code)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors ${
                    isSelected ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  <span className="text-lg">{currency.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{currency.code}</div>
                    <div className="text-sm text-gray-500 dark:text-slate-400">{currency.name}</div>
                  </div>
                  {isSelected && (
                    <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-gray-100 dark:border-slate-600 p-3 bg-gray-50 dark:bg-slate-800 rounded-b-lg">
            <div className="text-xs text-gray-500 dark:text-slate-400 text-center">
              {t('exchangeRateNote', {
                defaultValue: 'Exchange rates are updated regularly'
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Compact version for mobile/small spaces
export function CurrencySelectorCompact({ 
  selectedCurrency, 
  onCurrencyChange, 
  className = '' 
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCurrencyInfo = getCurrencyDisplayInfo(selectedCurrency);

  return (
    <div className={`relative currency-selector ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-slate-600 rounded-md hover:bg-gray-200 dark:hover:bg-slate-500 transition-colors"
      >
        <span className="text-sm">{selectedCurrencyInfo?.flag}</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedCurrency}</span>
        <svg className={`w-3 h-3 text-gray-600 dark:text-slate-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg z-50">
          <div className="p-1">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  onCurrencyChange(currency.code);
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-2 py-1.5 rounded text-left hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors text-gray-900 dark:text-white"
              >
                <span>{currency.flag}</span>
                <span className="text-sm font-medium">{currency.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
