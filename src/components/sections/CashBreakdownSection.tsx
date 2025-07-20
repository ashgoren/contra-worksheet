import { Grid, Paper, Typography, Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { SectionHeader, StandoutBox } from 'ui';
import { RHFAdornedField } from 'inputs';
import type { WorksheetFormData } from 'src/types/worksheet';

export const CashBreakdownSection = () => {
  const { watch } =  useFormContext<WorksheetFormData>();
  const [ones, fives, tens, twenties, fifties, hundreds, coins] = watch([
    'ones', 'fives', 'tens', 'twenties', 'fifties', 'hundreds', 'coins'
  ]);
  // console.log('Current cash breakdown:', { ones, fives, tens, twenties, fifties, hundreds, coins });

  const allValuesPresent = [ones, fives, tens, twenties, fifties, hundreds, coins].every(v => v !== null);
  const totalCash = (
    (coins || 0) +
    (ones || 0) +
    (fives || 0) * 5 +
    (tens || 0) * 10 +
    (twenties || 0) * 20 +
    (fifties || 0) * 50 +
    (hundreds || 0) * 100
  ).toFixed(2);

    return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <SectionHeader title='Cash Breakdown' />
      <Typography variant='body2' sx={{ mb: 2, fontStyle: 'italic' }}>
        Count all cash in box, including donations, memberships, starting cash
      </Typography>

    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <RHFAdornedField name='ones' label='Ones' adornment="1's" adornmentWidth='70px' fullWidth />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <RHFAdornedField name='fives' label='Fives' adornment="5's" adornmentWidth='70px' fullWidth />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <RHFAdornedField name='tens' label='Tens' adornment="10's" adornmentWidth='70px' fullWidth />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <RHFAdornedField name='twenties' label='Twenties' adornment="20's" adornmentWidth='70px' fullWidth />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <RHFAdornedField name='fifties' label='Fifties' adornment="50's" adornmentWidth='70px' fullWidth />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <RHFAdornedField name='hundreds' label='Hundreds' adornment="100's" adornmentWidth='70px' fullWidth />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <RHFAdornedField name='coins' label='Coins Total' adornment='$' fullWidth slotProps={{
          htmlInput: {
            step: '0.01'
          }
        }} />
      </Grid>
    </Grid>
    <Box sx={{ mt: 3 }}>
      <StandoutBox>
        <Typography variant='body1'>
          Total cash in box: {allValuesPresent ? `$ ${totalCash}` : ''}
        </Typography>
      </StandoutBox>
    </Box>
    </Paper>
  );
};
