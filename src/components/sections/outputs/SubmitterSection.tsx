import { useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, Paper, TextField } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Controller, useFormContext } from 'react-hook-form';
import { SectionHeader } from 'ui';
import { SubmissionInstructions } from 'components/SubmissionInstructions';
import { useFinalCalculations } from 'hooks/useFinalCalculations';
import type { WorksheetFormData } from 'types/worksheet';

export const SubmitterSection = () => {
  const { control } = useFormContext<WorksheetFormData>();
  const { checkToPcdc } = useFinalCalculations();
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <SectionHeader title='Submission' />
        <IconButton aria-label='Instructions' size='small' onClick={() => setInstructionsOpen(true)} sx={{ mb: 2 }}>
          <InfoOutlined fontSize='small' />
        </IconButton>
      </Box>
      <Controller
        name='submittedBy'
        control={control}
        render={({ field }) => (
          <TextField {...field} label='Name of person submitting form' size='small' sx={{ width: 300 }} />
        )}
      />
      <Controller
        name='submissionNote'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Note for bookkeeper (optional)'
            multiline
            rows={2}
            size='small'
            fullWidth
            sx={{ mt: 2 }}
          />
        )}
      />

      <Dialog open={instructionsOpen} onClose={() => setInstructionsOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Instructions (will also be shown after submission)</DialogTitle>
        <DialogContent>
          <SubmissionInstructions checkToPcdc={checkToPcdc} />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='info' onClick={() => setInstructionsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
