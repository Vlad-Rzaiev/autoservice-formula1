'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { useAuth } from '@/providers';
import { resendVerificationEmail } from '../api/auth-api';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';
import { ButtonLoader } from '@/components/common';
import {
  RESEND_COOLDOWN_SECONDS,
  RESEND_COOLDOWN_STORAGE_KEY,
} from '../constants';

function EmailVerificationDialog() {
  const t = useTranslations('dashboard.email-verification-dialog');

  const locale = useLocale();
  const currentLocale = isAppLocale(locale) ? locale : defaultLocale;

  const { user, accessToken } = useAuth();

  const [isDismissed, setIsDismissed] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState(false);

  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const isOpen = Boolean(user && !user.emailVerified) && !isDismissed;

  const resendCooldownStorageKey = user
    ? `${RESEND_COOLDOWN_STORAGE_KEY}:${user.userId}`
    : RESEND_COOLDOWN_STORAGE_KEY;

  useEffect(() => {
    if (!user) {
      return;
    }

    const storedCooldownUntil = window.localStorage.getItem(
      resendCooldownStorageKey,
    );

    if (!storedCooldownUntil) {
      return;
    }

    const parsedCooldownUntil = Number(storedCooldownUntil);

    if (parsedCooldownUntil > Date.now()) {
      const timer = window.setTimeout(() => {
        setCooldownUntil(parsedCooldownUntil);
      }, 0);

      return () => {
        window.clearTimeout(timer);
      };
    }

    window.localStorage.removeItem(resendCooldownStorageKey);
  }, [resendCooldownStorageKey, user]);

  useEffect(() => {
    if (!cooldownUntil) {
      return;
    }

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [cooldownUntil]);

  const cooldown = cooldownUntil
    ? Math.max(0, Math.ceil((cooldownUntil - now) / 1000))
    : 0;

  const minutes = Math.floor(cooldown / 60);
  const seconds = cooldown % 60;

  const handleResend = async () => {
    if (!accessToken) {
      setSendError(t('resend-error'));
      return;
    }

    setSendError(null);
    setSendSuccess(false);
    setIsSending(true);

    try {
      await resendVerificationEmail(accessToken, currentLocale);

      setSendSuccess(true);

      const nextCooldownUntil = Date.now() + RESEND_COOLDOWN_SECONDS * 1000;

      window.localStorage.setItem(
        resendCooldownStorageKey,
        String(nextCooldownUntil),
      );

      setCooldownUntil(nextCooldownUntil);
      setNow(Date.now());
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        const retryAfter = Number(error.response.headers['retry-after']);

        if (Number.isFinite(retryAfter) && retryAfter > 0) {
          const nextCooldownUntil = Date.now() + retryAfter * 1000;

          window.localStorage.setItem(
            resendCooldownStorageKey,
            String(nextCooldownUntil),
          );

          setCooldownUntil(nextCooldownUntil);
          setNow(Date.now());
        }

        setSendError(t('resend-rate-limit'));
        return;
      }

      setSendError(t('resend-error'));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setIsDismissed(true);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-col">
          <Button
            type="button"
            disabled={isSending || cooldown > 0}
            onClick={() => void handleResend()}
            className="cursor-pointer"
          >
            {isSending ? (
              <ButtonLoader>{t('resending')}</ButtonLoader>
            ) : cooldown > 0 ? (
              minutes > 0 ? (
                t('resend-countdown-minutes', {
                  minutes,
                  seconds,
                })
              ) : (
                t('resend-countdown-seconds', {
                  seconds,
                })
              )
            ) : (
              t('resend-button')
            )}
          </Button>

          {sendSuccess && (
            <p className="text-sm text-success">{t('resend-success')}</p>
          )}

          {sendError && <p className="text-sm text-destructive">{sendError}</p>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { EmailVerificationDialog };
