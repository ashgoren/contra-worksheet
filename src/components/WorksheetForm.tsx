import { useState } from 'react';
import { Alert} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useDataPersistence } from 'hooks/useDataPersistence';
import { WorksheetFormInputs } from './WorksheetFormInputs';
import { WorksheetFormCalculations } from './WorksheetFormCalculations';
import { FormButtons } from './FormButtons';
import { Success } from './Success';
import { useFormValidation } from 'hooks/useFormValidation';
import { submitWorksheet } from 'services/submit';
import type { WorksheetFormData } from 'types/worksheet';

export const WorksheetForm = () => {
  console.log('Rendering WorksheetForm');
  const { saveBackup } = useDataPersistence();
  const { handleSubmit } = useFormContext<WorksheetFormData>();
  const { isValid } = useFormValidation();
  const [page, setPage] = useState<number | string>(1);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: WorksheetFormData) => {
    console.log('onSubmit', data);
    setError(null);
    try {
      await submitWorksheet(data);
      console.log('PDF successfully uploaded');
      setPage('success');
    } catch (error) {
      console.error('Error generating/uploading PDF:', error);
      setError(`Form submission failed! ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onBlur={saveBackup}
    >
      {page === 1 && <WorksheetFormInputs />}
      {page === 2 && <WorksheetFormCalculations />}
      {page === 'success' && <Success />}

      {error && <Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>}

      <FormButtons
        isValid={isValid}
        page={page}
        setPage={setPage}
        setError={setError}
      />
    </form>
  );
};
