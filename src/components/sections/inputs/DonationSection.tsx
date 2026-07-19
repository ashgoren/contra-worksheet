import { Paper, Typography } from '@mui/material';
import { SectionHeader } from 'ui';
import { RHFAdornedField } from 'inputs';

export const DonationSection = () => {

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <SectionHeader title='Donations' />
        <Typography variant='body2' sx={{ mb: 2, fontStyle: 'italic' }}>
          Be sure you've also included these in the cash (or check or electronic) total.
        </Typography>
      <RHFAdornedField name='donations' label='Total Donations' adornment='$' fullWidth />
    </Paper>
  );
};