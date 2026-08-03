import {
  MarketingBooking,
  MarketingCompletedWorks,
  MarketingContacts,
  MarketingDiagnostics,
  MarketingHero,
  MarketingRepairProcess,
  MarketingReviews,
  MarketingServices,
  MarketingSpecialists,
  MarketingWarranty,
  MarketingWhyUs,
} from "@/features/marketing";

export default function MarketingHome() {
  return (
    <>
      <MarketingHero />
      <MarketingWhyUs />
      <MarketingServices />
      <MarketingDiagnostics />
      <MarketingCompletedWorks />
      <MarketingSpecialists />
      <MarketingRepairProcess />
      <MarketingWarranty />
      <MarketingReviews />
      <MarketingBooking />
      <MarketingContacts />
    </>
  );
}
