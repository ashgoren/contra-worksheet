import nodemailer from 'nodemailer'
import { defineSecret } from 'firebase-functions/params';
import { logger } from 'firebase-functions/v2';
import { formatDateTime } from './utils';

interface SendEmailProps {
  emailConfig: ReturnType<typeof defineSecret>;
  pdfUrl: string;
  date: string;
}

export const sendEmail = async ({ emailConfig, pdfUrl, date }: SendEmailProps) => {
  const { from, to, aws_smtp_user, aws_smtp_password, aws_smtp_endpoint } = JSON.parse(emailConfig.value());
  logger.info('from', from, 'to', to, 'aws_smtp_endpoint', aws_smtp_endpoint, 'aws_smtp_user', aws_smtp_user, 'aws_smtp_password (length)', aws_smtp_password.length);

  const mailTransport = nodemailer.createTransport({
    host: aws_smtp_endpoint,
    port: 587,
    auth: {
      user: aws_smtp_user,
      pass: aws_smtp_password
    }
  });

  logger.info('Sending email', { from, to });
  try {
    mailTransport.sendMail({
      from,
      to,
      subject: `PCDC Contra Worksheet - ${date}`,
      text: `Worksheet for ${date} submitted at ${formatDateTime(new Date())}: ${pdfUrl}`
    });
    logger.info(`Email sent successfully to ${to}`);
  } catch (error) {
    logger.error('Error sending email', error);
    throw error;
  }
};
