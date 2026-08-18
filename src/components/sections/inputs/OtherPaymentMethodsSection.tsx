import { Grid, Paper, Typography, Box } from '@mui/material';
import { SectionHeader, StandoutBox } from 'ui';
import { RHFAdornedField } from 'inputs';
import { useFinancials } from 'hooks/useFinancials';

export const OtherPaymentMethodsSection = () => {
  const { donationsCheck, membershipsCheck, donationsElectronic, membershipsElectronic } = useFinancials();
  const expectedChecks = donationsCheck + membershipsCheck;
  const expectedElectronic = donationsElectronic + membershipsElectronic;

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <SectionHeader title='Checks & Electronic' />
      <Typography variant='body2' sx={{ mb: 2, fontStyle: 'italic' }}>
        Include donations & memberships paid by these means
      </Typography>

      {(expectedChecks > 0 || expectedElectronic > 0) && (
        <Box sx={{ mb: 3 }}>
          <StandoutBox>
            {expectedChecks > 0 && (
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                You recorded ${donationsCheck.toFixed(2)} in check donations and ${membershipsCheck.toFixed(2)} in check memberships above — make sure that's included in Total Checks below.
              </Typography>
            )}
            {expectedElectronic > 0 && (
              <Typography variant='body1' sx={{ fontWeight: 'bold', mt: expectedChecks > 0 ? 1 : 0 }}>
                You recorded ${donationsElectronic.toFixed(2)} in electronic donations and ${membershipsElectronic.toFixed(2)} in electronic memberships above — make sure that's included in Total Electronic below.
              </Typography>
            )}
          </StandoutBox>
        </Box>
      )}

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
