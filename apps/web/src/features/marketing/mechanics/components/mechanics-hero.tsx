import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Container, Section } from '@/components/layout';

export default function MechanicsHero() {
  const t = useTranslations('marketing.specialists.hero');
  return (
    <Section noTopPadding>
      <Container className="pt-5">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-success/10 text-success">
          <FontAwesomeIcon icon={faUsers} className="text-xl" />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-success">
          {t('eyebrow')}
        </p>

        <h1 className="text-3xl text-center font-bold tracking-tight md:text-4xl lg:text-5xl">
          {t('title')}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          {t('description')}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium shadow-sm">
            <FontAwesomeIcon icon={faAward} className="text-success" />
            {t('certificated')}
          </span>

          <span className="rounded-full bg-background px-4 py-2 text-sm font-medium shadow-sm">
            {t('experience')}
          </span>

          <span className="rounded-full bg-background px-4 py-2 text-sm font-medium shadow-sm">
            {t('equipment')}
          </span>

          <span className="rounded-full bg-background px-4 py-2 text-sm font-medium shadow-sm">
            {t('specialization')}
          </span>

          <span className="rounded-full bg-background px-4 py-2 text-sm font-medium shadow-sm">
            {t('workDirection')}
          </span>

          <span className="rounded-full bg-background px-4 py-2 text-sm font-medium shadow-sm">
            {t('averageExperience')}
          </span>
        </div>
      </Container>
    </Section>
  );
}
