import { pdf } from '@react-pdf/renderer';
import { firebaseFunctions } from 'services/firebase';
import { WorksheetReport } from 'components/WorksheetReport';
import { blobToBase64 } from 'utils';
import { useTalent } from 'hooks/useTalent';
import { useFinalCalculations } from 'hooks/useFinalCalculations';
import type { WorksheetFormData, PersonCalculated } from 'types/worksheet';

interface WorksheetSubmission extends Omit<WorksheetFormData, 'talent'> {
  talent: PersonCalculated[];
  pcdcProfit: number;
}

export const useSubmit = () => {
  const { talent } = useTalent();
  const { pcdcProfit } = useFinalCalculations();

  const submitData = async (data: WorksheetFormData) => {
    if (!talent || pcdcProfit === null) {
      throw new Error('Calculations must be complete before submission');
    }

    // generate pdf and convert to base64
    const blob = await pdf(<WorksheetReport data={data} />).toBlob();
    const base64 = await blobToBase64(blob);

    // prepare submission data
    const submission: WorksheetSubmission = {
      ...data,
      talent,
      pcdcProfit
    };

    // send pdf and form data to backend
    await firebaseFunctions.saveWorksheet({
      pdf: { base64, filename: `${data.date}.pdf` },
      worksheet: submission
    });
  };

  return { submitData };
};
