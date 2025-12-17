import { calculateFinancials } from './financials';
import { calculateTalent } from 'services/talent';
import type { WorksheetFormData } from 'types/worksheet';

export const calculateFinalFinancials = (data: WorksheetFormData) => {
  const { admissions, cashPayments, rent, miscExpenses } = calculateFinancials(data);
  const { pcdcGuarantee, pcdcShare, talent, gearRental } = calculateTalent(data);

  if (admissions === null || cashPayments === null || pcdcShare === null || pcdcGuarantee === null || talent === null || gearRental === null) {
    return { pcdcProfit: null, danceProfitLoss: null, checkToPcdc: null, totalTalentPay: null, gearRental: null };
  }

  const totalTalentPay = talent.reduce((acc, curr) => acc + curr.totalPay, 0) + gearRental;
  const danceProfitLoss = admissions - totalTalentPay - rent;
  const checkToPcdc = cashPayments - totalTalentPay - miscExpenses + gearRental;

  return {
    totalTalentPay,
    pcdcProfit: pcdcGuarantee + pcdcShare,
    danceProfitLoss,
    checkToPcdc
  }
};
