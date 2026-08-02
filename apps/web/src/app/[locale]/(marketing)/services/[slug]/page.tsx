import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isAppLocale } from "@/i18n/locale-config";
import {
  getServiceOr404,
  ServiceDetails,
  createServiceMetadata,
} from "@/features/marketing/services";

export interface ServicePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const service = await getServiceOr404(slug);

  return createServiceMetadata({ locale, service });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  const service = await getServiceOr404(slug);

  return <ServiceDetails service={service} />;
}
