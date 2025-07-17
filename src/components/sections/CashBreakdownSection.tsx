import { Grid, Paper, Typography, InputAdornment } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { SectionHeader } from 'ui';
import { RHFTextField } from 'inputs';
import type { WorksheetFormData } from 'src/types/worksheet';

export const CashBreakdownSection = () => {
  const { watch } =  useFormContext<WorksheetFormData>();
  const [ones, fives, tens, twenties, fifties, hundreds, coins] = watch([
    'ones', 'fives', 'tens', 'twenties', 'fifties', 'hundreds', 'coins'
  ]);
  console.log('Current cash breakdown:', { ones, fives, tens, twenties, fifties, hundreds, coins });

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

      <Grid container spacing={2}>
        <CashField name='ones' denomination={1} />
        <CashField name='fives' denomination={5} />
        <CashField name='tens' denomination={10} />
        <CashField name='twenties' denomination={20} />
        <CashField name='fifties' denomination={50} />
        <CashField name='hundreds' denomination={100} />
        <Grid size={{ xs: 12, sm: 4 }}>
          <InputAdornment position='start'>
            <RHFTextField name='coins' label='Coins total (in dollars)' type='number' fullWidth slotProps={{
              input: {
                startAdornment: <InputAdornment position='start'>$</InputAdornment>
              },
              htmlInput: {
                step: '0.01',
              }
            }} 
            />
          </InputAdornment>
        </Grid>
      </Grid>
      <Typography variant='body1' sx={{ mt: 2 }}>
        Total cash in box: $ {allValuesPresent ? totalCash : ''}
      </Typography>
    </Paper>
  );
};

const CashField = ({ name, denomination }: { name: keyof WorksheetFormData; denomination: number; }) => {
  return (
    <Grid size={{ xs: 12, sm: 4 }}>
      <RHFTextField
        name={name}
        label={<><strong>{denomination}</strong> ({name})</>}
        type='number'
        fullWidth
      />
    </Grid>
  );
};
