import { Grid, Paper, Box } from '@mui/material';
import { SectionHeader, ColumnHeader } from 'ui';
import { RHFTextField } from 'inputs';
import type { Control } from 'react-hook-form';
import type { WorksheetFormData } from 'src/types/worksheet';

export const EventInfoSection = ({ control }: { control: Control<WorksheetFormData> }) => {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <SectionHeader title='Event Information' />

      <Grid container spacing={3}>
        {/* Column 1: Event Details */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ColumnHeader title='Event Details' />
            <RHFTextField name='date' label='Date' type='date' control={control} />
            <RHFTextField name='band' label='Band Name' control={control} />
            <RHFTextField name='location' label='Location' control={control} />
            <RHFTextField name='rent' label='Hall Rental' type='number' control={control} />
          </Box>
        </Grid>

        {/* Column 2: Attendance */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ColumnHeader title='Attendance' />
            <RHFTextField name='paidAttendees' label='# Paid Attendees' type='number' control={control} />
            <RHFTextField name='unpaidAttendees' label='# Unpaid Attendees' type='number' control={control} />
            <RHFTextField name='newcomers' label='# Newcomers' type='number' control={control} />
            <RHFTextField name='secondDanceCards' label='# 2nd Dance Cards' type='number' control={control} />
          </Box>
        </Grid>

        {/* Column 3: Staff */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ColumnHeader title='Staff' />
            <RHFTextField name='cmic' label='CMIC' control={control} />
            <RHFTextField name='doorVolunteer' label='Door Volunteer' control={control} />
            <RHFTextField name='floorHost' label='Floor Host' control={control} />
            <RHFTextField name='rafflePrize' label='Raffle Prize' control={control} />
          </Box>
        </Grid>

        {/* Notes */}
        <RHFTextField name='notes' label='Notes (for spreadsheet)' control={control} multiline rows={4} fullWidth />
      </Grid>
    </Paper>
  );
};
