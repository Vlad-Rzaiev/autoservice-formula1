import { BrandLogo, LangSwitcher } from "@/components";

export default function AuthFooter() {
  return (
    <footer className="flex gap-3 py-4">
      <BrandLogo variant="footer" />

      <LangSwitcher />
    </footer>
  );
}
