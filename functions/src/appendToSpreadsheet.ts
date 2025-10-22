import { logger } from 'firebase-functions/v2';
import type { sheets_v4 } from 'googleapis';
import { formatDateUTC, formatDateTime } from './utils';
import type { WorksheetFormData, PersonCalculated } from './worksheetTypes';

// Must match column order in spreadsheet!
const columnOrder = [
  'date',
  'callerNames',
  'callerTravel',
  'band',
  'musicianNames',
  'musicianTravel',
  'soundNames',
  'location',
  'cmic',
  'doorVolunteer',
  'floorHost',
  'paidAttendees',
  'unpaidAttendees',
  'newcomers',
  'secondDanceCards',
  'share',
  'pcdcProfit',
  'rafflePrize',
  'notes',
  'pdfUrl',
  'timestamp'
];

interface SubmittedData extends Omit<WorksheetFormData, 'talent'> {
  talent: PersonCalculated[];
  pcdcProfit: number;
}

interface AppendToSpreadsheetParams {
  worksheet: SubmittedData;
  pdfUrl: string;
  sheets: sheets_v4.Sheets;
  sheetId: string;
}

export const appendToSpreadsheet = async ({ worksheet, pdfUrl, sheets, sheetId }: AppendToSpreadsheetParams) => {
  logger.info('Worksheet:', worksheet );

  const talent = {
    callers: worksheet.talent.filter(t => t.role === 'caller'),
    musicians: worksheet.talent.filter(t => t.role === 'musician'),
    sound: worksheet.talent.filter(t => t.role === 'sound')
  };

  const callerShare = talent.callers[0].share; // all callers have the same share
  const musicianShare = talent.musicians[0].share; // all musicians have the same share
  const shareDisplay = callerShare === musicianShare ? callerShare : `${callerShare} / ${musicianShare}`;

  const rowData: Record<string, string> = {
    date: formatDateUTC(new Date(worksheet.date)),
    callerNames: talent.callers.map(c => c.name).join('\n'),
    callerTravel: talent.callers.map(c => `$${c.travel || 0}`).join('\n'),
    band: worksheet.band,
    musicianNames: talent.musicians.map(m => m.name).join('\n'),
    musicianTravel: talent.musicians.map(m => `$${m.travel || 0}`).join('\n'),
    soundNames: talent.sound.map(s => s.name).join('\n'),
    location: worksheet.location,
    cmic: worksheet.cmic,
    doorVolunteer: worksheet.doorVolunteer,
    floorHost: worksheet.floorHost,
    paidAttendees: worksheet.paidAttendees,
    unpaidAttendees: worksheet.unpaidAttendees,
    newcomers: worksheet.newcomers,
    secondDanceCards: worksheet.secondDanceCards,
    share: String(shareDisplay),
    pcdcProfit: String(worksheet.pcdcProfit),
    rafflePrize: worksheet.rafflePrize,
    notes: worksheet.notes,
    pdfUrl,
    timestamp: formatDateTime(new Date())
  };

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Worksheets',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [
          columnOrder.map(col => rowData[col])
        ]
      }
    });
  } catch (error) {
    logger.error('Error appending to spreadsheet:', error);
    throw error;
  }
};
