import { Paper, Typography } from '@mui/material';
import { SectionHeader } from 'ui';
import { RHFCheckbox } from 'inputs';

export const TalentSection = () => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <SectionHeader title='Talent Pay Calculations' />
      <Typography variant='body2' sx={{ mb: 2, fontStyle: 'italic' }}>
        Total Pay = Travel + (Guarantee + Share). Share calculated after all travel entered.
      </Typography>

      <Typography variant='body2' sx={{ mb: 2 }}>
        <RHFCheckbox name='gearRental' label='Sound person used our gear?' />
      </Typography>



    </Paper>
  );
};
