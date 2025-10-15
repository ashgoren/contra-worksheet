import { useFinancials } from './useFinancials';
import { useTalent } from './useTalent';
import { useFinalCalculations } from './useFinalCalculations';
import { isNum } from 'utils';

export const useFormValidation = () => {
  const { admissions, totalCashInBox } = useFinancials();
  const { payBasis, talent } = useTalent();
  const { checkToPcdc } = useFinalCalculations();

  const isValid =
    isNum(admissions) &&
    isNum(totalCashInBox) &&
    isNum(payBasis) &&
    isNum(checkToPcdc) &&
    !!talent &&
    talent.length > 0 &&
    talent.filter(t => t.name).every(t => !!t.signature);

  return { isValid };
};
