import { Grid, Paper, Box } from '@mui/material';
import { SectionHeader, ColumnHeader } from 'ui';
import { RHFTextField } from 'inputs';

export const EventInfoSection = () => {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <SectionHeader title='Event Information' />

      <Grid container spacing={3}>
        {/* Column 1: Event Details */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ColumnHeader title='Event Details' />
            <RHFTextField name='date' label='Date' type='date' />
            <RHFTextField name='band' label='Band Name' />
            <RHFTextField name='location' label='Location' />
            <RHFTextField name='rent' label='Hall Rental' type='number' />
          </Box>
        </Grid>

        {/* Column 2: Attendance */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ColumnHeader title='Attendance' />
            <RHFTextField name='paidAttendees' label='# Paid Attendees' type='number' />
            <RHFTextField name='unpaidAttendees' label='# Unpaid Attendees' type='number' />
            <RHFTextField name='newcomers' label='# Newcomers' type='number' />
            <RHFTextField name='secondDanceCards' label='# 2nd Dance Cards' type='number' />
          </Box>
        </Grid>

        {/* Column 3: Staff */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ColumnHeader title='Staff' />
            <RHFTextField name='cmic' label='CMIC' />
            <RHFTextField name='doorVolunteer' label='Door Volunteer' />
            <RHFTextField name='floorHost' label='Floor Host' />
            <RHFTextField name='rafflePrize' label='Raffle Prize' />
          </Box>
        </Grid>

        {/* Notes */}
        <RHFTextField name='notes' label='Notes (for spreadsheet)' multiline rows={4} fullWidth />
      </Grid>
    </Paper>
  );
};
