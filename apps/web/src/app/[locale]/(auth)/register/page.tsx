'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
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
import { Container, Section } from '@/components/layout';
import { ButtonLink } from '@/components/common';
import { routes } from '@/config';
import { registerUser } from '@/features/auth';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  const router = useRouter();
  const locale = useLocale();
  const currentLocale = isAppLocale(locale) ? locale : defaultLocale;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFirstNameError(null);
    setLastNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setError(null);

    let hasError = false;

    if (!email.trim()) {
      setEmailError(t('email-required'));
      hasError = true;
    }

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

    if (!confirmPassword) {
      setConfirmPasswordError(t('password-confirm-required'));
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(t('password-mismatch'));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      setIsSubmitting(true);

      await registerUser({
        firstName: firstName.trim() || null,
        lastName: lastName.trim() || null,
        email: email.trim(),
        password,
        locale: currentLocale,
      });

      router.push(`/${locale}${routes.auth.verifyEmail}`);
    } catch {
      setError(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className="w-full">
      <Container className="flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} noValidate>
              <FieldGroup>
                <Field data-invalid={Boolean(firstNameError)}>
                  <FieldLabel htmlFor="first-name">
                    {t('first-name')}
                  </FieldLabel>

                  <Input
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder={t('first-name-placeholder')}
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Field>

                <Field data-invalid={Boolean(lastNameError)}>
                  <FieldLabel htmlFor="last-name">{t('last-name')}</FieldLabel>

                  <Input
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder={t('last-name-placeholder')}
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Field>

                <Field data-invalid={Boolean(emailError)}>
                  <FieldLabel htmlFor="email">
                    {t('email')} <span aria-hidden="true">*</span>
                  </FieldLabel>

                  <Input
                    id="email"
                    name="email"
                    type="email"
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
                  <FieldLabel htmlFor="password">
                    {t('password')} <span aria-hidden="true">*</span>
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
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

                <Field data-invalid={Boolean(confirmPasswordError)}>
                  <FieldLabel htmlFor="confirm-password">
                    {t('confirm-password')} <span aria-hidden="true">*</span>
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder={t('confirm-password-placeholder')}
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
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
                  disabled={isSubmitting}
                  className="cursor-pointer"
                >
                  {isSubmitting ? t('submitting') : t('submit')}
                </Button>

                <div className="flex justify-center">
                  <ButtonLink
                    href={routes.auth.login}
                    variant="inline"
                    className="hover:underline"
                  >
                    {t('login')}
                  </ButtonLink>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
