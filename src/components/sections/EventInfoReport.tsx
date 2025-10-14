import { Text, View, StyleSheet } from '@react-pdf/renderer';
import type { WorksheetFormData } from 'types/worksheet';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#333',
  },
  section: {
    marginBottom: 15,
    padding: 15,
    border: '1px solid #E0E0E0',
    borderRadius: 6,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#007acc',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '32%',
    flexDirection: 'column',
  },
  columnHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottom: '1px solid #ddd',
    paddingBottom: 3,
  },
  fieldContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 10,
    color: '#666',
  },
  value: {
    fontSize: 11,
  },
  notes: {
    marginTop: 15,
    borderTop: '1px solid #eee',
    paddingTop: 10,
  }
});

export const EventInfoReport = ({ data }: { data: WorksheetFormData }) => (
  <View style={styles.section} wrap={false}>
    <Text style={styles.sectionHeader}>Event Information</Text>

    <View style={styles.gridContainer}>

      {/* Column 1: Event Details */}
      <View style={styles.column}>
        <Text style={styles.columnHeader}>Event Details</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{data.date}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Band Name</Text>
          <Text style={styles.value}>{data.band}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{data.location}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Hall Rental</Text>
          <Text style={styles.value}>${data.rent}</Text>
        </View>
      </View>

      {/* Column 2: Attendance */}
      <View style={styles.column}>
        <Text style={styles.columnHeader}>Attendance</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Paid Attendees</Text>
          <Text style={styles.value}>{data.paidAttendees}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Unpaid Attendees</Text>
          <Text style={styles.value}>{data.unpaidAttendees}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Newcomers</Text>
          <Text style={styles.value}>{data.newcomers}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>2nd Dance Cards</Text>
          <Text style={styles.value}>{data.secondDanceCards}</Text>
        </View>
      </View>

      {/* Column 3: Staff */}
      <View style={styles.column}>
        <Text style={styles.columnHeader}>Staff</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>CMIC</Text>
          <Text style={styles.value}>{data.cmic}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Door Volunteer</Text>
          <Text style={styles.value}>{data.doorVolunteer}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Floor Host</Text>
          <Text style={styles.value}>{data.floorHost}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Raffle Prize</Text>
          <Text style={styles.value}>{data.rafflePrize}</Text>
        </View>
      </View>
    </View>

    {/* Notes Section */}
    {data.notes && (
      <View style={styles.notes}>
        <Text style={styles.label}>Notes</Text>
        <Text style={styles.value}>{data.notes}</Text>
      </View>
    )}

  </View>
);
