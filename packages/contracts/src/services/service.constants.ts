export const serviceCategories = [
  'additional',
  'bodywork',
  'chassis-and-steering',
  'climate',
  'diagnostics',
  'electrical',
  'engine-and-transmission',
  'maintenance',
  'wheels',
] as const;

export type ServiceCategory = (typeof serviceCategories)[number];
