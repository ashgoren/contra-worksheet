import { useFormContext, useWatch } from 'react-hook-form';
import { calculateFinalFinancials } from "services/finalFinancials";
import type { WorksheetFormData } from 'types/worksheet';

export const useFinalCalculations = () => {
  const { control } = useFormContext<WorksheetFormData>();
  const watchedData = useWatch({ control });

  const { totalTalentPay, pcdcProfit, danceProfitLoss, checkToPcdc } = calculateFinalFinancials(watchedData as WorksheetFormData);

  return { totalTalentPay, pcdcProfit, danceProfitLoss, checkToPcdc };
};
