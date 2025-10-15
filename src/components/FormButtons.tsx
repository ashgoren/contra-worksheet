import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useConfirm } from 'material-ui-confirm';
import { Stack, Button, Paper } from '@mui/material';
import { DEFAULTS } from 'src/config';
import type { WorksheetFormData } from 'types/worksheet';

interface FormButtonsProps {
  isValid: boolean;
  page: number | string;
  setPage: (page: number | string) => void;
  setError: (error: string | null) => void;
}

export const FormButtons = ({ isValid, page, setPage, setError }: FormButtonsProps) => {

  // Clear error when page changes
  useEffect(() => {
    setError(null);
  }, [page, setError]);

  return (
    <Paper sx={{ p: 2, my: 4 }}>
      <Stack direction='row' spacing={2} justifyContent='space-between'>
        {page === 1 && <Page1Buttons setPage={setPage} setError={setError} />}
        {page === 2 && <Page2Buttons setPage={setPage} isValid={isValid} />}
        {page === 'success' && <SuccessPageButtons setPage={setPage} />}
      </Stack>
    </Paper>
  );
};

interface Page1ButtonsProps {
  setPage: (page: number | string) => void;
  setError: (error: string | null) => void;
}

const Page1Buttons = ({ setPage, setError }: Page1ButtonsProps) => {
  const confirm = useConfirm();
  const { reset } = useFormContext<WorksheetFormData>();

  const handleReset = async () => {
    setError(null);
    const { confirmed } = await confirm({
      title: 'Reset Form (Danger!)',
      description: <><strong style={{ color: 'red' }}>WARNING:</strong> This will clear all data! Are you sure???</>
    });
    if (confirmed) {
      localStorage.removeItem('worksheetData');
      reset(DEFAULTS);
    }
  };

  return (
    <>
      <Button variant='text' onClick={handleReset}>
        Reset Form
      </Button>
      <Button variant='contained' color='info' onClick={() => setPage(2)}>
        Next
      </Button>
    </>
  );
}

interface Page2ButtonsProps {
  setPage: (page: number | string) => void;
  isValid: boolean
}

const Page2Buttons = ({ setPage, isValid }: Page2ButtonsProps) => {
  return (
    <>
      <Button variant='contained' color='primary' onClick={() => setPage(1)}>
        Back
      </Button>
      <Button type='submit' variant='contained' color='success' disabled={!isValid}>
        Submit Form
      </Button>
    </>
  );
}

const SuccessPageButtons = ({ setPage }: { setPage: (page: number | string) => void }) => {
  return (
    <Button variant='contained' color='primary' onClick={() => setPage(2)}>
      Back
    </Button>
  )
}
