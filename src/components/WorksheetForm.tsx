import { useState } from 'react';
import { Alert } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useConfirm } from 'material-ui-confirm';
import { useDataPersistence } from 'hooks/useDataPersistence';
import { useSessionId } from 'contexts/SessionIdContext';
import { WorksheetFormInputs } from './WorksheetFormInputs';
import { WorksheetFormCalculations } from './WorksheetFormCalculations';
import { FormButtons } from './FormButtons';
import { RestoreDialog } from './RestoreDialog';
import { Success } from './Success';
import { useFormValidation } from 'hooks/useFormValidation';
import { useSubmit } from 'hooks/useSubmit';
import { calculateFinalFinancials } from 'services/finalFinancials';
import { useOnlineStatus } from 'hooks/useOnlineStatus';
import { isEqual } from 'lodash';
import { DEFAULTS } from 'src/config';
import type { WorksheetFormData, WorksheetBackup } from 'types/worksheet';

export const WorksheetForm = () => {
  const { handleSubmit, reset, getValues } = useFormContext<WorksheetFormData>();
  const { saveBackup, getBackups } = useDataPersistence();
  const { regenerateSessionId, setSessionId } = useSessionId();
  const { submitData } = useSubmit();
  const { isValid, errors } = useFormValidation();
  const isOnline = useOnlineStatus();
  const confirm = useConfirm();

  const [page, setPage] = useState<number | string>(1);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedCheckToPcdc, setSubmittedCheckToPcdc] = useState<number | null>(null);

  const [backups, setBackups] = useState<WorksheetBackup[]>([]);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);

  const isFormDirty = !isEqual(getValues(), DEFAULTS);

  const resetFormState = (values: WorksheetFormData) => {
    setError(null);
    setNotice(null);
    localStorage.removeItem('worksheetData');
    reset({ ...DEFAULTS, ...values });
    setPage(1);
  };

  const handleReset = async () => {
    if (isFormDirty) {
      const { confirmed } = await confirm({
        title: 'Reset Form?',
        description: <><strong style={{ color: 'red' }}>WARNING:</strong> This will clear all data! Are you sure?</>
      });
      if (!confirmed) return;
    }
    console.log('Resetting form to defaults');
    regenerateSessionId();
    resetFormState(DEFAULTS);
  };

  const handleDuplicate = async () => {
    const { confirmed } = await confirm({
      title: 'Duplicate Worksheet?',
      description: 'This creates a separate copy of the current worksheet with its own backup, so you can edit it without affecting the original.'
    });
    if (!confirmed) return;

    const current = getValues();
    const newBand = current.band ? `${current.band} (copy)` : current.band;
    console.log('Duplicating worksheet', current);
    regenerateSessionId();
    reset({ ...current, band: newBand });
    setPage(1);
    setError(null);
    setNotice(`Duplicated as a new worksheet${newBand ? ` - "${newBand}"` : ''}. This is the new copy.`);

    // The confirm dialog's exit transition holds document.body at overflow: hidden
    // for ~225ms after the promise resolves, so scrolling immediately is a no-op.
    setTimeout(() => window.scrollTo(0, 0), 300);
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
    const { updatedAt: _updatedAt, sessionId: backupSessionId, ...formData } = backup; // strip updatedAt & sessionId
    console.log('Restoring backup', formData);
    setSessionId(backupSessionId);
    resetFormState(formData);
  };

  const onSubmit = async (data: WorksheetFormData) => {
    console.log('onSubmit', data);
    setError(null);
    setNotice(null);
    setSubmitting(true);

    try {
      await submitData(data);
      console.log('Data successfully submitted');
      const { checkToPcdc } = calculateFinalFinancials(data);
      setSubmittedCheckToPcdc(checkToPcdc);
      localStorage.removeItem('worksheetData');
      regenerateSessionId();
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
      {notice && <Alert severity='success' sx={{ mb: 2 }} onClose={() => setNotice(null)}>{notice}</Alert>}

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

      {page === 'success' && <Success checkToPcdc={submittedCheckToPcdc} />}

      {submitting && <Alert severity='info' sx={{ mt: 2 }}>Submitting form, please wait...</Alert>}
      {error && <Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>}

      <FormButtons
        submittable={isOnline && isValid && !submitting}
        page={page}
        setPage={setPage}
        setError={setError}
        setNotice={setNotice}
        onReset={handleReset}
        onRestore={handleGetBackups}
        onDuplicate={handleDuplicate}
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
