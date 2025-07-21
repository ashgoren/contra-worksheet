import { useContext } from 'react';
import { CashContext } from 'src/contexts/cash';

export const useCashContext = () => {
  const context = useContext(CashContext);
  if (!context) throw new Error('useCashContext must be used within a CashProvider');
  return context;
};
