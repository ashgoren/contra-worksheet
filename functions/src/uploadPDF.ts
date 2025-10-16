import { Readable } from 'stream';
import { logger } from 'firebase-functions/v2';
import type { drive_v3 } from 'googleapis';

interface uploadPDFParams {
  pdf: {
    base64: string;
    filename: string;
  };
  drive: drive_v3.Drive;
  folderId: string;
}

export const uploadPDF = async ({ pdf, drive, folderId }: uploadPDFParams) => {
  const { base64, filename } = pdf;
  logger.info('Uploading PDF:', filename);
  
  try {    
    // decode base64 string to buffer
    const buffer = Buffer.from(base64, 'base64');
    const path = `worksheets/${filename}`;
    const contentType = 'application/pdf';

    // upload file to google drive
    const file = await drive.files.create({
      requestBody: {
        name: path.split('/').pop(),
        parents: [folderId]
      },
      media: {
        mimeType: contentType,
        body: Readable.from(buffer)
      },
      supportsAllDrives: true
    });
    logger.info(`File uploaded to Google Drive with ID: ${file.data.id}`);
    return { pdfUrl: `https://drive.google.com/file/d/${file.data.id}/view` };
  } catch (error) {
    logger.error('Error transferring file to Google Drive:', error);
    throw error;
  }
};
