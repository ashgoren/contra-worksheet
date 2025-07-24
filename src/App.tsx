import type { WorksheetFormData } from 'types/worksheet';
import { useForm, FormProvider } from 'react-hook-form';
import { ConfirmProvider } from 'material-ui-confirm';
import { Container } from '@mui/material';
import { Layout } from 'components/Layout';
import { WorksheetForm } from 'components/WorksheetForm';
import { defaults } from 'src/config';
import { loadFromLocalStorage } from 'utils';

function App() {
  const defaultValues = loadFromLocalStorage() || defaults;
  const methods = useForm<WorksheetFormData>({ defaultValues });
  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Layout>
        <FormProvider {...methods}>
          <ConfirmProvider>
            <WorksheetForm />
          </ConfirmProvider>
        </FormProvider>
      </Layout>
    </Container>
  )
}

export default App;
