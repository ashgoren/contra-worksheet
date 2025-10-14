import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import { EventInfoReport, FinancialSummaryReport, ItemizationsReport, TalentGridReport } from 'components/sections';
import { formatDateTime } from 'utils';
import type { WorksheetFormData } from 'types/worksheet';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 15,
    color: '#333',
  }
});

export const WorksheetReport = ({ data }: { data: WorksheetFormData }) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <Text style={styles.title}>PCDC Contra Worksheet &mdash; {data.date}</Text>
      <Text style={styles.text}>Generated {formatDateTime(new Date())}</Text>

      <EventInfoReport data={data} />
      <ItemizationsReport data={data} />
      <FinancialSummaryReport data={data} />
      <TalentGridReport data={data} />
    </Page>
  </Document>
);
