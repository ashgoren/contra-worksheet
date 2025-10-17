import { pdf } from '@react-pdf/renderer';
import { firebaseFunctions } from 'services/firebase';
import { WorksheetReport } from 'components/WorksheetReport';
import { blobToBase64 } from 'utils';
import { useTalent } from 'hooks/useTalent';
import { useFinalCalculations } from 'hooks/useFinalCalculations';
import type { WorksheetFormData } from 'types/worksheet';

export const useSubmit = () => {
  const { talent } = useTalent();
  const { pcdcProfit } = useFinalCalculations();

  const submitData = async (data: WorksheetFormData) => {
    // generate pdf and convert to base64
    const blob = await pdf(<WorksheetReport data={data} />).toBlob();
    const base64 = await blobToBase64(blob);

    // send pdf and form data to backend
    await firebaseFunctions.saveWorksheet({
      pdf: {
        base64,
        filename: `${data.date}.pdf`
      },
      worksheet: { ...data, talent, pcdcProfit }
    });
  };

  return { submitData };
};
