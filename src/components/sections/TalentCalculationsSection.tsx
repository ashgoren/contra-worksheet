import { Button, Box, Paper, Typography, Table, TableBody, TableRow, TableCell, TableHead, useMediaQuery } from '@mui/material';
import { SectionHeader } from 'ui';
import { useTalent } from 'hooks/useTalent';
import type { ReactNode } from 'react';

export const TalentCalculationsSection = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const talentPayBasis = 0;
  const talentShare = 0;

  const { talent, guarantee } = useTalent();

  const guaranteePlusShare = guarantee + talentShare;

  const talentWithTotalPay = talent.map((t) => ({
    ...t,
    totalPay: t.travel + guaranteePlusShare
  }));

  console.log('talentWithTotalPay', talentWithTotalPay);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <SectionHeader title='Talent Pay Calculations' />

      <Box sx={{
        maxWidth: { xs: '100%', md: '735px' },
        border: '1px solid',
        borderRadius: 1
      }}>
        <Typography variant='subtitle2' component='h3' sx={{ p: 2, fontWeight: 'bold' }}>
          Internal Calculations
        </Typography>
        <Table>
          <TableBody>
            <SummaryTableRow label='Talent Pay Basis' description='admissions minus total travel; used to calculate shares' value={talentPayBasis} />
            <SummaryTableRow label='Talent Share' description={<>calculated after all travel entered<br />based on talent pay basis, talent guarantee, # of musicians</>} value={talentShare} />
          </TableBody>
        </Table>
      </Box>

      {isXs && (talentWithTotalPay.map((t) => (
        <Box key={t.name} sx={{ mt: 2, border: '1px solid', borderRadius: 1, p: 2 }}>
          <Typography variant='body1' sx={{ fontWeight: 'bold' }}>{t.name} ({t.role})</Typography>
          <Typography variant='body1'>Travel: {t.travel || 0}</Typography>
          <Typography variant='body1'>Guarantee: {guarantee}</Typography>
          <Typography variant='body1'>Share: {talentShare}</Typography>
          <Typography variant='body1'>Total: {t.totalPay}</Typography>
          <Button variant='contained' color='primary' sx={{ mt: 2, mb: 1 }}>Sign</Button>
        </Box>
      )))}

      {!isXs && (
        <Box sx={{
          mt: 2,
          maxWidth: { xs: '100%', md: '735px' },
          border: '1px solid',
          borderRadius: 1
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Talent</TableCell>
                <TableCell>Travel</TableCell>
                <TableCell>Guarantee</TableCell>
                <TableCell>Share</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Signature</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {talentWithTotalPay.map((t) => (
                <TableRow key={t.name}>
                  <TableCell>
                    <Typography variant='body1'>{t.name} ({t.role})</Typography>
                  </TableCell>
                  <TableCell>
                    {t.travel || 0}
                  </TableCell>
                  <TableCell>
                    {guarantee}
                  </TableCell>
                  <TableCell>
                    {talentShare}
                  </TableCell>
                  <TableCell>
                    {t.totalPay}
                  </TableCell>
                  <TableCell>
                    <Button variant='contained' color='primary'>Sign</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

    </Paper>
  );
};

const SummaryTableRow = ({ label, value, description }: { label: string; value: number | null; description?: ReactNode }) => (
  <TableRow>
    <TableCell sx={{ borderBottom: 'none' }}>
      <Box>
        <Typography variant='body1'>{label}</Typography>
        {description && (
          <Typography variant='caption' color='text.secondary' sx={{ fontStyle: 'italic' }}>
            {description}
          </Typography>
        )}
      </Box>
    </TableCell>
    <TableCell align='right' sx={{ borderBottom: 'none', fontSize: '1.2rem', pr: { xs: 2, sm: 4 } }}>
      {value != null ? (Number.isInteger(value) ? value : value.toFixed(2)) : '-'}
    </TableCell>
  </TableRow>
);
