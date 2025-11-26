import { useState } from 'react';
import { Alert } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useConfirm } from 'material-ui-confirm';
import { useDataPersistence } from 'hooks/useDataPersistence';
import { WorksheetFormInputs } from './WorksheetFormInputs';
import { WorksheetFormCalculations } from './WorksheetFormCalculations';
import { FormButtons } from './FormButtons';
import { RestoreDialog } from './RestoreDialog';
import { Success } from './Success';
import { useFormValidation } from 'hooks/useFormValidation';
import { useSubmit } from 'hooks/useSubmit';
import { useOnlineStatus } from 'hooks/useOnlineStatus';
import { isEqual } from 'lodash';
import { DEFAULTS } from 'src/config';
import type { WorksheetFormData, WorksheetBackup } from 'types/worksheet';

export const WorksheetForm = () => {
  const { handleSubmit, reset, getValues } = useFormContext<WorksheetFormData>();
  const { saveBackup, getBackups } = useDataPersistence();
  const { submitData } = useSubmit();
  const { isValid, errors } = useFormValidation();
  const isOnline = useOnlineStatus();
  const confirm = useConfirm();

  const [page, setPage] = useState<number | string>(1);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [backups, setBackups] = useState<WorksheetBackup[]>([]);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);

  const isFormDirty = !isEqual(getValues(), DEFAULTS);

  const resetFormState = (values: WorksheetFormData) => {
    setError(null);
    localStorage.removeItem('worksheetData');
    reset(values);
    setPage(1);
  };

  const handleReset = async () => {
    if (isFormDirty) {
      const { confirmed } = await confirm({
        title: 'Reset Form (Danger!)',
        description: <><strong style={{ color: 'red' }}>WARNING:</strong> This will clear all data! Are you sure???</>
      });
      if (!confirmed) return;
    }
    console.log('Resetting form to defaults');
    resetFormState(DEFAULTS);
  };

  const handleGetBackups = async () => {
    const fetchedBackups = await getBackups();
    setBackups(fetchedBackups || []);
    setRestoreDialogOpen(true);
  };

  const handleRestoreBackup = async (backup: WorksheetBackup) => {
    setRestoreDialogOpen(false);
    if (isFormDirty) {
      const { confirmed } = await confirm({
        title: 'Restore Backup?',
        description: <><strong style={{ color: 'red' }}>WARNING:</strong> This will replace all data in the current worksheet! Are you sure?</>
      });
      if (!confirmed) return;
    }
    const { updatedAt: _, ...formData } = backup; // strip updatedAt
    console.log('Restoring backup', formData);
    resetFormState(formData);
  };

  const onSubmit = async (data: WorksheetFormData) => {
    console.log('onSubmit', data);
    setError(null);
    setSubmitting(true);

    try {
      await submitData(data);
      console.log('Data successfully submitted');
      localStorage.removeItem('worksheetData');
      reset(DEFAULTS);
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
      {page === 2 && !isValid &&
        <Alert severity='warning' sx={{ mt: 2 }}>Update before submitting:
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </Alert>
      }
      {page === 'success' && <Success />}

      {submitting && <Alert severity='info' sx={{ mt: 2 }}>Submitting form, please wait...</Alert>}
      {error && <Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>}

      <FormButtons
        submittable={isOnline && isValid && !submitting}
        page={page}
        setPage={setPage}
        setError={setError}
        onReset={handleReset}
        onRestore={handleGetBackups}
      />

      <RestoreDialog
        open={restoreDialogOpen}
        onClose={() => setRestoreDialogOpen(false)}
        onRestoreBackup={handleRestoreBackup}
        backups={backups}
      />
    </form>
  );
};
