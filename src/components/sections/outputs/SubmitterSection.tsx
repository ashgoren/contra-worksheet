import { Paper, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { SectionHeader } from 'ui';
import type { WorksheetFormData } from 'types/worksheet';

export const SubmitterSection = () => {
  const { control } = useFormContext<WorksheetFormData>();

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <SectionHeader title='Submission' />
      <Controller
        name='submittedBy'
        control={control}
        render={({ field }) => (
          <TextField {...field} label='Name of person submitting form' size='small' sx={{ width: 300 }} />
        )}
      />
    </Paper>
  );
};
