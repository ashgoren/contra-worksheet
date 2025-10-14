import { FinancialSummary, TalentCalculationsSection, FinalCalculationsSection } from 'components/sections';
import { GenerateReport } from './GenerateReport';

export const WorksheetFormCalculations = () => {
  return (
    <>
      <FinancialSummary />
      <TalentCalculationsSection />
      <FinalCalculationsSection />
      <GenerateReport />
    </>
  );
};
