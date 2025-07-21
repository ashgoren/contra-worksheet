import { useFormContext } from 'react-hook-form';
import type { WorksheetFormData } from 'src/types/worksheet';
import { CashContext } from 'src/contexts/cash';
import type { ReactNode } from 'react';

const useCash = () => {
  const { watch } = useFormContext<WorksheetFormData>();

  const [ones, fives, tens, twenties, fifties, hundreds, coins] = watch([
    'ones', 'fives', 'tens', 'twenties', 'fifties', 'hundreds', 'coins'
  ]);

  const allValuesEntered = [ones, fives, tens, twenties, fifties, hundreds, coins].every(v => v !== '');
  const total =
    (Number(coins) || 0) +
    (Number(ones) || 0) +
    (Number(fives) || 0) * 5 +
    (Number(tens) || 0) * 10 +
    (Number(twenties) || 0) * 20 +
    (Number(fifties) || 0) * 50 +
    (Number(hundreds) || 0) * 100;

  return { totalCashInBox: allValuesEntered ? total : null };
};

export const CashProvider = ({ children }: { children: ReactNode }) => {
  const cashData = useCash();  
  return (
    <CashContext.Provider value={cashData}>
      {children}
    </CashContext.Provider>
  );
};
