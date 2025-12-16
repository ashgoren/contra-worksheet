import { useFormContext, useWatch } from 'react-hook-form';
import { calculateTalent } from 'services/talent';
import type { WorksheetFormData, PersonCalculated } from 'types/worksheet';

export const useTalent = (): {
  talent: PersonCalculated[] | null,
  payBasis: number | null,
  pcdcGuarantee: number | null,
  pcdcShare: number | null,
  gearRental: number | null,
  totalTravel: number | null,
  totalGuarantee: number | null
} => {
  const { control } = useFormContext<WorksheetFormData>();
  
  const watchedData = useWatch({ control }) as WorksheetFormData;
  const { talent, payBasis, pcdcGuarantee, pcdcShare, gearRental, totalTravel, totalGuarantee } = calculateTalent(watchedData);

  return {
    talent,
    payBasis,
    pcdcGuarantee,
    pcdcShare,
    gearRental,
    totalTravel,
    totalGuarantee
  };
};
