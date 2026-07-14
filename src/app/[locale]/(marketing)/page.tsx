import Hero from "@/app/[locale]/(marketing)/_components/hero/hero";
import Features from "@/app/[locale]/(marketing)/_components/features";
import Workflow from "@/app/[locale]/(marketing)/_components/workflow";
import Roles from "@/app/[locale]/(marketing)/_components/roles";
import Faq from "@/app/[locale]/(marketing)/_components/faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Workflow />
      <Roles />
      <Faq />
    </main>
  );
}
