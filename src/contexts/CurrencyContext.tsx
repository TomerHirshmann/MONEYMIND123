import React, { createContext, useContext, useState } from 'react';

interface CurrencyContextType {
  currency: 'ILS' | 'USD';
  setCurrency: (currency: 'ILS' | 'USD') => void;
  formatAmount: (amount: number, currency?: 'ILS' | 'USD') => string;
  convertAmount: (amount: number, from: 'ILS' | 'USD', to: 'ILS' | 'USD') => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Using a fixed rate for demo purposes. In production, this should come from an API
const USD_TO_ILS_RATE = 3.65;

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<'ILS' | 'USD'>('ILS');

  const formatAmount = (amount: number, forceCurrency?: 'ILS' | 'USD') => {
    const currencyToUse = forceCurrency || currency;
    const formatter = new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: currencyToUse,
      maximumFractionDigits: 0
    });
    return formatter.format(amount);
  };

  const convertAmount = (amount: number, from: 'ILS' | 'USD', to: 'ILS' | 'USD') => {
    if (from === to) return amount;
    if (from === 'ILS' && to === 'USD') return amount / USD_TO_ILS_RATE;
    return amount * USD_TO_ILS_RATE;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatAmount, convertAmount }}>
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