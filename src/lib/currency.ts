export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rate: number; // Rate relative to USD
}

export const currencies: Currency[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    flag: '🇺🇸',
    rate: 1
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    flag: '🇪🇺',
    rate: 0.85
  },
  {
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: 'ر.س',
    flag: '🇸🇦',
    rate: 3.75
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
    flag: '🇦🇪',
    rate: 3.67
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    flag: '🇬🇧',
    rate: 0.73
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'C$',
    flag: '🇨🇦',
    rate: 1.35
  }
];

export function getCurrency(code: string): Currency | undefined {
  return currencies.find(currency => currency.code === code);
}

export function convertPrice(priceUSD: number, targetCurrency: string): number {
  const currency = getCurrency(targetCurrency);
  if (!currency) return priceUSD;
  
  return Math.round(priceUSD * currency.rate * 100) / 100;
}

export function formatPrice(price: number, currencyCode: string): string {
  const currency = getCurrency(currencyCode);
  if (!currency) return `$${price}`;
  
  const convertedPrice = convertPrice(price, currencyCode);
  
  // Format based on currency
  switch (currencyCode) {
    case 'USD':
    case 'CAD':
      return `${currency.symbol}${convertedPrice}`;
    case 'EUR':
    case 'GBP':
      return `${currency.symbol}${convertedPrice}`;
    case 'SAR':
    case 'AED':
      return `${convertedPrice} ${currency.symbol}`;
    default:
      return `${currency.symbol}${convertedPrice}`;
  }
}

export function getDefaultCurrency(locale?: string): string {
  if (!locale) return 'USD';
  
  // Map locales to default currencies
  const localeCurrencyMap: Record<string, string> = {
    'en': 'USD',
    'ar': 'SAR',
    'en-US': 'USD',
    'en-GB': 'GBP',
    'en-CA': 'CAD',
    'ar-SA': 'SAR',
    'ar-AE': 'AED',
    'fr': 'EUR',
    'de': 'EUR',
    'es': 'EUR',
    'it': 'EUR'
  };
  
  return localeCurrencyMap[locale] || 'USD';
}

// Get currency based on user's location (if available)
export async function detectUserCurrency(): Promise<string> {
  try {
    // Try to detect from browser language/locale first
    const locale = navigator.language || 'en-US';
    const localeCurrencyMap: Record<string, string> = {
      'en-US': 'USD',
      'en-CA': 'CAD',
      'en-GB': 'GBP',
      'ar-SA': 'SAR',
      'ar-AE': 'AED',
      'de': 'EUR',
      'de-DE': 'EUR',
      'fr': 'EUR',
      'fr-FR': 'EUR',
      'es': 'EUR',
      'es-ES': 'EUR',
      'it': 'EUR',
      'it-IT': 'EUR',
      'nl': 'EUR',
      'nl-NL': 'EUR'
    };

    // Check exact match first
    if (localeCurrencyMap[locale]) {
      return localeCurrencyMap[locale];
    }

    // Check language code only
    const languageCode = locale.split('-')[0];
    const languageCurrencyMap: Record<string, string> = {
      'ar': 'SAR',
      'de': 'EUR',
      'fr': 'EUR',
      'es': 'EUR',
      'it': 'EUR',
      'nl': 'EUR'
    };

    return languageCurrencyMap[languageCode] || 'USD';
  } catch (error) {
    console.error('Failed to detect user currency:', error);
    return 'USD';
  }
}

// Update exchange rates (in a real app, this would fetch from an API)
export async function updateExchangeRates(): Promise<void> {
  try {
    // In a real application, you would fetch from a currency API like:
    // const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    // const data = await response.json();
    
    // For now, we'll use static rates
    console.log('Exchange rates updated (using static rates for demo)');
  } catch (error) {
    console.error('Failed to update exchange rates:', error);
  }
}

// Get currency display info for UI
export function getCurrencyDisplayInfo(code: string) {
  const currency = getCurrency(code);
  if (!currency) return null;
  
  return {
    code: currency.code,
    name: currency.name,
    symbol: currency.symbol,
    flag: currency.flag,
    displayName: `${currency.flag} ${currency.code} - ${currency.name}`
  };
}
