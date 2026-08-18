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
    donationsCash,
    donationsCheck,
    donationsElectronic,
    rent,
    memberships,
    membershipsCash,
    membershipsCheck,
    membershipsElectronic,
    totalPayments,
    eveningDeposits,
    admissions,
    startingCash,
    cashRemovedBeforeCounting
  } = calculateFinancials(watchedData);

  return {
    totalCashInBox,
    cashPayments,
    miscExpenses,
    checks,
    electronic,
    donations,
    donationsCash,
    donationsCheck,
    donationsElectronic,
    rent,
    memberships,
    membershipsCash,
    membershipsCheck,
    membershipsElectronic,
    totalPayments,
    eveningDeposits,
    admissions,
    startingCash,
    cashRemovedBeforeCounting
  };
};
