'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/providers';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';

function EmailVerificationDialog() {
  const t = useTranslations('dashboard.email-verification-dialog');
  const { user } = useAuth();

  const [isDismissed, setIsDismissed] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const isOpen = Boolean(user && !user.emailVerified) && !isDismissed;

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

        <DialogFooter>
          <Button type="button" disabled={isSending} className="cursor-pointer">
            {t('resend-button')}
          </Button>
        </DialogFooter>

        {sendError && <p className="text-sm text-destructive"> {sendError} </p>}
      </DialogContent>
    </Dialog>
  );
}

export { EmailVerificationDialog };
