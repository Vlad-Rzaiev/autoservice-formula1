'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  faCircleCheck,
  faEnvelope,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonLink } from '@/components/common';
import { Container, Section } from '@/components/layout';
import { LoadingState, StateShell } from '@/components/states';
import { routes } from '@/config';
import { verifyEmail } from '@/features/auth';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const t = useTranslations('auth.verify-email');

  const token = searchParams.get('token');
  const verificationStarted = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || verificationStarted.current) {
      return;
    }

    verificationStarted.current = true;

    const verify = async () => {
      try {
        await verifyEmail(token);
        setIsVerified(true);
      } catch {
        setError(t('error'));
      } finally {
        setIsLoading(false);
      }
    };

    void verify();
  }, [token, t]);

  if (!token) {
    return (
      <Section className="w-full">
        <Container>
          <StateShell
            title={t('pending-title')}
            description={t('pending-description')}
            variant="default"
            icon={
              <FontAwesomeIcon
                icon={faEnvelope}
                className="shrink-0 text-2xl"
              />
            }
          />
        </Container>
      </Section>
    );
  }

  if (isLoading) {
    return (
      <Section className="w-full">
        <Container>
          <LoadingState title={t('verifying')} className="my-0" />
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="w-full">
        <Container>
          <StateShell
            title={t('title')}
            description={error}
            variant="error"
            icon={
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="shrink-0 text-2xl"
              />
            }
            actions={
              <ButtonLink href={routes.auth.login} variant="ctaOutline">
                {t('go-login-btn')}
              </ButtonLink>
            }
          />
        </Container>
      </Section>
    );
  }

  if (isVerified) {
    return (
      <Section className="w-full">
        <Container>
          <StateShell
            title={t('success-title')}
            description={t('success-description')}
            variant="default"
            icon={
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="shrink-0 text-2xl"
              />
            }
            actions={
              <ButtonLink href={routes.auth.login} variant="ctaOutline">
                {t('go-login-btn')}
              </ButtonLink>
            }
          />
        </Container>
      </Section>
    );
  }

  return null;
}
