import { Paper, Grid } from '@mui/material';
import { SectionHeader } from 'ui';
import { RHFAdornedField } from 'inputs';

export const DonationSection = () => {

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <SectionHeader title='Donations' />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}><RHFAdornedField name='donationsCash' label='Cash Donations' adornment='$' fullWidth /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><RHFAdornedField name='donationsCheck' label='Check Donations' adornment='$' fullWidth /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><RHFAdornedField name='donationsElectronic' label='Electronic Donations' adornment='$' fullWidth /></Grid>
      </Grid>
    </Paper>
  );
};
