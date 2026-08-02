import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceOr404 } from "@/features/services/server/get-service-or-404";
import ServiceDetails from "@/app/[locale]/(marketing)/services/_components/service-details";
import { createServiceMetadata } from "@/features/services/server/create-service-metadata";
import { isAppLocale } from "@/i18n/locale-config";

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
