import { TextField, Typography, Grid, Paper, Box } from '@mui/material';
import { Controller, type Control } from 'react-hook-form';
import type { WorksheetFormData } from 'src/types/worksheet';

interface EventInfoSectionProps {
  control: Control<WorksheetFormData>;
}

export const EventInfoSection = ({ control }: EventInfoSectionProps) => {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <Typography variant='h6' component='h2' sx={{ mb: 2 }}>
        Event Information
      </Typography>

      <Grid container spacing={3}>
        {/* Column 1: Event Details */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold', mb: 1 }}>
              Event Details
            </Typography>
            <Controller
              name='date'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='date'
                  label='Date'
                  size='small'
                />
              )}
            />
            <Controller
              name='band'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Band Name'
                  size='small'
                />
              )}
            />

            <Controller
              name='location'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Location'
                  size='small'
                />
              )}
            />
            <Controller
              name='rent'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Hall Rental'
                  type='number'
                  size='small'
                />
              )}
            />
          </Box>
        </Grid>

        {/* Column 2: Attendance */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold', mb: 1, mt: { xs: 3, md: 0 } }}>
              Attendance
            </Typography>
            <Controller
              name='paidAttendees'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='# Paid Attendees'
                  type='number'
                  size='small'
                />
              )}
            />
            <Controller
              name='unpaidAttendees'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='# Unpaid Attendees'
                  type='number'
                  size='small'
                />
              )}
            />
            <Controller
              name='newcomers'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='# Newcomers'
                  type='number'
                  size='small'
                />
              )}
            />
            <Controller
              name='secondDanceCards'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='# 2nd Dance Cards'
                  type='number'
                  size='small'
                />
              )}
            />
          </Box>
        </Grid>

        {/* Column 3: Staff */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold', mb: 1, mt: { xs: 3, md: 0 } }}>
              Staff
            </Typography>
            <Controller
              name='cmic'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='CMIC'
                  size='small'
                />
              )}
            />
            <Controller
              name='doorVolunteer'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Door Volunteer'
                  size='small'
                />
              )}
            />
            <Controller
              name='floorHost'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Floor Host'
                  size='small'
                />
              )}
            />
            <Controller
              name='rafflePrize'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Raffle Prize'
                  size='small'
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
