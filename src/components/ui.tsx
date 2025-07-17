import { Typography } from '@mui/material';

export const SectionHeader = ({ title }: { title: string }) => (
  <Typography variant='h6' component='h2' sx={{ mb: 2 }}>
    {title}
  </Typography>
);

export const ColumnHeader = ({ title }: { title: string }) => (
  <Typography variant='subtitle2' component='h3' sx={{ fontWeight: 'bold', mb: 1, mt: { xs: 3, md: 0 } }}>
    {title}
  </Typography>
);
