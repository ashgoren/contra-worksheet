import { useFormContext, useWatch } from 'react-hook-form';
import type { WorksheetFormData } from 'types/worksheet';
import { parse } from 'utils';

export const useCash = () => {
  const { control } = useFormContext<WorksheetFormData>();

  const cashValues = useWatch({
    name: ['ones', 'fives', 'tens', 'twenties', 'fifties', 'hundreds', 'coins'],
    control
  }).map(parse);

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
