import { Button, Box, Paper, Typography, Table, TableBody, TableRow, TableCell, TableHead, useMediaQuery } from '@mui/material';
import { SectionHeader } from 'ui';
import { formatCurrency } from 'utils';
import { useTalent } from 'hooks/useTalent';
import type { ReactNode } from 'react';

export const TalentCalculationsSection = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { talent, payBasis, pcdcShare } = useTalent();
  console.log('Talent', talent);

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
            <SummaryTableRow label='Pay Basis' description={<>used to calculate shares<br />{`admissions - rent - misc expenses - total travel - talent guarantees - pcdc guarantee`}</>} value={payBasis} />
            <SummaryTableRow label='Share' description={<>based on pay basis and # of talent</>} value={pcdcShare} />
          </TableBody>
        </Table>
      </Box>

      {isXs && <>
        {talent.map((t) => (
          <Box key={t.name} sx={{ mt: 2, border: '1px solid', borderRadius: 1, p: 2 }}>
            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>{t.name} ({t.role})</Typography>
            <Typography variant='body1'>Travel: {t.travel || '-'}</Typography>
            <Typography variant='body1'>Guarantee: {t.guarantee || '-'}</Typography>
            <Typography variant='body1'>Share: {t.share ? formatCurrency(t.share) : '-'}</Typography>
            <Typography variant='body1'>Total: {t.totalPay ? formatCurrency(t.totalPay) : '-'}</Typography>
            <Button variant='contained' color='primary' sx={{ mt: 2, mb: 1 }}>Sign</Button>
          </Box>
        ))}
        <Typography variant='body2' sx={{ mt: 2, p: 2, fontStyle: 'italic' }}>
          PCDC: {formatCurrency(talent.filter(t => t.role === 'caller')[0]?.guarantee || 0)} guarantee, {formatCurrency(pcdcShare)} share
        </Typography>
      </>}

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
              {talent.map((t) => (
                <TableRow key={t.name}>
                  <TableCell>
                    <Typography variant='body1'>{t.name} ({t.role})</Typography>
                  </TableCell>
                  <TableCell>
                    {t.travel || '-'}
                  </TableCell>
                  <TableCell>
                    {t.guarantee || '-'}
                  </TableCell>
                  <TableCell>
                    {t.share ? formatCurrency(t.share) : '-'}
                  </TableCell>
                  <TableCell>
                    {t.totalPay ? formatCurrency(t.totalPay) : '-'}
                  </TableCell>
                  <TableCell>
                    <Button variant='contained' color='primary'>Sign</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant='body2' sx={{ mt: 1, p: 2, fontStyle: 'italic' }}>
            PCDC: {formatCurrency(talent.filter(t => t.role === 'caller')[0]?.guarantee || 0)} guarantee, {formatCurrency(pcdcShare)} share
          </Typography>
        </Box>
      )}

    </Paper>
  );
};

const SummaryTableRow = ({ label, value, description }: { label: string; value: number | null | undefined; description?: ReactNode }) => (
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
