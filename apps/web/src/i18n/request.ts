import { getRequestConfig } from "next-intl/server";
import { loadMessages } from "@/messages/load-messages";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale =
    requestedLocale && hasLocale(routing.locales, requestedLocale)
      ? requestedLocale
      : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
