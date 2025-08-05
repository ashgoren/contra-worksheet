import type { WorksheetFormData } from 'types/worksheet';
import { useForm, FormProvider } from 'react-hook-form';
import { ConfirmProvider } from 'material-ui-confirm';
import { Container } from '@mui/material';
import { Layout } from 'components/Layout';
import { useAuth } from 'hooks/useAuth';
import { Loading } from 'components/ui';
import { WorksheetForm } from 'components/WorksheetForm';
import { SignIn } from 'components/auth/SignIn';
import { DEFAULTS } from 'src/config';
import { loadFromLocalStorage } from 'utils';
// import { auth } from 'services/firebase';

function App() {
  const { user, loading } = useAuth();
  const defaultValues = loadFromLocalStorage() || DEFAULTS;
  const methods = useForm<WorksheetFormData>({ defaultValues });

  if (loading) {
    return (
      <Container maxWidth='lg' sx={{ mt: 4 }}>
        <Layout>
          <Loading />
        </Layout>
      </Container>
    )
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Layout>
        <FormProvider {...methods}>
          <ConfirmProvider>
            {user ? <WorksheetForm /> : <SignIn />}
            {/* <button type='button' onClick={() => auth.signOut()}>Sign Out</button> */}
          </ConfirmProvider>
        </FormProvider>
      </Layout>
    </Container>
  )
}

export default App;
