import nodemailer from 'nodemailer';

import { SMTP } from '../config/smtp.constants.js';

const smtpHost = process.env[SMTP.HOST];
const smtpPort = Number(process.env[SMTP.PORT]);
const smtpUser = process.env[SMTP.USER];
const smtpPassword = process.env[SMTP.PASSWORD];
const smtpFrom = process.env[SMTP.FROM];

if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword || !smtpFrom) {
  throw new Error('SMTP configuration is incomplete.');
}

const mailTransporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
});

interface SendMailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendMail = async ({
  to,
  subject,
  text,
  html,
}: SendMailParams): Promise<void> => {
  await mailTransporter.sendMail({
    from: smtpFrom,
    to,
    subject,
    text,
    html,
  });
};
