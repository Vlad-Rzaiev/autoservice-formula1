import {
  MarketingBooking,
  MarketingCompletedWorks,
  MarketingContacts,
  MarketingDiagnostics,
  MarketingHero,
  MarketingRepairProcess,
  MarketingReviews,
  MarketingServices,
  MarketingMechanics,
  MarketingWarranty,
  MarketingWhyUs,
} from '@/features/marketing';

export default function MarketingHome() {
  return (
    <>
      <MarketingHero />
      <MarketingWhyUs />
      <MarketingServices />
      <MarketingDiagnostics />
      <MarketingCompletedWorks />
      <MarketingMechanics />
      <MarketingRepairProcess />
      <MarketingWarranty />
      <MarketingReviews />
      <MarketingBooking />
      <MarketingContacts />
    </>
  );
}
