import { useState } from 'react';
import { Alert } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useDataPersistence } from 'hooks/useDataPersistence';
import { WorksheetFormInputs } from './WorksheetFormInputs';
import { WorksheetFormCalculations } from './WorksheetFormCalculations';
import { FormButtons } from './FormButtons';
import { RestoreDialog } from './RestoreDialog';
import { Success } from './Success';
import { useFormValidation } from 'hooks/useFormValidation';
import { useSubmit } from 'hooks/useSubmit';
import { useOnlineStatus } from 'hooks/useOnlineStatus';
import { useConfirmAction } from 'hooks/useConfirmAction';
import { DEFAULTS } from 'src/config';
import type { WorksheetFormData, WorksheetBackup } from 'types/worksheet';

export const WorksheetForm = () => {
  console.log('Rendering WorksheetForm');

  const { saveBackup, getBackups } = useDataPersistence();
  const { handleSubmit, reset } = useFormContext<WorksheetFormData>();
  const { submitData } = useSubmit();
  const { isValid } = useFormValidation();
  const isOnline = useOnlineStatus();
  const confirmAction = useConfirmAction();

  const [page, setPage] = useState<number | string>(1);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [backups, setBackups] = useState<WorksheetBackup[]>([]);
  const [skipRestoreConfirm, setSkipRestoreConfirm] = useState(false);

const handleReset = async ({ skipConfirm = false } = {}) => {
    setError(null);
    const confirmed = await confirmAction(
      skipConfirm,
      {
        title: 'Reset Form (Danger!)',
        description: <><strong style={{ color: 'red' }}>WARNING:</strong> This will clear all data! Are you sure???</>
      }
    );
    if (confirmed) {
      localStorage.removeItem('worksheetData');
      reset(DEFAULTS);
      setPage(1);
    }
  };

  const handleRestore = async ({ skipConfirm = false } = {}) => {
    const fetchedBackups = await getBackups();
    setBackups(fetchedBackups || []);
    setSkipRestoreConfirm(skipConfirm);
    setRestoreDialogOpen(true);
  };

  const onSubmit = async (data: WorksheetFormData) => {
    console.log('onSubmit', data);
    setError(null);
    setSubmitting(true);
    try {
      await submitData(data);
      console.log('Data successfully submitted');
      localStorage.removeItem('worksheetData');
      setPage('success');
    } catch (error) {
      console.error('Error submitting data:', error);
      setError(`Form submission failed! ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setSubmitting(false);
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

      {submitting && <Alert severity='info' sx={{ mt: 2 }}>Submitting form, please wait...</Alert>}
      {error && <Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>}

      <FormButtons
        submittable={isOnline && isValid && !submitting}
        page={page}
        setPage={setPage}
        setError={setError}
        onReset={handleReset}
        onRestore={handleRestore}
      />

      <RestoreDialog
        open={restoreDialogOpen}
        backups={backups}
        skipConfirm={skipRestoreConfirm}
        setPage={setPage}
        onClose={ () => setRestoreDialogOpen(false) }
      />
    </form>
  );
};
