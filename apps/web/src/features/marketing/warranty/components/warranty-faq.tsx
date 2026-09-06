import { Container, Section, SectionHeader } from '@/components/layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui';
import { useTranslations } from 'next-intl';

export default function WarrantyFaq() {
  const t = useTranslations('warranty.faq');

  const questions = [
    'scope',
    'period',
    'parts',
    'problem',
    'externalService',
  ] as const;

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          sectionTitle={t('title')}
          description={t('description')}
        />

        <Accordion className="mt-10">
          {questions.map((question) => (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger>
                {t(`questions.${question}.question`)}
              </AccordionTrigger>

              <AccordionContent>
                {t(`questions.${question}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
