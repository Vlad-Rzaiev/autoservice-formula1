import type { AbstractIntlMessages } from "next-intl";
import { getMessages } from "next-intl/server";

import type { TranslationModule } from "@/messages";

export async function getClientMessages(
  moduleNames: readonly TranslationModule[],
): Promise<AbstractIntlMessages> {
  const allMessages = await getMessages();

  const clientMessages: AbstractIntlMessages = {};

  for (const moduleName of moduleNames) {
    const moduleMessages = allMessages[moduleName];

    if (!moduleMessages) {
      throw new Error(`Translation module "${moduleName}" was not loaded.`);
    }

    clientMessages[moduleName] = moduleMessages;
  }

  return clientMessages;
}
