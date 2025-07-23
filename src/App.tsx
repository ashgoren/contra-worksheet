import { useForm, FormProvider } from 'react-hook-form';
import { Container, Stack, Button, Paper } from '@mui/material';
import { Layout } from 'components/Layout';
import { EventInfoSection, CashBreakdownSection, OtherPaymentMethodsSection, DonationMembershipSection, CashProcessingSection, FinancialSummary } from 'components/sections';
import { defaults } from 'src/config';
import type { WorksheetFormData } from 'types/worksheet';

function App() {
  const stored = localStorage.getItem('worksheetData');
  const defaultValues = stored ? JSON.parse(stored) : defaults;

  const methods = useForm<WorksheetFormData>({ defaultValues });

  const onBlur = () => {
    const data = methods.getValues();
    localStorage.setItem('worksheetData', JSON.stringify(data));
  };

  const onSubmit = (data: WorksheetFormData) => {
    console.log('Submitted!', data);
  };

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Layout>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            onBlur={onBlur}
          >
            <EventInfoSection />
            <CashBreakdownSection />
            <OtherPaymentMethodsSection />
            <DonationMembershipSection />
            <CashProcessingSection />
            <FinancialSummary />

            <Paper sx={{ p: 2, mt: 2, mb: 2 }}>
              <Stack direction='row' spacing={2} justifyContent='space-between'>
                <Button variant='text'
                  onClick={() => methods.reset(defaults)}
                >
                  Reset Form
                </Button>
                  <Button type='submit' variant='contained' color='secondary'>Submit Form</Button>
              </Stack>
            </Paper>
          </form>
        </FormProvider>
      </Layout>
    </Container>
  )
}

export default App;
