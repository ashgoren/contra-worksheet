import { google } from 'googleapis';
import { defineSecret } from 'firebase-functions/params';

export const getGoogleServices = (googleServiceToken: ReturnType<typeof defineSecret>) => {
  const keys = JSON.parse(googleServiceToken.value());
  const auth = new google.auth.JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/spreadsheets'],
  });
  return {
    drive: google.drive({ version: 'v3', auth }),
    sheets: google.sheets({ version: 'v4', auth })
  };
};
