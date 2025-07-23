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
      rent: '330',
      paidAttendees: '',
      unpaidAttendees: '',
      newcomers: '',
      secondDanceCards: '',
      cmic: '',
      doorVolunteer: '',
      floorHost: '',
      rafflePrize: '',
      notes: '',
      ones: '',
      fives: '',
      tens: '',
      twenties: '',
      fifties: '',
      hundreds: '',
      coins: '',
      checks: '',
      electronic: '',
      donations: '',
      memberships: [{ name: '', amount: '' }],
      pettyCash: [{ item: '', amount: '' }],
      startingCash: '200',
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
