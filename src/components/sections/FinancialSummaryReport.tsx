import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatCurrency } from 'utils';
import { calculateFinancials } from 'services/financials';
import { calculateFinalFinancials } from 'services/finalFinancials';
import type { WorksheetFormData } from 'types/worksheet';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
    padding: 10,
    border: '1px solid #E0E0E0',
    borderRadius: 6,
    fontFamily: 'Helvetica',
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#007acc',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottom: '1px solid #EEE',
  },
  tableRowOdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottom: '1px solid #EEE',
    backgroundColor: '#F9F9F9',
  },
  labelContainer: {
    flex: 3, // Takes up 3/4 of the space
  },
  label: {
    fontSize: 11,
  },
  description: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#666',
  },
  value: {
    flex: 1, // Takes up 1/4 of the space
    textAlign: 'right',
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
});

const SummaryTableRow = ({ label, value, description, isOdd }: {
  label: string;
  value: number | null;
  description?: string;
  isOdd?: boolean;
}) => (
  <View style={isOdd ? styles.tableRowOdd : styles.tableRow}>
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
      {description && (
        <Text style={styles.description}>({description})</Text>
      )}
    </View>
    <Text style={styles.value}>{formatCurrency(value)}</Text>
  </View>
);

export const FinancialSummaryReport = ({ data }: { data: WorksheetFormData }) => {
  const financials = calculateFinancials(data);
  const { pcdcProfit, danceProfitLoss, checkToPcdc } = calculateFinalFinancials(data);

  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionHeader}>Financial Summary</Text>
      <View style={styles.table}>
        <SummaryTableRow label='Total Cash In Box' value={financials.totalCashInBox} isOdd />
        <SummaryTableRow label='Cash Payments' value={financials.cashPayments} description='total minus starting' />
        <SummaryTableRow label='Misc Expenses' value={financials.miscExpenses} isOdd />
        <SummaryTableRow label='Checks' value={financials.checks} />
        <SummaryTableRow label='Electronic' value={financials.electronic} isOdd />
        <SummaryTableRow label='Donations' value={financials.donations} />
        <SummaryTableRow label='Memberships' value={financials.memberships} isOdd />
        <SummaryTableRow label='Total Payments' value={financials.totalPayments} description='cash payments + checks + electronic' />
        <SummaryTableRow label='Evening Deposits' value={financials.eveningDeposits} description='total cash in box + checks' isOdd />
        <SummaryTableRow label='Admissions' value={financials.admissions} description='total payments - donations - memberships' />
        <SummaryTableRow label='PCDC Profit' value={pcdcProfit} description='guarantee + share' />
        <SummaryTableRow label='Dance Profit/Loss' value={danceProfitLoss} description='admissions - totalTalentPay - rent' />
        <SummaryTableRow label='Check to PCDC' value={checkToPcdc} description='cash payments - totalTalentPay - miscExpenses' />
      </View>
    </View>
  );
};