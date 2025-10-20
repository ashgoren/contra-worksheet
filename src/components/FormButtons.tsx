import { useEffect } from 'react';
import { Stack, Button, Paper, Box } from '@mui/material';

interface FormButtonsProps {
  submittable: boolean;
  page: number | string;
  setPage: (page: number | string) => void;
  setError: (error: string | null) => void;
  onReset: (options?: { skipConfirm?: boolean }) => void;
  onRestore: (options?: { skipConfirm?: boolean }) => void;
}

export const FormButtons = ({ submittable, page, setPage, setError, onReset, onRestore }: FormButtonsProps) => {

  // Clear error when page changes
  useEffect(() => {
    setError(null);
  }, [page, setError]);

  return (
    <Paper sx={{ p: 2, my: 4 }}>
      <Stack direction='row' spacing={2} justifyContent='space-between'>
        {page === 1 && <Page1Buttons setPage={setPage} onReset={onReset} onRestore={onRestore} />}
        {page === 2 && <Page2Buttons setPage={setPage} submittable={submittable} />}
        {page === 'success' && <SuccessPageButtons onReset={onReset} onRestore={onRestore} />}
      </Stack>
    </Paper>
  );
};

interface Page1ButtonsProps {
  setPage: (page: number | string) => void;
  onReset: (options?: { skipConfirm?: boolean }) => void;
  onRestore: (options?: { skipConfirm?: boolean }) => void;
}

const Page1Buttons = ({ setPage, onReset, onRestore }: Page1ButtonsProps) => {
  return (
    <>
      <Box>
        <Button variant='text' onClick={() => onReset()}>
          Reset Form
        </Button>
        |
        <Button variant='text' onClick={() => onRestore()}>
          Restore Backup
        </Button>
      </Box>
      <Button variant='contained' color='info' onClick={() => setPage(2)}>
        Next
      </Button>
    </>
  );
}

interface Page2ButtonsProps {
  setPage: (page: number | string) => void;
  submittable: boolean
}

const Page2Buttons = ({ setPage, submittable }: Page2ButtonsProps) => {
  return (
    <>
      <Button variant='contained' color='primary' onClick={() => setPage(1)}>
        Back
      </Button>
      <Button type='submit' variant='contained' color='success' disabled={!submittable}>
        Submit Form
      </Button>
    </>
  );
}

interface SuccessPageProps {
  onReset: (options?: { skipConfirm?: boolean }) => void;
  onRestore: (options?: { skipConfirm?: boolean }) => void;
}

const SuccessPageButtons = ({ onReset, onRestore }: SuccessPageProps ) => {
  return (
    <>
      <Button variant='text' onClick={() => onRestore({ skipConfirm: true })}>
        Restore Backup
      </Button>
      <Button variant='contained' color='primary' onClick={() => onReset({ skipConfirm: true })}>
        New Worksheet
      </Button>
    </>
  )
}
