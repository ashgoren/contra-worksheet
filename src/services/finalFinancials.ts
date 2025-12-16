import { calculateFinancials } from './financials';
import { calculateTalent } from 'services/talent';
import { GEAR_RENTAL } from 'src/config';
import type { WorksheetFormData } from 'types/worksheet';

export const calculateFinalFinancials = (data: WorksheetFormData) => {
  const { admissions, cashPayments, rent, miscExpenses } = calculateFinancials(data);
  const { pcdcGuarantee, pcdcShare, talent } = calculateTalent(data);

  if (admissions === null || cashPayments === null || pcdcShare === null || pcdcGuarantee === null || talent === null) {
    return { pcdcProfit: null, danceProfitLoss: null, checkToPcdc: null, totalTalentPay: null };
  }

  const totalTalentPay = talent.reduce((acc, curr) => acc + curr.totalPay, 0);
  const danceProfitLoss = admissions - totalTalentPay - rent - (data.gearRental ? GEAR_RENTAL : 0);
  const checkToPcdc = cashPayments - totalTalentPay - miscExpenses - (data.gearRental ? GEAR_RENTAL : 0);

  return {
    totalTalentPay,
    pcdcProfit: pcdcGuarantee + pcdcShare,
    danceProfitLoss,
    checkToPcdc
  }
};
