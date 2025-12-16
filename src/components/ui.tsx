import { Box, Typography, Divider } from '@mui/material';
import { TailSpin } from 'react-loading-icons';

export const SectionHeader = ({ title }: { title: string }) => (
  <Typography variant='h6' component='h2' sx={{ mb: 2 }}>
    {title}
  </Typography>
);

export const SectionDivider = () => {
  return <Divider component='hr' sx={{ borderBottomWidth: 4, my: 4 }} />
}

export const Subtitle = ({ title }: { title: string }) => (
  <Typography variant='subtitle2' component='h3' sx={{ fontWeight: 'bold', mb: 1 }}>
    {title}
  </Typography>
);

export const ColumnHeader = ({ title }: { title: string }) => (
  <Typography variant='subtitle2' component='h3' sx={{ fontWeight: 'bold', mb: 1, mt: { xs: 3, md: 0 } }}>
    {title}
  </Typography>
);

export const StandoutBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        borderColor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        border: '1px solid',
        borderRadius: 2,
        p: 2,
      }}
    >
      {children}
    </Box>
  );
}

export const Loading = ({ text='Thinking...' }) => {
  return (
    <Box sx={{ my: 10, textAlign: 'center' }}>
      <TailSpin stroke='black' strokeWidth='2.5' />
      <Typography sx={{ mt: 5}} color='secondary'>
        {text}
      </Typography>
    </Box>
  );
};
