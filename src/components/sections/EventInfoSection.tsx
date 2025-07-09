import { useForm } from 'react-hook-form';
import { Container, TextField, Typography, Grid, Paper, Box } from '@mui/material';
import type { WorksheetFormData } from 'types/worksheet';

export const EventInfoSection = () => {
  const { register, handleSubmit, watch } = useForm<WorksheetFormData>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      band: '',
      location: 'Fulton',
      rent: 330,
    }
  });

  const onSubmit = (data: WorksheetFormData) => {
    console.log('Submitted!', data);
  };

  // for dev purposes, but re-renders entire form on every change
  const formData = watch();
  console.log('Current form data:', formData);

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom align='center'>
        PCDC Contra Worksheet
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
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
                <TextField
                  {...register('date')}
                  type='date'
                  label='Date'
                  size='small'
                />
                <TextField
                  {...register('band')}
                  label='Band Name'
                  size='small'
                />
                <TextField
                  {...register('location')}
                  label='Location'
                  size='small'
                />
                <TextField
                  {...register('rent', { valueAsNumber: true })}
                  label='Hall Rental'
                  type='number'
                  size='small'
                />
              </Box>
            </Grid>

            {/* Column 2: Attendance */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant='subtitle2' sx={{ fontWeight: 'bold', mb: 1, mt: { xs: 3, md: 0 } }}>
                  Attendance
                </Typography>
                <TextField
                  label='# Paid Attendees'
                  type='number'
                  size='small'
                />
                <TextField
                  label='# Unpaid Attendees'
                  type='number'
                  size='small'
                />
                <TextField
                  label='# Newcomers'
                  type='number'
                  size='small'
                />
                <TextField
                  label='# 2nd Dance Cards'
                  type='number'
                  size='small'
                />
              </Box>
            </Grid>

            {/* Column 3: Staff */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant='subtitle2' sx={{ fontWeight: 'bold', mb: 1, mt: { xs: 3, md: 0 } }}>
                  Staff
                </Typography>
                <TextField
                  label='CMIC'
                  size='small'
                />
                <TextField
                  label='Door Volunteer'
                  size='small'
                />
                <TextField
                  label='Floor Host'
                  size='small'
                />
                <TextField
                  label='Raffle Prize'
                  size='small'
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </Container>
  )
};
