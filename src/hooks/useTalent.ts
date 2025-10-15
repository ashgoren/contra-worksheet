import { useFormContext, useWatch } from 'react-hook-form';
import { calculateTalent } from 'services/talent';
import type { WorksheetFormData } from 'types/worksheet';

export const useTalent = () => {
  const { control } = useFormContext<WorksheetFormData>();
  
  const watchedData = useWatch({ control }) as WorksheetFormData;
  const { talent, payBasis, pcdcGuarantee, pcdcShare } = calculateTalent(watchedData);

  return { talent, payBasis, pcdcGuarantee, pcdcShare };
};
