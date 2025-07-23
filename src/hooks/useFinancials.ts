import { useFormContext } from 'react-hook-form';
import type { WorksheetFormData } from 'types/worksheet';
import { useCash } from 'hooks/useCash';
import { parse } from 'utils';

export const useFinancials = () => {
  const { totalCashInBox } = useCash();
  const { watch } = useFormContext<WorksheetFormData>();

  const [startingCash, checks, electronic, donations] = watch([
    'startingCash',
    'checks',
    'electronic',
    'donations',
  ]).map(parse);

  const cashPayments =
    typeof totalCashInBox === 'number' && typeof startingCash === 'number'
      ? totalCashInBox - startingCash
      : null;

  const totalPayments =
    typeof cashPayments === 'number' && typeof checks === 'number' && typeof electronic === 'number'
      ? cashPayments + checks + electronic
      : null;

  const eveningDeposits =
    typeof totalCashInBox === 'number' && typeof checks === 'number'
      ? totalCashInBox + checks
      : null;

  return {
    totalCashInBox,
    cashPayments,
    miscExpenses: null, // placeholder
    checks,
    electronic,
    donations,
    memberships: null, // placeholder
    totalPayments,
    eveningDeposits,
    admissions: null // placeholder
  };
};
