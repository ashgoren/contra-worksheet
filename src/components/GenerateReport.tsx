import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { WorksheetReport } from './WorksheetReport';
import type { WorksheetFormData } from 'types/worksheet';

export const GenerateReport = () => {
  const { getValues } = useFormContext<WorksheetFormData>();
  const data = getValues();

  return (
    <PDFDownloadLink
      document={<WorksheetReport data={data} />}
      fileName="contra-worksheet-report.pdf"
    >
      {({ blob, url, loading, error }) => (
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Generating report...' : 'Download PDF Report'}
        </Button>
      )}
    </PDFDownloadLink>
  );
};