'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { resetPassword } from '@/features/auth';
import { ButtonLink } from '@/components/common';
import { routes } from '@/config';

export default function ResetPasswordPage() {
  const t = useTranslations('auth.reset-pwd');

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setIsSuccess(false);

    if (!token) {
      setError(t('invalid-token'));
      return;
    }

    let hasError = false;

    if (!password) {
      setPasswordError(t('password-required'));
      hasError = true;
    } else if (password.length < 12) {
      setPasswordError(t('password-min'));
      hasError = true;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError(t('password-lowercase'));
      hasError = true;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError(t('password-uppercase'));
      hasError = true;
    } else if (!/\d/.test(password)) {
      setPasswordError(t('password-number'));
      hasError = true;
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      setPasswordError(t('password-special'));
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(t('password-mismatch'));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      setIsSubmitting(true);

      await resetPassword({
        token,
        password,
      });

      setIsSuccess(true);
      setPassword('');
      setConfirmPassword('');
    } catch {
      setError(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-8 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t('success-title')}</CardTitle>
            <CardDescription>{t('success-description')}</CardDescription>
          </CardHeader>
        </Card>

        <ButtonLink href={routes.auth.login} variant="ctaOutline">
          {t('go-login-btn')}
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <Field data-invalid={Boolean(passwordError)}>
                <FieldLabel htmlFor="password">{t('password')}</FieldLabel>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
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

              <Field data-invalid={Boolean(confirmPasswordError)}>
                <FieldLabel htmlFor="confirm-password">
                  {t('confirm-password')}
                </FieldLabel>

                <div className="relative">
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    aria-invalid={Boolean(confirmPasswordError)}
                    disabled={isSubmitting}
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    aria-label={
                      showConfirmPassword
                        ? t('hide-password')
                        : t('show-password')
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isSubmitting}
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {confirmPasswordError && (
                  <FieldError>{confirmPasswordError}</FieldError>
                )}
              </Field>

              {error && <FieldError>{error}</FieldError>}

              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={isSubmitting || !token}
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
