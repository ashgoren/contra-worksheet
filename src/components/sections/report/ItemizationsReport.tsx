import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatCurrency } from 'utils';
import type { WorksheetFormData } from 'types/worksheet';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
    padding: 10,
    border: '1px solid #E0E0E0',
    borderRadius: 6,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#007acc',
  },
  subHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottom: '1px solid #EEE',
    paddingBottom: 4,
  },
  listContainer: {
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottom: '1px solid #F5F5F5',
  },
  itemName: {
    flex: 3, // Takes up 3/4 of the space
    fontSize: 11,
  },
  itemAmount: {
    flex: 1, // Takes up 1/4 of the space
    textAlign: 'right',
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  emptyText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#888',
  },
});

export const ItemizationsReport = ({ data }: { data: WorksheetFormData }) => {
  const validMemberships = data.memberships.filter(m => m.name && m.amount);
  const validPettyCash = data.pettyCash.filter(pc => pc.item && pc.amount);

  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.header}>Itemizations</Text>

      {/* Memberships List */}
      <View style={styles.listContainer}>
        <Text style={styles.subHeader}>Memberships</Text>
        {validMemberships.length > 0 ? (
          validMemberships.map((membership, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.itemName}>{membership.name}</Text>
              <Text style={styles.itemAmount}>{formatCurrency(Number(membership.amount))}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No memberships recorded.</Text>
        )}
      </View>

      {/* Misc Expenses List */}
      <View style={styles.listContainer}>
        <Text style={styles.subHeader}>Misc Expenses</Text>
        {validPettyCash.length > 0 ? (
          validPettyCash.map((expense, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.itemName}>{expense.item}</Text>
              <Text style={styles.itemAmount}>{formatCurrency(Number(expense.amount))}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No miscellaneous expenses recorded.</Text>
        )}
      </View>
    </View>
  );
};
