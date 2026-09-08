import { useTranslations } from 'next-intl';
import { Section, Container, SectionHeader } from '@/components/layout';
import { ContactsInfo } from '../contacts/components/contacts-info';
import { ContactsMap } from '../contacts/components/contacts-map';
import { Directions } from '../contacts/components/directions';

export default function MarketingContacts() {
  const t = useTranslations('marketing.contacts');

  return (
    <Section id="contacts">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          sectionTitle={t('title')}
          description={t('description')}
          eyebrowClassName="mr-auto"
        />

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <ContactsInfo />
          <ContactsMap />
        </div>

        <Directions />
      </Container>
    </Section>
  );
}
