import { useEffect } from 'react';
import { Stack, Button, Paper, Box } from '@mui/material';

interface FormButtonsProps {
  submittable: boolean;
  page: number | string;
  setPage: (page: number | string) => void;
  setError: (error: string | null) => void;
  onReset: () => void;
  onRestore: () => void;
}

export const FormButtons = ({ submittable, page, setPage, setError, onReset, onRestore }: FormButtonsProps) => {

  // Clear error & scroll to top on page change
  useEffect(() => {
    setError(null);
    window.scrollTo(0, 0);
  }, [page, setError]);

  return (
    <Paper sx={{ p: 2, my: 4 }}>
      <Stack direction='row' spacing={2} justifyContent='space-between'>

        {page === 1 && (
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
              Restore Backup
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
