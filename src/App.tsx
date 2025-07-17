import { useForm, FormProvider } from 'react-hook-form';
import { Container } from '@mui/material';
import { Layout } from 'components/Layout';
import { EventInfoSection } from 'sections/EventInfoSection';
import type { WorksheetFormData } from 'types/worksheet';

function App() {
  const methods = useForm<WorksheetFormData>({
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
  const formData = methods.watch();
  console.log('Current form data:', formData);

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Layout>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <EventInfoSection />
          </form>
        </FormProvider>
      </Layout>
    </Container>
  )
}

export default App;
