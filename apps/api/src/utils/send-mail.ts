import nodemailer, { type Transporter } from 'nodemailer';

import { SMTP } from '../config/smtp.constants.js';

interface SendMailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
}

interface MailTransport {
  transporter: Transporter;
  from: string;
}

let mailTransport: MailTransport | null = null;

const getSmtpConfig = (): SmtpConfig => {
  const smtpHost = process.env[SMTP.HOST];
  const smtpPortValue = process.env[SMTP.PORT];
  const smtpUser = process.env[SMTP.USER];
  const smtpPassword = process.env[SMTP.PASSWORD];
  const smtpFrom = process.env[SMTP.FROM];

  const smtpPort = Number(smtpPortValue);

  if (
    !smtpHost ||
    !smtpPortValue ||
    !Number.isInteger(smtpPort) ||
    smtpPort <= 0 ||
    !smtpUser ||
    !smtpPassword ||
    !smtpFrom
  ) {
    throw new Error('SMTP configuration is incomplete.');
  }

  return {
    host: smtpHost,
    port: smtpPort,
    user: smtpUser,
    password: smtpPassword,
    from: smtpFrom,
  };
};

const getMailTransport = (): MailTransport => {
  if (mailTransport) {
    return mailTransport;
  }

  const smtpConfig = getSmtpConfig();

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.port === 465,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.password,
    },
  });

  mailTransport = {
    transporter,
    from: smtpConfig.from,
  };

  return mailTransport;
};

export const sendMail = async ({
  to,
  subject,
  text,
  html,
}: SendMailParams): Promise<void> => {
  const { transporter, from } = getMailTransport();

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};
