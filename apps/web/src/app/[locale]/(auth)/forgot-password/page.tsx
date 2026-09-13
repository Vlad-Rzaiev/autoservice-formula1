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
      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>{t('success-title')}</CardTitle>
            <CardDescription>{t('success-description')}</CardDescription>
          </CardHeader>

          <CardContent>
            <ButtonLink href={routes.auth.login} variant="ctaOutline">
              {t('go-login-btn')}
            </ButtonLink>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12">
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
    </div>
  );
}
