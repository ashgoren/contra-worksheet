import { isNum } from 'utils';
import type { WorksheetFormData } from 'types/worksheet';

export const calculateTotalCash = (data: Pick<WorksheetFormData, 'ones' | 'fives' | 'tens' | 'twenties' | 'fifties' | 'hundreds' | 'coins'>): number | null => {
  const cashValues = [data.ones, data.fives, data.tens, data.twenties, data.fifties, data.hundreds, data.coins].map(Number); // Default these to 0 if blank
  const [ ones, fives, tens, twenties, fifties, hundreds, coins ] = cashValues;
  const total = coins + ones + fives * 5 + tens * 10 + twenties * 20 + fifties * 50 + hundreds * 100;
  return total > 0 ? total : null;
};

export const calculateFinancials = (data: WorksheetFormData) => {
  const totalCashInBox = calculateTotalCash(data);

  const startingCash = Number(data.startingCash) || 0; // this should always be set
  const checks = Number(data.checks) || 0;
  const electronic = Number(data.electronic) || 0;
  const donations = Number(data.donations) || 0;
  const rent = Number(data.rent) || 0; // this should always be set
  const memberships = data.memberships.filter(el => el.amount !== '').map(el => ({ name: el.name, amount: Number(el.amount) }));
  const totalMemberships = memberships.reduce((acc, curr) => acc + curr.amount, 0);

  const pettyCash = data.pettyCash.filter(el => el.amount !== '').map(el => ({ item: el.item, amount: Number(el.amount) }));
  const totalPettyCash = pettyCash.reduce((acc, curr) => acc + curr.amount, 0);

  const cashPayments = isNum(totalCashInBox) && isNum(startingCash)
    ? totalCashInBox - startingCash
    : null;

  const totalPayments = isNum(cashPayments) && isNum(checks) && isNum(electronic)
    ? cashPayments + checks + electronic
    : null;

  const eveningDeposits = isNum(totalCashInBox) && isNum(checks)
    ? totalCashInBox + checks
    : null;

  const admissions = isNum(totalPayments) && isNum(donations) && isNum(totalMemberships)
    ? totalPayments - donations - totalMemberships
    : null;

  return {
    totalCashInBox,
    cashPayments,
    miscExpenses: totalPettyCash,
    checks,
    electronic,
    donations,
    rent,
    memberships: totalMemberships,
    totalPayments,
    eveningDeposits,
    admissions
  };
};
