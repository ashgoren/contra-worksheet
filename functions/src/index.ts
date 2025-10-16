// https://firebase.google.com/docs/functions/typescript

import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions/v2';
import { defineSecret } from 'firebase-functions/params';
import { initializeApp } from 'firebase-admin/app';
import { getGoogleServices } from './google';
import { appendToSpreadsheet } from './appendToSpreadsheet';
import { uploadPDF } from './uploadPDF';

initializeApp();

// Set ID of Google Shared Drive folder (retrieve from URL)
// Folder must be on a "Shared Drive" (not My Drive)
// Folder must be shared with the service account client_email
const FOLDER_ID = '1VH0PrNa6weicqF86-Ctv1hHZQ6T6OdjY';

// Set ID of Google Sheet (retrieve from URL)
// Spreadsheet must be shared with the service account client_email
const SHEET_ID = '16NYzvtuR8JSXS1_IngjONp7dQGngvxnqQW7BxZCFFhc';

// Retrieve Service Token from Google Cloud Secret Manager
const googleDriveServiceToken = defineSecret('GOOGLE_DRIVE_SERVICE_TOKEN');

const maxInstances = 5;
const region = 'us-west1';
const secrets = [googleDriveServiceToken];

export const saveWorksheet = onCall({ maxInstances, region, secrets }, async (req) => {
  logger.info('saveWorksheet function invoked');

  if (!req.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to upload files');
  }
  logger.info('Received worksheet data from user:', req.auth.token.email);

  const { pdf, worksheet } = req.data;
  if (!pdf || !worksheet) {
    throw new HttpsError('invalid-argument', 'Missing PDF or worksheet data');
  }

  const { drive, sheets } = getGoogleServices(googleDriveServiceToken);

  try {
    const { pdfUrl } = await uploadPDF({ pdf, drive, folderId: FOLDER_ID });
    logger.info('PDF uploaded successfully');
    await appendToSpreadsheet({ worksheet, pdfUrl, sheets, sheetId: SHEET_ID });
    logger.info('Worksheet data appended to spreadsheet successfully');
    return { success: true };
  } catch (error) {
    logger.error('Error in saveWorksheet:', error);
    throw new HttpsError('internal', `Error saving worksheet: ${error instanceof Error ? error.message : String(error)}`);
  }
});
