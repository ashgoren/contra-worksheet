import { useFormContext } from 'react-hook-form';
import type { WorksheetFormData } from 'types/worksheet';
import { parse } from 'utils';

export const useCash = () => {
  const { watch } = useFormContext<WorksheetFormData>();

  const cashValues = watch(['ones', 'fives', 'tens', 'twenties', 'fifties', 'hundreds', 'coins']).map(parse);

  if (cashValues.every(v => typeof v === 'number')) {
    const [ones, fives, tens, twenties, fifties, hundreds, coins] = cashValues;
    const total =
      coins +
      ones +
      fives * 5 +
      tens * 10 +
      twenties * 20 +
      fifties * 50 +
      hundreds * 100;
    return { totalCashInBox: total };
  } else {
    return { totalCashInBox: null };
  }
};
