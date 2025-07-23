import { useForm, FormProvider } from 'react-hook-form';
import { ConfirmProvider } from 'material-ui-confirm';
import { Container } from '@mui/material';
import { Layout } from 'components/Layout';
import { EventInfoSection, CashBreakdownSection, OtherPaymentMethodsSection, DonationMembershipSection, CashProcessingSection, FinancialSummary, FormButtons } from 'components/sections';
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
          <ConfirmProvider>
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

              <FormButtons />
            </form>
          </ConfirmProvider>
        </FormProvider>
      </Layout>
    </Container>
  )
}

export default App;
