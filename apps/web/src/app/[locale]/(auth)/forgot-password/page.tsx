import { getTranslations } from 'next-intl/server';
import { DevelopmentPlaceholder } from '@/components/common';
import { routes } from '@/config';

export default async function ForgotPasswordPage() {
  const t = await getTranslations('auth');

  return (
    <DevelopmentPlaceholder
      title={t('forgot-pwd.title')}
      description={t('forgot-pwd.dev')}
      linkHref={routes.marketing.home}
      linkText={t('forgot-pwd.back-to-main')}
    />
  );
}
