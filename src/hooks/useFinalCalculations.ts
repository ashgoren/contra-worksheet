import { useFormContext, useWatch } from 'react-hook-form';
import { calculateFinalFinancials } from "services/finalFinancials";
import type { WorksheetFormData } from 'types/worksheet';

export const useFinalCalculations = () => {
  const { control } = useFormContext<WorksheetFormData>();
  const watchedData = useWatch({ control });

  const finalFinancials = calculateFinalFinancials(watchedData as WorksheetFormData);

  return finalFinancials;
};
