import { useFormContext } from 'react-hook-form';
import { useConfirm } from 'material-ui-confirm';
import { Stack, Button, Paper } from '@mui/material';
import { DEFAULTS } from 'src/config';
import type { WorksheetFormData } from 'types/worksheet';

export const FormButtons = ({ page, setPage }: { page: number; setPage: (page: number) => void }) => {
  return (
    <Paper sx={{ p: 2, my: 4 }}>
      <Stack direction='row' spacing={2} justifyContent='space-between'>
        {page === 1 && <Page1Buttons setPage={setPage} />}
        {page === 2 && <Page2Buttons setPage={setPage} />}
      </Stack>
    </Paper>
  );
};

const Page1Buttons = ({ setPage }: { setPage: (page: number) => void }) => {
  const confirm = useConfirm();
  const { reset } = useFormContext<WorksheetFormData>();

  const handleReset = async () => {
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

const Page2Buttons = ({ setPage }: { setPage: (page: number) => void }) => {
  return (
    <>
      <Button variant='contained' color='primary' onClick={() => setPage(1)}>
        Back
      </Button>
      <Button type='submit' variant='contained' color='success'>
        Submit Form
      </Button>
    </>
  );
}
