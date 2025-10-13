import { useFormContext, useWatch } from 'react-hook-form';
import { calculateTotalCash } from 'services/financials';
import type { WorksheetFormData } from 'types/worksheet';

export const useCash = () => {
  const { control } = useFormContext<WorksheetFormData>();

  const [ones, fives, tens, twenties, fifties, hundreds, coins] = useWatch({
    name: ['ones', 'fives', 'tens', 'twenties', 'fifties', 'hundreds', 'coins'],
    control
  });

  const totalCashInBox = calculateTotalCash({ ones, fives, tens, twenties, fifties, hundreds, coins });

  return { totalCashInBox };
};
