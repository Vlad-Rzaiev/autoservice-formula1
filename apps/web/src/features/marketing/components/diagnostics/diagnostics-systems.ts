import {
  faCarBurst,
  faCarOn,
  faGasPump,
  faGear,
  faMicrochip,
  faOilCan,
  faShieldHalved,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons';

export const systems = [
  {
    key: 'engine',
    icon: faOilCan,
    translationKey: 'systems.items.engine',
  },
  {
    key: 'transmission',
    icon: faGear,
    translationKey: 'systems.items.transmission',
  },
  {
    key: 'absEsp',
    icon: faCarBurst,
    translationKey: 'systems.items.absEsp',
  },
  {
    key: 'airbags',
    icon: faShieldHalved,
    translationKey: 'systems.items.airbags',
  },
  {
    key: 'electronics',
    icon: faMicrochip,
    translationKey: 'systems.items.electronics',
  },
  {
    key: 'climate',
    icon: faSnowflake,
    translationKey: 'systems.items.climate',
  },
  {
    key: 'driverAssist',
    icon: faCarOn,
    translationKey: 'systems.items.driverAssist',
  },
  {
    key: 'fuelSystem',
    icon: faGasPump,
    translationKey: 'systems.items.fuelSystem',
  },
] as const;
