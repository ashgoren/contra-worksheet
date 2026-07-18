import { useEffect } from 'react';
import { Stack, Button, Paper, Divider } from '@mui/material';

interface FormButtonsProps {
  submittable: boolean;
  page: number | string;
  setPage: (page: number | string) => void;
  setError: (error: string | null) => void;
  setNotice: (notice: string | null) => void;
  onReset: () => void;
  onRestore: () => void;
  onDuplicate: () => void;
}

export const FormButtons = ({ submittable, page, setPage, setError, setNotice, onReset, onRestore, onDuplicate }: FormButtonsProps) => {

  // Clear error & notice, and scroll to top, on page change
  useEffect(() => {
    setError(null);
    setNotice(null);
    window.scrollTo(0, 0);
  }, [page, setError, setNotice]);

  return (
    <Paper sx={{ p: 2, my: 4 }}>
      <Stack direction='row' spacing={2} justifyContent='space-between'>

        {page === 1 && (
          <>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Button variant='text' onClick={() => onReset()}>
                Reset
              </Button>
              <Divider orientation='vertical' flexItem />
              <Button variant='text' size='small' onClick={() => onDuplicate()}>
                Duplicate
              </Button>
              <Divider orientation='vertical' flexItem />
              <Button variant='text' onClick={() => onRestore()}>
                Backups
              </Button>
            </Stack>
            <Button variant='contained' color='info' onClick={() => setPage(2)}>
              Next
            </Button>
          </>
        )}

        {page === 2 && (
          <>
            <Button variant='contained' color='primary' onClick={() => setPage(1)}>
              Back
            </Button>
            <Button type='submit' variant='contained' color='success' disabled={!submittable}>
              Submit Form
            </Button>
          </>
        )}

        {page === 'success' && (
          <>
            <Button variant='text' onClick={() => onRestore()}>
              Backups
            </Button>
            <Button variant='contained' color='primary' onClick={() => onReset()}>
              New Worksheet
            </Button>
          </>
        )}

      </Stack>
    </Paper>
  );
};
