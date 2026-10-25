import {
  faBarcode,
  faCarSide,
  faGasPump,
  faGears,
  faGlobe,
  faPalette,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { BodyType, FuelType, Transmission } from '@autoservice/contracts';

interface CarTechnicalSpecificationsParams {
  vin: string;
  bodyType?: BodyType | null;
  fuelType?: FuelType | null;
  transmission?: Transmission | null;
  engine?: string | null;
  color?: string | null;
  countryOfRegistration?: string | null;
}

export interface CarTechnicalSpecification {
  key: string;
  label: string;
  value: string;
  icon: IconDefinition;
}

type Translate = (key: string) => string;

export function getCarTechnicalSpecifications(
  {
    vin,
    bodyType,
    fuelType,
    transmission,
    engine,
    color,
    countryOfRegistration,
  }: CarTechnicalSpecificationsParams,
  t: Translate,
): CarTechnicalSpecification[] {
  const specifications: {
    key: string;
    label: string;
    value: string | null | undefined;
    icon: IconDefinition;
  }[] = [
    {
      key: 'vin',
      label: t('vin'),
      value: vin,
      icon: faBarcode,
    },
    {
      key: 'bodyType',
      label: t('bodyType'),
      value: bodyType ? t(`body-types.${bodyType}`) : null,
      icon: faCarSide,
    },
    {
      key: 'fuelType',
      label: t('fuelType'),
      value: fuelType ? t(`fuel-types.${fuelType}`) : null,
      icon: faGasPump,
    },
    {
      key: 'transmission',
      label: t('transmission'),
      value: transmission ? t(`transmissions.${transmission}`) : null,
      icon: faGears,
    },
    {
      key: 'engine',
      label: t('engine'),
      value: engine,
      icon: faWrench,
    },
    {
      key: 'color',
      label: t('color'),
      value: color,
      icon: faPalette,
    },
    {
      key: 'countryOfRegistration',
      label: t('countryOfRegistration'),
      value: countryOfRegistration,
      icon: faGlobe,
    },
  ];

  return specifications.filter(
    (specification): specification is CarTechnicalSpecification =>
      typeof specification.value === 'string' &&
      specification.value.trim().length > 0,
  );
}
