import { Cta } from '@/components/common';
import {
  WarrantyClaim,
  WarrantyConditions,
  WarrantyCoverage,
  WarrantyExclusions,
  WarrantyFaq,
  WarrantyHero,
  WarrantyPeriod,
} from '@/features/marketing';

export default function WarrantyPage() {
  return (
    <>
      <WarrantyHero />
      <WarrantyCoverage />
      <WarrantyPeriod />
      <WarrantyConditions />
      <WarrantyExclusions />
      <WarrantyClaim />
      <WarrantyFaq />
      <Cta />
    </>
  );
}
