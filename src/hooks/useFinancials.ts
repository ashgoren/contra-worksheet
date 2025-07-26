import { useFormContext, useWatch } from 'react-hook-form';
import { useCash } from 'hooks/useCash';
import { parse } from 'utils';
import type { WorksheetFormData } from 'types/worksheet';

export const useFinancials = () => {
  const { totalCashInBox } = useCash();
  const { control } = useFormContext<WorksheetFormData>();

  const [rawStartingCash, rawChecks, rawElectronic, rawDonations, rawMemberships, rawPettyCash] = useWatch({
    name: [
    'startingCash',
    'checks',
    'electronic',
    'donations',
    'memberships',
    'pettyCash'
    ],
    control
  });

  const startingCash = parse(rawStartingCash);
  const checks = parse(rawChecks);
  const electronic = parse(rawElectronic);
  const donations = parse(rawDonations);
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
