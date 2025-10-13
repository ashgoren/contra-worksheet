import { useFormContext, useWatch } from 'react-hook-form';
import { calculateFinancials } from 'services/financials';
import type { WorksheetFormData } from 'types/worksheet';

export const useFinancials = () => {
  const { control } = useFormContext<WorksheetFormData>();

  const watchedData = useWatch({ control }) as WorksheetFormData;
  const financials = calculateFinancials(watchedData);

  return financials;
};
