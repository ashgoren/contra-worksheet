import { useEventInfo } from './useEventInfo';
import { useFinancials } from './useFinancials';
import { useTalent } from './useTalent';
import { useFinalCalculations } from './useFinalCalculations';
import { isNum } from 'utils';

export const useFormValidation = () => {
  const { band } = useEventInfo();
  const { admissions, totalCashInBox } = useFinancials();
  const { payBasis, talent } = useTalent();
  const { checkToPcdc } = useFinalCalculations();

  const isValid =
    band.trim().length > 0 &&
    isNum(admissions) &&
    isNum(totalCashInBox) &&
    isNum(payBasis) &&
    isNum(checkToPcdc) &&
    !!talent &&
    talent.filter(t => t.role === 'caller').length > 0 &&
    talent.filter(t => t.role === 'musician').length > 0 &&
    talent.filter(t => t.name).every(t => !!t.signature);

  const errors = [];
  if (!isValid) {
    if (band.trim().length === 0) errors.push('Specify the band name');
    if (!isNum(admissions) || !isNum(totalCashInBox) || !isNum(payBasis) || !isNum(checkToPcdc)) {
      errors.push('Ensure all financial data is entered');
    } else if (!talent || talent.filter(t => t.role === 'caller').length === 0 || talent.filter(t => t.role === 'musician').length === 0) {
      errors.push('Add caller and at least one musician');
    } else {
      const missingSignatures = talent.filter(t => t.name && !t.signature).map(t => t.name);
      if (missingSignatures.length > 0) {
        errors.push(`Add signature for: ${missingSignatures.join(', ')}`);
      }
    }
  }

  return { isValid, errors };
};
