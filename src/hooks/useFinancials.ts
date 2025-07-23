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
    'donations'
  ]).map(parse);

  const [rawMemberships, rawPettyCash] = watch(['memberships', 'pettyCash']);
  const memberships = rawMemberships.filter(el => el.amount !== '').map(el => ({ name: el.name, amount: Number(el.amount) }));
  const pettyCash = rawPettyCash.filter(el => el.amount !== '').map(el => ({ item: el.item, amount: Number(el.amount) }));
  const totalMemberships = memberships.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPettyCash = pettyCash.reduce((acc, curr) => acc + curr.amount, 0);

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

  const admissions =
    typeof totalPayments === 'number' && typeof totalMemberships === 'number' && typeof totalPettyCash === 'number'
      ? totalPayments - totalMemberships - totalPettyCash
      : null;

  return {
    totalCashInBox,
    cashPayments,
    miscExpenses: totalPettyCash,
    checks,
    electronic,
    donations,
    memberships: totalMemberships,
    totalPayments,
    eveningDeposits,
    admissions
  };
};
