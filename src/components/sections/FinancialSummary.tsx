import { Paper, Box, Typography, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { SectionHeader } from 'ui';
import { formatCurrency } from 'utils';
import { useFinancials } from 'hooks/useFinancials';

export const FinancialSummary = () => {
  const { totalCashInBox, cashPayments, miscExpenses, checks, electronic, donations, memberships, totalPayments, eveningDeposits, admissions } = useFinancials();

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <SectionHeader title='Financial Summary' />
      <Box sx={{ maxWidth: { xs: '100%', md: '735px' }, border: '1px solid', borderRadius: 1 }}>
        <Table>
          <TableBody sx={{ '& .MuiTableRow-root:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
            <SummaryTableRow label='Total Cash In Box' value={totalCashInBox} />
            <SummaryTableRow label='Cash Payments' value={cashPayments} description='total minus starting' />
            <SummaryTableRow label='Misc Expenses' value={miscExpenses} />
            <SummaryTableRow label='Checks' value={checks} />
            <SummaryTableRow label='Electronic' value={electronic} />
            <SummaryTableRow label='Donations' value={donations} />
            <SummaryTableRow label='Memberships' value={memberships} />
            <SummaryTableRow label='Total Payments' value={totalPayments} description='cash payments + checks + electronic' />
            <SummaryTableRow label='Evening Deposits' value={eveningDeposits} description='total cash in box + checks' />
            <SummaryTableRow label='Admissions' value={admissions} description='total payments - donations - memberships' />
          </TableBody>
        </Table>
      </Box>
    </Paper>
  )
};

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
