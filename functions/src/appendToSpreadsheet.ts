import { logger } from 'firebase-functions/v2';
import type { sheets_v4 } from 'googleapis';
import { formatDateUTC, formatDateTime } from './utils';
import type { WorksheetFormData } from './worksheetTypes';

interface AppendToSpreadsheetParams {
  worksheet: WorksheetFormData;
  pdfUrl: string;
  sheets: sheets_v4.Sheets;
  sheetId: string;
}

export const appendToSpreadsheet = async ({ worksheet, pdfUrl, sheets, sheetId }: AppendToSpreadsheetParams) => {
  logger.info('Worksheet:', worksheet );

  const { talent } = worksheet;
  const callers = talent.filter((t) => t.role === 'caller');
  const musicians = talent.filter((t) => t.role === 'musician');
  const sound = talent.filter((t) => t.role === 'sound');
  const callerShare = callers[0].share;
  const musicianShare = musicians[0].share;

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Worksheets',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [
          [
            formatDateUTC(new Date(worksheet.date)),
            callers.map(c => c.name).join('\n'),
            callers.map(c => `$${c.travel || 0}`).join('\n'),
            worksheet.band,
            musicians.map(m => m.name).join('\n'),
            musicians.map(m => `$${m.travel || 0}`).join('\n'),
            sound.map(s => s.name).join('\n'),
            worksheet.location,
            worksheet.cmic,
            worksheet.doorVolunteer,
            worksheet.floorHost,
            worksheet.paidAttendees,
            worksheet.unpaidAttendees,
            worksheet.newcomers,
            worksheet.secondDanceCards,
            callerShare === musicianShare ? callerShare : `${callerShare} / ${musicianShare}`,
            worksheet.pcdcProfit,
            worksheet.rafflePrize,
            worksheet.notes,
            pdfUrl,
            formatDateTime(new Date()) // Timestamp
          ]
        ]
      }
    });
  } catch (error) {
    logger.error('Error appending to spreadsheet:', error);
    throw error;
  }
};
