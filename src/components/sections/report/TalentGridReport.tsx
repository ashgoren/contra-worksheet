import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { formatCurrency } from 'utils';
import { calculateTalent } from 'services/talent';
import type { WorksheetFormData } from 'types/worksheet';

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
    marginTop: 5,
  },
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
  // Table styles
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontFamily: 'Helvetica-Bold',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  // Column widths
  colTalent: { width: '30%' },
  colTravel: { width: '12%' },
  colGuarantee: { width: '15%' },
  colShare: { width: '13%' },
  colTotal: { width: '15%' },
  colSignature: { width: '15%', padding: 2 },
  // Cell text styles
  cellText: {
    fontSize: 9,
    textAlign: 'center',
  },
  cellTextLeft: {
    textAlign: 'left',
  },
  signatureImage: {
    width: '100%',
    height: 25,
  },
  emptyText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#888',
  },
});

export const TalentGridReport = ({ data }: { data: WorksheetFormData }) => {
  const { talent, pcdcGuarantee, pcdcShare } = calculateTalent(data);
  if (!talent?.length) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Talent Pay</Text>
        <Text style={styles.emptyText}>Not enough data to calculate talent pay.</Text>
      </View>
    );
  }

  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionHeader}>Talent Payments</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCol, styles.colTalent]}><Text style={styles.cellText}>Talent</Text></View>
          <View style={[styles.tableCol, styles.colTravel]}><Text style={styles.cellText}>Travel</Text></View>
          <View style={[styles.tableCol, styles.colGuarantee]}><Text style={styles.cellText}>Guarantee</Text></View>
          <View style={[styles.tableCol, styles.colShare]}><Text style={styles.cellText}>Share</Text></View>
          <View style={[styles.tableCol, styles.colTotal]}><Text style={styles.cellText}>Total</Text></View>
          <View style={[styles.tableCol, styles.colSignature]}><Text style={styles.cellText}>Signature</Text></View>
        </View>

        {/* Table Body */}
        {talent.map((person, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={[styles.tableCol, styles.colTalent]}>
              <Text style={[styles.cellText, styles.cellTextLeft]}>{`${person.name} (${person.role})`}</Text>
            </View>
            <View style={[styles.tableCol, styles.colTravel]}>
              <Text style={styles.cellText}>{person.travel ? formatCurrency(person.travel) : '-'}</Text>
            </View>
            <View style={[styles.tableCol, styles.colGuarantee]}>
              <Text style={styles.cellText}>{person.guarantee ? formatCurrency(person.guarantee) : '-'}</Text>
            </View>
            <View style={[styles.tableCol, styles.colShare]}>
              <Text style={styles.cellText}>{person.share ? formatCurrency(person.share) : '-'}</Text>
            </View>
            <View style={[styles.tableCol, styles.colTotal]}>
              <Text style={styles.cellText}>{person.totalPay ? formatCurrency(person.totalPay) : '-'}</Text>
            </View>
            <View style={[styles.tableCol, styles.colSignature]}>
              {person.signature ? (
                <Image src={person.signature} style={styles.signatureImage} />
              ) : (
                <Text style={styles.cellText}>-</Text>
              )}
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.text}>
        PCDC: {formatCurrency(pcdcGuarantee)} guarantee, {formatCurrency(pcdcShare)} share
      </Text>
    </View>
  );
};
