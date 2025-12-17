import { Paper, Box, Typography, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { SectionHeader } from 'ui';
import { formatCurrency } from 'utils';
import { useFinancials } from 'hooks/useFinancials';
import { useFinalCalculations } from 'hooks/useFinalCalculations';
import { useTalent } from 'hooks/useTalent';
import type { ReactNode } from 'react';

export const FinancialSummary = () => {
  const { rent, cashPayments, miscExpenses, checks, electronic, donations, memberships, totalPayments, admissions } = useFinancials();
  const { totalTalentPay, danceProfitLoss, checkToPcdc } = useFinalCalculations();
  const { gearRental } = useTalent();

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <SectionHeader title='Financial Summary' />
      <Box sx={{ maxWidth: { xs: '100%', md: '735px' }, border: '1px solid', borderRadius: 1 }}>
        <Table>
          <TableBody>
            {/* <SummaryTableRow label='Cash In Box' value={totalCashInBox} description={`includes $${startingCash} starting cash`} /> */}
            {/* <SummaryTableRow label='Cash Payments' value={cashPayments} description={`excludes $${startingCash} starting cash`} />
            <SummaryTableRow label='Checks' value={checks} />
            <SummaryTableRow label='Electronic' value={electronic} /> */}
            <SummaryTableRow label='Payments' value={totalPayments} description={`${cashPayments} cash payments + ${checks} checks + ${electronic} electronic`} />
            {/* <SummaryTableRow label='Donations' value={donations} />
            <SummaryTableRow label='Memberships' value={memberships} /> */}
            {/* <SummaryTableRow label='Evening Deposits' value={eveningDeposits} description='total cash in box + checks' /> */}
            <SummaryTableRow label='Admissions' value={admissions} description={`${totalPayments} payments - ${donations} donations - ${memberships} memberships`} />
            {/* <SummaryTableRow label='Talent Pay' value={totalTalentPay} /> */}
            <SummaryTableRow label='Dance Profit/Loss' description={`${admissions} admissions - ${totalTalentPay} talent pay - ${rent} rent`} value={danceProfitLoss}/>
            {/* {miscExpenses > 0 && <SummaryTableRow label='Misc Expenses' value={miscExpenses} />} */}
            <SummaryTableRow label='Check to PCDC'
              description={<>
                {`${cashPayments} cash payments - ${totalTalentPay} talent pay - ${miscExpenses} misc expenses + ${gearRental} gear rental`}<br />
                {Number(checkToPcdc) > 0 && <em>{`After paying talent & misc expenses, confirm there's ${checkToPcdc} left in the box (excluding starting cash)`}</em>}
              </>}
              value={Number(checkToPcdc) > 0 ? checkToPcdc : 0}
              highlight={true}
            />
          </TableBody>
        </Table>
      </Box>
    </Paper>
  )
};

const SummaryTableRow = ({ label, value, description, highlight }: { label: string; value: number | null; description?: string | ReactNode, highlight?: boolean }) => (
  <TableRow sx={{ backgroundColor: highlight ? 'action.hover' : '' }}>
    <TableCell>
      <Box>
        <Typography variant='body1'>{label}</Typography>
        {description && (
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        )}
      </Box>
    </TableCell>
    <TableCell align='right' sx={{ fontSize: '1.2rem', pr: { xs: 2, sm: 4 } }}>
      {formatCurrency(value)}
    </TableCell>
  </TableRow>
);
