import { Alert, Typography } from '@mui/material';
const { VITE_BOOKKEEPER_CONTACT, VITE_MEMBERSHIP_CONTACT } = import.meta.env;

export const Success = () => {
  return (
    <>
      <Alert severity='success'>Worksheet submitted!</Alert>

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
