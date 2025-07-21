import { createContext } from 'react';

export type CashContextType = {
  totalCashInBox: number | null;
};

export const CashContext = createContext<CashContextType | null>(null);
