// https://firebase.google.com/docs/functions/typescript

import {setGlobalOptions} from "firebase-functions";
import { onCall } from 'firebase-functions/v2/https';
import { onObjectFinalized } from 'firebase-functions/v2/storage';
import { logger } from 'firebase-functions/v2';
import { defineSecret } from 'firebase-functions/params';
import { initializeApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { google } from 'googleapis';
import { Readable } from 'stream';
initializeApp();


// Set ID of Google Shared Drive folder (retrieve from URL)
// Folder must be on a "Shared Drive" (not My Drive)
// Folder must be shared with the service account client_email
const FOLDER_ID = '1VH0PrNa6weicqF86-Ctv1hHZQ6T6OdjY';

// Set ID of Google Sheet (retrieve from URL)
// Spreadsheet must be shared with the service account client_email
// const SHEET_ID = '16NYzvtuR8JSXS1_IngjONp7dQGngvxnqQW7BxZCFFhc';

// Retrieve Service Token from Google Cloud Secret Manager
const googleDriveServiceToken = defineSecret('GOOGLE_DRIVE_SERVICE_TOKEN');

setGlobalOptions({ maxInstances: 10 }); // to override: onRequest({ maxInstances: 5 }...


// Trigger: Called by front-end upon form submission
// Action: Save data to Google Sheet
export const appendToSpreadsheet = onCall({ region: 'us-west1' }, async (req) => {
  logger.info('appendToSpreadsheet function invoked');

  if (!req.auth) {
    throw new Error('Authentication required');
  }

  try {
    logger.info('Received worksheet data from user:', req.auth.token.email);

    const { worksheet } = req.data;
    logger.info('Worksheet:', worksheet);

    return { 
      success: true, 
      message: 'Worksheet received successfully' 
    };
  } catch (error) {
    logger.error('Error processing worksheet:', error);
    throw new Error('Failed to process worksheet');
  }  
});


// Trigger: File uploaded to Firebase Cloud Storage
// Action: Save to Google Shared Drive
export const savePDF = onObjectFinalized({
  region: 'us-west1',
  secrets: [googleDriveServiceToken]
}, async (event) => {
  logger.info('savePDF function triggered');

  const object = event.data;
  const { contentType, name: path } = object;
  logger.info('File found:', path);
  if (!path) {
    throw new Error('File path is undefined');
  }

  try {
    // download file from Storage
    const bucket = getStorage().bucket(object.bucket);
    const [imageBuffer] = await bucket.file(path).download();
    logger.log("Image downloaded!");

    // auth to google drive
    const keys = JSON.parse(googleDriveServiceToken.value());
    const auth = new google.auth.JWT({
      email: keys.client_email,
      key: keys.private_key,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    const drive = google.drive({ version: 'v3', auth });

    // upload file to google drive
    const file = await drive.files.create({
      requestBody: {
        name: path.split('/').pop(),
        parents: [FOLDER_ID]
      },
      media: {
        mimeType: contentType,
        body: Readable.from(imageBuffer)
      },
      supportsAllDrives: true
    });
    logger.log(`File uploaded to Google Drive with ID: ${file.data.id}`);
  } catch (error) {
    logger.error('Error transferring file to Google Drive:', error);
  }
});
