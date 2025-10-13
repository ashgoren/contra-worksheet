import { parse, isNum } from 'utils';
import type { WorksheetFormData } from 'types/worksheet';

export const calculateTotalCash = (data: Pick<WorksheetFormData, 'ones' | 'fives' | 'tens' | 'twenties' | 'fifties' | 'hundreds' | 'coins'>): number | null => {
  const cashValues = [data.ones, data.fives, data.tens, data.twenties, data.fifties, data.hundreds, data.coins].map(parse);
  if (cashValues.every(isNum)) {
    const [ ones, fives, tens, twenties, fifties, hundreds, coins ] = cashValues;
    return coins + ones + fives * 5 + tens * 10 + twenties * 20 + fifties * 50 + hundreds * 100;
  }
  return null;
};

export const calculateFinancials = (data: WorksheetFormData) => {
  const totalCashInBox = calculateTotalCash(data);

  const startingCash = parse(data.startingCash);
  const checks = parse(data.checks);
  const electronic = parse(data.electronic);
  const donations = parse(data.donations);
  const rent = Number(data.rent) || 0;

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
