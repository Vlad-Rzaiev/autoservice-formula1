import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import { CreateCarForm } from '@/features/dashboard';

export default function CreateCarPage() {
  const t = useTranslations('dashboard.cars');
  return (
    <>
      <Section className="mt-4">
        <Container className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </Container>
      </Section>

      <CreateCarForm />
    </>
  );
}
