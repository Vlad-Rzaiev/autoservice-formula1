import { AppLocale } from '@autoservice/contracts';
import { sendMail } from '../../utils/send-mail.js';

const frontendUrl = process.env.FRONTEND_URL;

if (!frontendUrl) {
  throw new Error('FRONTEND_URL is not configured.');
}

const passwordResetEmailContent: Record<
  AppLocale,
  {
    subject: string;
    title: string;
    description: string;
    button: string;
    expiration: string;
    ignore: string;
    link: string;
  }
> = {
  uk: {
    subject: 'Скидання пароля — AutoService Formula 1',
    title: 'Скидання пароля',
    description:
      'Ви запросили скидання пароля для свого облікового запису AutoService Formula 1.',
    button: 'Скинути пароль',
    expiration: 'Посилання дійсне протягом 15 хвилин.',
    ignore:
      'Якщо ви не запитували скидання пароля, просто проігноруйте цей лист.',
    link: 'Якщо кнопка не працює, перейдіть за посиланням нижче:',
  },

  en: {
    subject: 'Password reset — AutoService Formula 1',
    title: 'Reset your password',
    description:
      'You requested a password reset for your AutoService Formula 1 account.',
    button: 'Reset password',
    expiration: 'This link is valid for 15 minutes.',
    ignore:
      'If you did not request a password reset, you can safely ignore this email.',
    link: 'If the button does not work, use the link below:',
  },

  pl: {
    subject: 'Resetowanie hasła — AutoService Formula 1',
    title: 'Resetowanie hasła',
    description:
      'Poproszono o zresetowanie hasła do Twojego konta AutoService Formula 1.',
    button: 'Zresetuj hasło',
    expiration: 'Ten link jest ważny przez 15 minut.',
    ignore:
      'Jeśli nie prosiłeś o zresetowanie hasła, możesz bezpiecznie zignorować tę wiadomość.',
    link: 'Jeśli przycisk nie działa, skorzystaj z poniższego linku:',
  },
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  locale: AppLocale,
): Promise<void> => {
  const content = passwordResetEmailContent[locale];

  const resetUrl = `${frontendUrl}/${locale}/reset-password?token=${encodeURIComponent(token)}`;

  const html = `
    <!DOCTYPE html>
    <html lang="${locale}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${content.title}</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f4f4f5;
          font-family: Arial, Helvetica, sans-serif;
          color: #18181b;
        "
      >
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="background-color: #f4f4f5; padding: 40px 16px;"
        >
          <tr>
            <td align="center">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  max-width: 560px;
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                "
              >
                <tr>
                  <td style="padding: 32px;">
                    <h1
                      style="
                        margin: 0 0 20px;
                        font-size: 24px;
                        line-height: 32px;
                        font-weight: 700;
                        color: #18181b;
                      "
                    >
                      ${content.title}
                    </h1>

                    <p
                      style="
                        margin: 0 0 24px;
                        font-size: 16px;
                        line-height: 24px;
                        color: #52525b;
                      "
                    >
                      ${content.description}
                    </p>

                    <table
                      role="presentation"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                    >
                      <tr>
                        <td
                          style="
                            border-radius: 8px;
                            background-color: #dc2626;
                          "
                        >
                          <a
                            href="${resetUrl}"
                            style="
                              display: inline-block;
                              padding: 12px 24px;
                              font-size: 16px;
                              line-height: 24px;
                              font-weight: 600;
                              color: #ffffff;
                              text-decoration: none;
                              border-radius: 8px;
                            "
                          >
                            ${content.button}
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p
                      style="
                        margin: 24px 0 8px;
                        font-size: 14px;
                        line-height: 20px;
                        color: #71717a;
                      "
                    >
                      ${content.link}
                    </p>

                    <p
                      style="
                        margin: 0;
                        font-size: 13px;
                        line-height: 20px;
                        word-break: break-all;
                      "
                    >
                      <a
                        href="${resetUrl}"
                        style="
                          color: #dc2626;
                          text-decoration: none;
                        "
                      >
                        ${resetUrl}
                      </a>
                    </p>

                    <p
                      style="
                        margin: 24px 0 8px;
                        font-size: 14px;
                        line-height: 20px;
                        color: #71717a;
                      "
                    >
                      ${content.expiration}
                    </p>

                    <p
                      style="
                        margin: 0;
                        font-size: 14px;
                        line-height: 20px;
                        color: #71717a;
                      "
                    >
                      ${content.ignore}
                    </p>

                    <hr
                      style="
                        margin: 32px 0 20px;
                        border: 0;
                        border-top: 1px solid #e4e4e7;
                      "
                    />

                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        line-height: 18px;
                        color: #a1a1aa;
                      "
                    >
                      AutoService Formula 1
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const text = [
    content.title,
    '',
    content.description,
    '',
    `${content.button}: ${resetUrl}`,
    '',
    content.expiration,
    '',
    content.ignore,
    '',
    'AutoService Formula 1',
  ].join('\n');

  await sendMail({
    to: email,
    subject: content.subject,
    text,
    html,
  });
};
