import { useTranslations } from 'next-intl';
import { Container, Section, SectionTitle } from '@/components/layout';
import { SpecializationDto, WorkDirectionDto } from '@autoservice/contracts';
import { CardGrid, IconItemCard } from '@/components/common';
import {
  faAward,
  faScrewdriverWrench,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';

export interface MechanicAboutProps {
  description: string | undefined;
  experience: number;
  specializations: SpecializationDto[];
  workDirections: WorkDirectionDto[];
}

export default function MechanicAbout({
  description,
  experience,
  specializations,
  workDirections,
}: MechanicAboutProps) {
  const t = useTranslations('marketing.specialists.mechanic');
  return (
    <Section>
      <Container>
        <SectionTitle>{t('about')}</SectionTitle>

        <div>
          <p className="mt-5 md:mt-8 lg:mt-10 text-2xl text-center">
            {description}
          </p>

          <CardGrid className="mt-5 md:mt-8 lg:mt-10 ">
            <li>
              <IconItemCard icon={faAward}>
                {t('experienceYears', {
                  years: experience,
                })}
              </IconItemCard>
            </li>
            <li>
              <IconItemCard icon={faWrench}>
                {t('specializations', {
                  specializations: specializations.length,
                })}
              </IconItemCard>
            </li>
            <li>
              <IconItemCard icon={faScrewdriverWrench}>
                {t('workDirections', {
                  workDirections: workDirections.length,
                })}
              </IconItemCard>
            </li>
          </CardGrid>
        </div>
      </Container>
    </Section>
  );
}
