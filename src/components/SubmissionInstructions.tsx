import { Typography } from '@mui/material';
import { formatCurrency } from 'src/utils';

const { VITE_BOOKKEEPER_CONTACT, VITE_MEMBERSHIP_CONTACT } = import.meta.env;

export const SubmissionInstructions = ({ checkToPcdc }: { checkToPcdc: number | null }) => {
  return (
    <>
      <Typography sx={{ my: 3, ml: 2 }}>
        {Number(checkToPcdc) > 0
          ? <strong>Write check to PCDC for: ${formatCurrency(checkToPcdc)}</strong>
          : <>No check to PCDC</>
        }
      </Typography>

      <Typography sx={{ my: 3, ml: 2 }}>
        <strong>Mail checks to:</strong><br />
        {parseContact(VITE_BOOKKEEPER_CONTACT)}
      </Typography>
      <Typography sx={{ my: 3, ml: 2 }}>
        <strong>Mail membership forms to:</strong><br />
        {parseContact(VITE_MEMBERSHIP_CONTACT)}
      </Typography>
    </>
  );
};

const parseContact = (contact: string) => {
  const parts = contact.split(',');
  return (
    <>
      {parts[0]}<br />
      {parts.slice(1,-1).join(',')}<br />
      {parts.slice(-1)}
    </>
  );
};
