import { CreateCompletedWorkInput } from '@autoservice/contracts';

export function createCompletedWorkPayloadFixture(
  overrides: Partial<CreateCompletedWorkInput> = {},
): CreateCompletedWorkInput {
  const defaultPayload: CreateCompletedWorkInput = {
    slug: 'audi-a4-engine-oil-leak',
    car: {
      make: 'audi',
      model: 'A4',
      year: 2019,
    },
    category: {
      slug: 'engine',
    },
    translations: {
      uk: {
        customerRequest:
          "Під автомобілем з'явилися плями оливи, а рівень моторної оливи поступово знижується.",
        diagnosis:
          'Виявлено витік моторної оливи через ущільнення корпусу масляного фільтра.',
        performedWork: [
          'Діагностика системи змащення',
          'Заміна ущільнювальних елементів',
          'Очищення моторного відсіку',
          'Перевірка герметичності системи',
        ],
        result:
          'Витік оливи усунуто. Герметичність системи перевірено після ремонту.',
      },
      en: {
        customerRequest:
          'Oil spots appeared under the vehicle and the engine oil level was gradually decreasing.',
        diagnosis:
          'An engine oil leak was found at the oil filter housing seal.',
        performedWork: [
          'Lubrication system diagnostics',
          'Replacement of sealing components',
          'Cleaning of the engine compartment',
          'System leak inspection',
        ],
        result:
          'The oil leak has been eliminated. The system was checked for leaks after the repair.',
      },
      pl: {
        customerRequest:
          'Pod samochodem pojawiły się plamy oleju, a poziom oleju silnikowego stopniowo się obniżał.',
        diagnosis:
          'Stwierdzono wyciek oleju silnikowego przez uszczelnienie obudowy filtra oleju.',
        performedWork: [
          'Diagnostyka układu smarowania',
          'Wymiana elementów uszczelniających',
          'Czyszczenie komory silnika',
          'Kontrola szczelności układu',
        ],
        result:
          'Wyciek oleju został usunięty. Po naprawie sprawdzono szczelność układu.',
      },
    },
    images: {
      before: [
        'https://res.cloudinary.com/dquehaxrj/image/upload/v1786991385/engine-before_wihvwm.jpg',
      ],
      after: [
        'https://res.cloudinary.com/dquehaxrj/image/upload/v1786991385/engine-after_xbmu82.jpg',
      ],
    },
    featured: true,
    isActive: true,
  };

  return {
    ...defaultPayload,
    ...overrides,
    translations: {
      ...defaultPayload.translations,
      ...overrides.translations,
    },
  };
}
