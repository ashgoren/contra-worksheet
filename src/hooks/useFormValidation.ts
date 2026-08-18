import { useFormContext, useWatch } from 'react-hook-form';
import { useEventInfo } from './useEventInfo';
import { useFinancials } from './useFinancials';
import { useTalent } from './useTalent';
import { useFinalCalculations } from './useFinalCalculations';
import { isNum } from 'utils';
import type { WorksheetFormData } from 'types/worksheet';

export const useFormValidation = () => {
  const { band } = useEventInfo();
  const { control } = useFormContext<WorksheetFormData>();
  const pettyCash = useWatch({ control, name: 'pettyCash' });
  const { admissions, totalCashInBox } = useFinancials();
  const { payBasis, talent } = useTalent();
  const { checkToPcdc } = useFinalCalculations();

  const untimedExpenses = pettyCash.filter(p => p.amount !== '' && !p.timing);

  const isValid =
    band.trim().length > 0 &&
    isNum(admissions) &&
    isNum(totalCashInBox) &&
    isNum(payBasis) &&
    isNum(checkToPcdc) &&
    untimedExpenses.length === 0 &&
    !!talent &&
    talent.filter(t => t.role === 'caller').length > 0 &&
    talent.filter(t => t.role === 'musician').length > 0 &&
    talent.filter(t => t.name).every(t => !!t.signature);

  const errors = [];
  if (!isValid) {
    if (band.trim().length === 0) errors.push('Specify the band name');
    if (!isNum(admissions) || !isNum(totalCashInBox) || !isNum(payBasis) || !isNum(checkToPcdc)) {
      errors.push('Ensure all financial data is entered');
    } else if (untimedExpenses.length > 0) {
      errors.push('Select whether each misc expense was paid before or after counting cash');
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
