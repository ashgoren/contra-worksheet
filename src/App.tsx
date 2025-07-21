import { useForm, FormProvider } from 'react-hook-form';
import { Container } from '@mui/material';
import { Layout } from 'components/Layout';
import { EventInfoSection, CashBreakdownSection, OtherPaymentMethodsSection, DonationMembershipSection, CashProcessingSection, FinancialSummary } from 'components/sections';
import type { WorksheetFormData } from 'types/worksheet';

function App() {
  const methods = useForm<WorksheetFormData>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      band: '',
      location: 'Fulton',
      rent: 330,
      paidAttendees: null,
      unpaidAttendees: null,
      newcomers: null,
      secondDanceCards: null,
      cmic: '',
      doorVolunteer: '',
      floorHost: '',
      rafflePrize: '',
      notes: '',
      ones: null,
      fives: null,
      tens: null,
      twenties: null,
      fifties: null,
      hundreds: null,
      coins: null,
      donations: null,
      memberships: [{ name: '', amount: null }],
      pettyCash: [{ item: '', amount: null }],
      startingCash: 200,
    }
  });

  const onSubmit = (data: WorksheetFormData) => {
    console.log('Submitted!', data);
  };

  // for dev purposes, but re-renders entire form on every change
  // const formData = methods.watch();
  // console.log('Current form data:', formData);

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Layout>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <EventInfoSection />
            <CashBreakdownSection />
            <OtherPaymentMethodsSection />
            <DonationMembershipSection />
            <CashProcessingSection />
            <FinancialSummary />
          </form>
        </FormProvider>
      </Layout>
    </Container>
  )
}

export default App;
