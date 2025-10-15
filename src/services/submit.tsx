import { pdf } from '@react-pdf/renderer';
import { upload, firebaseFunctions } from 'services/firebase';
import { WorksheetReport } from 'components/WorksheetReport';
import type { WorksheetFormData } from 'types/worksheet';

export const submitWorksheet = async (data: WorksheetFormData) => {
  try {
    // generate pdf
    const blob = await pdf(<WorksheetReport data={data} />).toBlob();

    // upload pdf to cloud storage
    const path = `worksheets/${data.date}.pdf`
    await upload(blob, path)
    console.log(`Uploaded blob to Firebase Cloud Storage: ${path}`);

    // send form data to backend
    await firebaseFunctions.appendToSpreadsheet({
      worksheet: data
    });
  } catch (error) {
    console.error('Error uploading data', error);
    throw error;
  }
};
