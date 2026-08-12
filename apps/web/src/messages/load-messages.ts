import { translationModules } from '@/messages/modules';

type TranslationMessages = Record<string, unknown>;

export async function loadMessages(
  locale: string,
): Promise<TranslationMessages> {
  const loadedMessages: TranslationMessages = {};

  await Promise.all(
    translationModules.map(async (moduleName) => {
      const moduleMessages = (
        await import(`../messages/${locale}/${moduleName}.json`)
      ).default;

      loadedMessages[moduleName] = moduleMessages;
    }),
  );

  return loadedMessages;
}
