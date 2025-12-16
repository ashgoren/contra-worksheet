import { useFormContext,
  useWatch } from 'react-hook-form';
import { calculateFinancials } from 'services/financials';
import type { WorksheetFormData } from 'types/worksheet';

export const useFinancials = () => {
  const { control } = useFormContext<WorksheetFormData>();

  const watchedData = useWatch({ control }) as WorksheetFormData;
  const {
    totalCashInBox,
    cashPayments,
    miscExpenses,
    checks,
    electronic,
    donations,
    rent,
    memberships,
    totalPayments,
    eveningDeposits,
    admissions,
    startingCash
  } = calculateFinancials(watchedData);

  return {
    totalCashInBox,
    cashPayments,
    miscExpenses,
    checks,
    electronic,
    donations,
    rent,
    memberships,
    totalPayments,
    eveningDeposits,
    admissions,
    startingCash
  };
};
