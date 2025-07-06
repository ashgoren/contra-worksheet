import { useForm } from 'react-hook-form';
import { Container, TextField, Typography } from '@mui/material';
import type { WorksheetFormData } from './types/worksheet';

function App() {
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
    <Container maxWidth='xs' sx={{ mt: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Worksheet
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('date')}
          type='date'
          label='Date'
          fullWidth
          margin='normal'
        />
        <TextField
          {...register('band')}
          label='Band'
          fullWidth
          margin='normal'
        />
        <TextField
          {...register('location')}
          label='Location'
          fullWidth
          margin='normal'
        />
        <TextField
          {...register('rent', { valueAsNumber: true })}
          label='Rent'
          type='number'
          fullWidth
          margin='normal'
        />
      </form>

    </Container>
  )
}

export default App
