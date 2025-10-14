import { calculateFinancials } from './financials';
import { calculateTalent } from 'services/talent';
import type { WorksheetFormData } from 'types/worksheet';

export const calculateFinalFinancials = (data: WorksheetFormData) => {
  const { admissions, cashPayments, rent, miscExpenses } = calculateFinancials(data);
  const { pcdcGuarantee, pcdcShare, talent } = calculateTalent(data);

  if (admissions === null || cashPayments === null || pcdcShare === null) {
    return { pcdcProfit: null, danceProfitLoss: null, checkToPcdc: null };
  }

  const totalTalentPay = talent.reduce((acc, curr) => acc + curr.totalPay, 0);
  const danceProfitLoss = admissions - totalTalentPay - rent;
  const checkToPcdc = cashPayments - totalTalentPay - miscExpenses;

  return {
    pcdcProfit: pcdcGuarantee + pcdcShare,
    danceProfitLoss,
    checkToPcdc
  }
};
