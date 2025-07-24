import type { WorksheetFormData } from 'types/worksheet';
import { useFormContext } from 'react-hook-form';
import { useLocalStorage } from 'hooks/useLocalStorage';
import {
  EventInfoSection,
  CashBreakdownSection,
  OtherPaymentMethodsSection,
  DonationMembershipSection,
  CashProcessingSection,
  FinancialSummary,
  TalentSection,
  FormButtons
} from 'components/sections';

export const WorksheetForm = () => {
  const { saveToLocalStorage } = useLocalStorage();
  const methods = useFormContext<WorksheetFormData>();

  const onBlur = () => {
    saveToLocalStorage();
  };

  const onSubmit = (data: WorksheetFormData) => {
    console.log('Submitted!', data);
  };

  return (
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
      <TalentSection />

      <FormButtons />
    </form>
  );
};
