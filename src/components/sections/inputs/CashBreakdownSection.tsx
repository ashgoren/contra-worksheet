import { Grid, Paper, Typography, Box } from '@mui/material';
import { SectionHeader, StandoutBox } from 'ui';
import { RHFAdornedField } from 'inputs';
import { useCash } from 'hooks/useCash';

export const CashBreakdownSection = () => {
  const { totalCashInBox } = useCash();
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
          <RHFAdornedField name='coins' label='Coins Total' adornment='$' fullWidth />
        </Grid>
      </Grid>
      <Box sx={{ my: 3 }}>
        <StandoutBox>
          <Typography variant='body1'>
            Total cash in box: {totalCashInBox ? `$${totalCashInBox.toFixed(2)}` : ''}
          </Typography>
        </StandoutBox>
      </Box>

      <Grid size={{ xs: 12, sm: 4 }}>
        <Typography variant='body1' sx={{ my: 2 }}>How much of that was starting cash?</Typography>
        <RHFAdornedField name='startingCash' label='Starting Cash' adornment='$' fullWidth confirmOnChange={true} />
      </Grid>
    </Paper>
  );
};
