import { Paper, Box, Typography, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { useFinalCalculations } from 'hooks/useFinalCalculations';
import { SectionHeader } from 'ui';
import { formatCurrency } from 'utils';

export const FinalCalculationsSection = () => {
  const { pcdcProfit, danceProfitLoss, checkToPcdc } = useFinalCalculations();

  if (pcdcProfit === null || danceProfitLoss === null || checkToPcdc === null) {
    return (
      <Paper sx={{ p: 2, mb: 2 }}>
        <SectionHeader title='Final Calculations' />
        <Typography variant='body2' sx={{ fontStyle: 'italic' }}>
          Not enough data to calculate.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <SectionHeader title='Final Calculations' />
      <Box sx={{ maxWidth: { xs: '100%', md: '735px' }, border: '1px solid', borderRadius: 1 }}>
        <Table>
          <TableBody>
            <SummaryTableRow label='PCDC Profit' description='guarantee + share' value={pcdcProfit} />
            <SummaryTableRow label='Dance Profit/Loss' description='admissions - totalTalentPay - rent' value={danceProfitLoss} />
            <SummaryTableRow label='Check to PCDC' description='cash payments - totalTalentPay - miscExpenses' value={checkToPcdc} />
          </TableBody>
        </Table>
      </Box>
      <Typography variant='body2' sx={{ mt: { xs: 2, sm: 1 }, p: 2, fontStyle: 'italic' }}>
        Confirm Check to PCDC amount equals remaining cash<br />
        (after paying talent and petty cash, excluding starting cash)
      </Typography>
    </Paper>
  );
}

const SummaryTableRow = ({ label, value, description }: { label: string; value: number | null; description?: string }) => (
  <TableRow>
    <TableCell>
      <Box>
        <Typography variant='body1'>{label}</Typography>
        {description && (
          <Typography variant='caption' color='text.secondary' sx={{ fontStyle: 'italic' }}>
            ({description})
          </Typography>
        )}
      </Box>
    </TableCell>
    <TableCell align='right' sx={{ fontSize: '1.2rem', pr: { xs: 2, sm: 4 } }}>
      {formatCurrency(value)}
    </TableCell>
  </TableRow>
);
