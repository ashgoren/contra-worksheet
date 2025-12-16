import { Alert} from '@mui/material';
import { FinancialSummary, TalentCalculationsSection } from 'components/sections';
import { useOnlineStatus } from 'hooks/useOnlineStatus';

export const WorksheetFormCalculations = () => {
  const isOnline = useOnlineStatus();

  return (
    <>
      <FinancialSummary />
      <TalentCalculationsSection />
      {/* <FinalCalculationsSection /> */}

      {!isOnline &&
        <Alert severity='warning' sx={{ my: 2 }}>You appear to be offline. You'll be able to submit the form once you are back online. Your progress has been saved.</Alert>
      }
    </>
  );
};
