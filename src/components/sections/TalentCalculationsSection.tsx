import { Button, Box, Paper, Typography, Table, TableBody, TableRow, TableCell, TableHead, useMediaQuery } from '@mui/material';
import { SectionHeader } from 'ui';
import { formatCurrency } from 'utils';
import { useTalent } from 'hooks/useTalent';
import type { ReactNode } from 'react';
import type { Person } from 'types/talent';

export const TalentCalculationsSection = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { talent, payBasis, pcdcGuarantee, pcdcShare } = useTalent();
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

      {isXs ? (
        talent.map((person) => (
          <TalentRow key={person.name} person={person} isXs={true} />
        ))
      ) : (
        <Box sx={{ mt: 2, maxWidth: { xs: '100%', md: '735px' }, border: '1px solid', borderRadius: 1 }}>
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
              {talent.map((person) => (
                <TalentRow key={person.name} person={person} isXs={false} />
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      <Typography variant='body2' sx={{ mt: { xs: 2, sm: 1 }, p: 2, fontStyle: 'italic' }}>
        PCDC: {formatCurrency(pcdcGuarantee)} guarantee, {formatCurrency(pcdcShare)} share
      </Typography>
    </Paper>
  );
};

const TalentRow = ({person, isXs}: {person: Person; isXs: boolean}) => {
  const nameWithRole = `${person.name} (${person.role})`;
  const travel = person.travel || '-';
  const guarantee = person.guarantee || '-';
  const share = person.share ? formatCurrency(person.share) : '-';
  const totalPay = person.totalPay ? formatCurrency(person.totalPay) : '-';
  return isXs ? (
    <Box key={person.name} sx={{ mt: 2, border: '1px solid', borderRadius: 1, p: 2 }}>
      <Typography variant='body1' sx={{ fontWeight: 'bold' }}>{nameWithRole}</Typography>
      <Typography variant='body1'>Travel: {travel}</Typography>
      <Typography variant='body1'>Guarantee: {guarantee}</Typography>
      <Typography variant='body1'>Share: {share}</Typography>
      <Typography variant='body1'>Total: {totalPay}</Typography>
      <Button variant='contained' color='primary' sx={{ mt: 2, mb: 1 }}>Sign</Button>
    </Box>
  ) : (
    <TableRow>
      <TableCell><Typography variant='body1'>{nameWithRole}</Typography></TableCell>
      <TableCell>{travel}</TableCell>
      <TableCell>{guarantee}</TableCell>
      <TableCell>{share}</TableCell>
      <TableCell>{totalPay}</TableCell>
      <TableCell><Button variant='contained' color='primary'>Sign</Button></TableCell>
    </TableRow>
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
      {formatCurrency(value)}
    </TableCell>
  </TableRow>
);
