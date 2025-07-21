import { Paper, Box, Typography, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { SectionHeader } from 'ui';

export const FinancialSummary = () => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <SectionHeader title='Financial Summary' />
      <Box sx={{
        maxWidth: { xs: '100%', md: '735px' },
        border: '1px solid',
        borderRadius: 1
      }}>
        <Table>
          <TableBody sx={{ '& .MuiTableRow-root:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
            <SummaryTableRow label='Total Cash In Box' value='$0' />
            <SummaryTableRow label='Cash Payments' value='$0' description='total minus starting' />
            <SummaryTableRow label='Misc Expenses' value='$0' />
            <SummaryTableRow label='Checks' value='$0' />
            <SummaryTableRow label='Electronic' value='$0' />
            <SummaryTableRow label='Donations' value='$0' />
            <SummaryTableRow label='Memberships' value='$0' />
            <SummaryTableRow label='Total Payments' value='$0' description='cash payments + checks + electronic' />
            <SummaryTableRow label='Evening Deposits' value='$0' description='total cash in box + checks' />
            <SummaryTableRow label='Admissions' value='$0' description='total payments - donations - memberships' />
          </TableBody>
        </Table>
      </Box>
    </Paper>
  )
};

const SummaryTableRow = ({ label, value, description }: { label: string; value: string; description?: string }) => (
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
    <TableCell align='right' sx={{ fontWeight: 'bold', pr: { xs: 2, sm: 4 } }}>
      {value}
    </TableCell>
  </TableRow>
);
