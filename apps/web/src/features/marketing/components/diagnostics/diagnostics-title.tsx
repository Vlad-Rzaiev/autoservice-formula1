import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/layout';

export default function DiagnosticsTitle() {
  const t = useTranslations('marketing.diagnostics');
  return (
    <div className="mx-auto mb-10 md:mb-12 lg:mb-14 max-w-3xl text-center">
      <SectionTitle>{t('title')}</SectionTitle>

      <p
        className="
                  mx-auto mt-5 max-w-2xl
                  text-base leading-7 text-muted-foreground
                  sm:text-lg sm:leading-8
                "
      >
        {t('description')}
      </p>
    </div>
  );
}
