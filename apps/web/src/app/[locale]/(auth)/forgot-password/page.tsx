'use client';
import { FormEvent, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/components/ui';
import { Container, Section } from '@/components/layout';
import { requestPasswordReset } from '@/features/auth';
import { ButtonLink } from '@/components/common';
import { routes } from '@/config';

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgot-pwd');
  const locale = useLocale();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setIsSuccess(false);

    if (!email.trim()) {
      setError(t('email-required'));
      return;
    }

    try {
      setIsSubmitting(true);
      await requestPasswordReset({ email: email.trim(), locale });
      setIsSuccess(true);
      setEmail('');
    } catch {
      setError(t('email-invalid'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Section className="w-full">
        <Container className="flex items-center justify-center">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>{t('success-title')}</CardTitle>
              <CardDescription>{t('success-description')}</CardDescription>
            </CardHeader>

            <CardContent className="flex justify-center">
              <ButtonLink href={routes.auth.login} variant="ctaOutline">
                {t('go-login-btn')}
              </ButtonLink>
            </CardContent>
          </Card>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="w-full">
      <Container className="flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} noValidate>
              <FieldGroup>
                <Field data-invalid={Boolean(error)}>
                  <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t('email-placeholder')}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-invalid={Boolean(error)}
                    disabled={isSubmitting}
                  />
                  {error && <FieldError>{error}</FieldError>}
                </Field>
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                  className="cursor-pointer"
                >
                  {isSubmitting ? t('submitting') : t('submit')}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
