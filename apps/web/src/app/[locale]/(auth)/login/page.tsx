'use client';

import { FormEvent, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { useAuth } from '@/providers';

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
import { ButtonLink } from '@/components/common';
import { routes } from '@/config';

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const locale = useLocale();
  const currentLocale = isAppLocale(locale) ? locale : defaultLocale;
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailError(null);
    setPasswordError(null);
    setError(null);

    let hasError = false;

    if (!email.trim()) {
      setEmailError(t('email-required'));
      hasError = true;
    }

    if (!password) {
      setPasswordError(t('password-required'));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      setIsSubmitting(true);

      await login({
        email: email.trim(),
        password,
      });

      router.replace(`/${currentLocale}${routes.dashboard.home}`);
    } catch {
      setError(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <Field data-invalid={Boolean(emailError)}>
                <FieldLabel htmlFor="email">{t('email')}</FieldLabel>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t('email-placeholder')}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(emailError)}
                  disabled={isSubmitting}
                />

                {emailError && <FieldError>{emailError}</FieldError>}
              </Field>

              <Field data-invalid={Boolean(passwordError)}>
                <FieldLabel htmlFor="password">{t('password')}</FieldLabel>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder={t('password-placeholder')}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    aria-invalid={Boolean(passwordError)}
                    disabled={isSubmitting}
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? t('hide-password') : t('show-password')
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isSubmitting}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {passwordError && <FieldError>{passwordError}</FieldError>}
              </Field>

              {error && <FieldError>{error}</FieldError>}

              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                className="cursor-pointer"
              >
                {isSubmitting ? t('submitting') : t('submit')}
              </Button>

              <div className="flex justify-center">
                <ButtonLink
                  href={routes.auth.forgotPassword}
                  variant="inline"
                  className="hover:underline"
                >
                  {t('forgot-pwd')}
                </ButtonLink>
              </div>

              <div className="flex justify-center">
                <ButtonLink
                  href={routes.auth.register}
                  variant="inline"
                  className="hover:underline"
                >
                  {t('register')}
                </ButtonLink>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
