import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isAppLocale } from '@/i18n/locale-config';
import {
  createMechanicMetadata,
  getMechanicOr404,
  MechanicContainer,
} from '@/features/marketing';

export interface MechanicPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: MechanicPageProps): Promise<Metadata> {
  const { locale, id } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const mechanic = await getMechanicOr404(id);

  return createMechanicMetadata({ locale, mechanic });
}

export default async function MechanicPage({ params }: MechanicPageProps) {
  const { id } = await params;

  return <MechanicContainer mechanicId={id} />;
}
