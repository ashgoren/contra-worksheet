import { Grid, Paper, Typography } from '@mui/material';
import { SectionHeader } from 'ui';
import { RHFAdornedField } from 'inputs';

export const OtherPaymentMethodsSection = () => {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <SectionHeader title='Other Payment Methods' />
      <Typography variant='body2' sx={{ mb: 2, fontStyle: 'italic' }}>
        Include donations & memberships
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFAdornedField name='checks' label='Total Checks' adornment='$' fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFAdornedField name='electronic' label='Total Electronic' adornment='$' fullWidth />
        </Grid>
      </Grid>
    </Paper>
  )
};
