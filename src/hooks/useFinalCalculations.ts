import { useFinancials } from './useFinancials';
import { useTalent } from './useTalent';

export const useFinalCalculations = () => {
  const { admissions, cashPayments, rent, miscExpenses } = useFinancials();
  const { pcdcGuarantee, pcdcShare, talent } = useTalent();

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
