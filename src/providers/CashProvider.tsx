import { useFormContext } from 'react-hook-form';
import type { WorksheetFormData } from 'src/types/worksheet';
import { CashContext } from 'src/contexts/cash';
import type { ReactNode } from 'react';

const useCash = () => {
  const { watch } = useFormContext<WorksheetFormData>();

  const [ones, fives, tens, twenties, fifties, hundreds, coins] = watch([
    'ones', 'fives', 'tens', 'twenties', 'fifties', 'hundreds', 'coins'
  ]);

  const allValuesEntered = [ones, fives, tens, twenties, fifties, hundreds, coins].every(v => v !== null);
  const total =
    (coins || 0) +
    (ones || 0) +
    (fives || 0) * 5 +
    (tens || 0) * 10 +
    (twenties || 0) * 20 +
    (fifties || 0) * 50 +
    (hundreds || 0) * 100;

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
