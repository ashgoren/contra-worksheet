import { Box, Typography } from '@mui/material';

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
