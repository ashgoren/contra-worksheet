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
  const donationsCash = Number(data.donationsCash) || 0;
  const donationsCheck = Number(data.donationsCheck) || 0;
  const donationsElectronic = Number(data.donationsElectronic) || 0;
  const totalDonations = donationsCash + donationsCheck + donationsElectronic;
  const rent = Number(data.rent) || 0; // this should always be set
  const memberships = data.memberships.filter(el => el.amount !== '').map(el => ({ name: el.name, amount: Number(el.amount), method: el.method }));
  const totalMemberships = memberships.reduce((acc, curr) => acc + curr.amount, 0);
  const membershipsCash = memberships.filter(m => m.method === 'cash').reduce((acc, curr) => acc + curr.amount, 0);
  const membershipsCheck = memberships.filter(m => m.method === 'check').reduce((acc, curr) => acc + curr.amount, 0);
  const membershipsElectronic = memberships.filter(m => m.method === 'electronic').reduce((acc, curr) => acc + curr.amount, 0);

  const pettyCash = data.pettyCash.filter(el => el.amount !== '').map(el => ({ item: el.item, amount: Number(el.amount), timing: el.timing }));
  const totalPettyCash = pettyCash.reduce((acc, curr) => acc + curr.amount, 0);
  const cashRemovedBeforeCounting = pettyCash.filter(p => p.timing === 'before').reduce((acc, curr) => acc + curr.amount, 0);

  const cashPayments = isNum(totalCashInBox) && isNum(startingCash)
    ? totalCashInBox - startingCash + cashRemovedBeforeCounting
    : null;

  const totalPayments = isNum(cashPayments) && isNum(checks) && isNum(electronic)
    ? cashPayments + checks + electronic
    : null;

  const eveningDeposits = isNum(totalCashInBox) && isNum(checks)
    ? totalCashInBox + checks
    : null;

  const admissions = isNum(totalPayments) && isNum(totalDonations) && isNum(totalMemberships)
    ? totalPayments - totalDonations - totalMemberships
    : null;

  return {
    startingCash,
    cashRemovedBeforeCounting,
    totalCashInBox,
    cashPayments,
    miscExpenses: totalPettyCash,
    checks,
    electronic,
    donations: totalDonations,
    donationsCash,
    donationsCheck,
    donationsElectronic,
    rent,
    memberships: totalMemberships,
    membershipsCash,
    membershipsCheck,
    membershipsElectronic,
    totalPayments,
    eveningDeposits,
    admissions
  };
};
