import { Alert} from '@mui/material';
import { EventInfoSection, CashBreakdownSection, OtherPaymentMethodsSection, DonationSection, MembershipSection, MiscExpensesSection, TalentSection } from 'components/sections';
import { useOnlineStatus } from 'hooks/useOnlineStatus';

export const WorksheetFormInputs = () => {
  const isOnline = useOnlineStatus();

  return (
    <>
      {!isOnline &&
        <Alert severity='warning' sx={{ my: 2 }}>You appear to be offline. You may continue to fill out the form, and your progress will be saved. You'll be able to submit the form once back online.</Alert>
      }

      <EventInfoSection />
      <CashBreakdownSection />
      <OtherPaymentMethodsSection />
      <DonationSection />
      <MembershipSection />
      <MiscExpensesSection />
      <TalentSection />
    </>
  );
};
