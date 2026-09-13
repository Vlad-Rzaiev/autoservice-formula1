interface SendMailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

interface BrevoSendEmailResponse {
  messageId: string;
}

export const sendMail = async ({
  to,
  subject,
  text,
  html,
}: SendMailParams): Promise<void> => {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const brevoFrom = process.env.BREVO_FROM;

  if (!brevoApiKey || !brevoFrom) {
    throw new Error('Brevo API configuration is incomplete.');
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': brevoApiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { email: brevoFrom },
      to: [{ email: to }],
      subject,
      textContent: text,
      ...(html ? { htmlContent: html } : {}),
      params: {
        trackClicks: false,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Brevo API request failed with status ${response.status}: ${errorBody}`,
    );
  }

  const result = (await response.json()) as BrevoSendEmailResponse;
  if (!result.messageId) {
    throw new Error('Brevo API returned an invalid response.');
  }
};
