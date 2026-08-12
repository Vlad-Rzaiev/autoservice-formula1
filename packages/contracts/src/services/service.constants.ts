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

export const serviceIconKeys = [
  'air-vent',
  'battery-charging',
  'car-front',
  'circle-dot',
  'circle-gauge',
  'cog',
  'disc-3',
  'droplets',
  'file-check-2',
  'fuel',
  'gauge',
  'package-search',
  'paintbrush',
  'rotate-ccw',
  'route',
  'scan-search',
  'settings',
  'sparkles',
  'thermometer',
  'wind',
  'wrench',
  'zap',
] as const;

export type ServiceIconKey = (typeof serviceIconKeys)[number];
