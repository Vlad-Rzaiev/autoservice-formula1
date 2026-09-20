import { AppLocale } from '@autoservice/contracts';
import { sendMail } from '../../utils/send-mail.js';
const frontendUrl = process.env.FRONTEND_URL;
if (!frontendUrl) {
  throw new Error('FRONTEND_URL is not configured.');
}
const emailVerificationContent: Record<
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
    subject: 'Підтвердження email — AutoService Formula 1',
    title: 'Підтвердіть свою електронну адресу',
    description:
      'Дякуємо за реєстрацію в AutoService Formula 1. Підтвердіть свою електронну адресу, щоб завершити створення облікового запису.',
    button: 'Підтвердити email',
    expiration: 'Посилання дійсне протягом 24 годин.',
    ignore:
      'Якщо ви не створювали обліковий запис, просто проігноруйте цей лист.',
    link: 'Якщо кнопка не працює, перейдіть за посиланням нижче:',
  },
  en: {
    subject: 'Email verification — AutoService Formula 1',
    title: 'Verify your email address',
    description:
      'Thank you for registering with AutoService Formula 1. Please verify your email address to complete your account registration.',
    button: 'Verify email address',
    expiration: 'This link is valid for 24 hours.',
    ignore:
      'If you did not create an account, you can safely ignore this email.',
    link: 'If the button does not work, use the link below:',
  },
  pl: {
    subject: 'Weryfikacja adresu email — AutoService Formula 1',
    title: 'Potwierdź swój adres email',
    description:
      'Dziękujemy za rejestrację w AutoService Formula 1. Potwierdź swój adres email, aby zakończyć rejestrację konta.',
    button: 'Potwierdź adres email',
    expiration: 'Ten link jest ważny przez 24 godziny.',
    ignore:
      'Jeśli nie zakładałeś konta, możesz bezpiecznie zignorować tę wiadomość.',
    link: 'Jeśli przycisk nie działa, skorzystaj z poniższego linku:',
  },
};
export const sendEmailVerificationEmail = async (
  email: string,
  token: string,
  locale: AppLocale,
): Promise<void> => {
  const content = emailVerificationContent[locale];
  const verificationUrl = `${frontendUrl}/${locale}/verify-email?token=${encodeURIComponent(token)}`;
  const html = `
    <!DOCTYPE html>
    <html lang="${locale}">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${content.title}</title>
        </head>
        <body style=" margin: 0; padding: 0; background-color: #f4f4f5; font-family: Arial, Helvetica, sans-serif; color: #18181b; " >
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f5; padding: 40px 16px;" >
                <tr>
                    <td align="center">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style=" max-width: 560px; background-color: #ffffff; border-radius: 12px; overflow: hidden; " >
                            <tr>
                                <td style="padding: 32px;">
                                    <h1 style=" margin: 0 0 20px; font-size: 24px; line-height: 32px; font-weight: 700; color: #18181b; " > ${content.title} </h1>
                                    <p style=" margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #52525b; " > ${content.description} </p>
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" >
                                        <tr>
                                            <td style=" border-radius: 8px; background-color: #dc2626; " >
                                                <a href="${verificationUrl}" style=" display: inline-block; padding: 12px 24px; font-size: 16px; line-height: 24px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px; " > ${content.button}
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    <p style=" margin: 24px 0 8px; font-size: 14px; line-height: 20px; color: #71717a; " > ${content.link} </p>
                                    <p style=" margin: 0; font-size: 13px; line-height: 20px; word-break: break-all; " >
                                        <a href="${verificationUrl}" style=" color: #dc2626; text-decoration: none; " > ${verificationUrl} </a>
                                    </p>
                                    <p style=" margin: 24px 0 8px; font-size: 14px; line-height: 20px; color: #71717a; " > ${content.expiration} </p>
                                    <p style=" margin: 0; font-size: 14px; line-height: 20px; color: #71717a; " > ${content.ignore} </p>
                                    <hr style=" margin: 32px 0 20px; border: 0; border-top: 1px solid #e4e4e7; " />
                                    <p style=" margin: 0; font-size: 12px; line-height: 18px; color: #a1a1aa; " > AutoService Formula 1 </p>
                                </td>
                            </tr>
                        /table>
                    </td>
                </tr>
            </table>
        </body>
    </html> `;
  const text = [
    content.title,
    '',
    content.description,
    '',
    `${content.button}: ${verificationUrl}`,
    '',
    content.expiration,
    '',
    content.ignore,
    '',
    'AutoService Formula 1',
  ].join('\n');
  await sendMail({ to: email, subject: content.subject, text, html });
};
