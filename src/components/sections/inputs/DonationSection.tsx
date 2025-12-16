import { Paper } from '@mui/material';
import { SectionHeader } from 'ui';
import { RHFAdornedField } from 'inputs';

export const DonationSection = () => {

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <SectionHeader title='Donations' />
      <RHFAdornedField name='donations' label='Total Donations' adornment='$' fullWidth />
    </Paper>
  );
};