import { notFound } from "next/navigation";
import { ServiceDto } from "@autoservice/contracts";
import { getServiceBySlug } from "@/app/[locale]/(marketing)/services/api/get-service-by-slug";
import { isApiNotFoundError } from "@/lib/api/is-api-not-found-error";

export const getServiceOr404 = async (slug: string): Promise<ServiceDto> => {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    notFound();
  }

  try {
    const service = await getServiceBySlug(normalizedSlug);

    return service;
  } catch (err: unknown) {
    if (isApiNotFoundError(err)) {
      notFound();
    }

    throw err;
  }
};
