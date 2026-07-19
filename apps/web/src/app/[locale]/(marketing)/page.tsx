import Booking from "@/app/[locale]/(marketing)/_components/booking";
import CompletedWorks from "@/app/[locale]/(marketing)/_components/completed-works";
import Contacts from "@/app/[locale]/(marketing)/_components/contacts";
import Diagnostics from "@/app/[locale]/(marketing)/_components/diagnostics";
import Hero from "@/app/[locale]/(marketing)/_components/hero/hero";
import RepairProcess from "@/app/[locale]/(marketing)/_components/repair-process";
import Reviews from "@/app/[locale]/(marketing)/_components/reviews";
import Services from "@/app/[locale]/(marketing)/_components/services";
import Specialists from "@/app/[locale]/(marketing)/_components/specialists";
import Warranty from "@/app/[locale]/(marketing)/_components/warranty";
import WhyUs from "@/app/[locale]/(marketing)/_components/whyUs/whyUs";

export default function Home() {
  return (
    <main className="pt-(--marketing-header-height)">
      <Hero />
      <WhyUs />
      <Services />
      <Diagnostics />
      <CompletedWorks />
      <Specialists />
      <RepairProcess />
      <Warranty />
      <Reviews />
      <Booking />
      <Contacts />
    </main>
  );
}
