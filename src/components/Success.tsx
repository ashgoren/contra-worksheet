import { Alert } from '@mui/material';
import { SubmissionInstructions } from './SubmissionInstructions';

export const Success = ({ checkToPcdc }: { checkToPcdc: number | null }) => {
  return (
    <>
      <Alert severity='success'>Worksheet submitted!</Alert>
      <SubmissionInstructions checkToPcdc={checkToPcdc} />
    </>
  );
};
