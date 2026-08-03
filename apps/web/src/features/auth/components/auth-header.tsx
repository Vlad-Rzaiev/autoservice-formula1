import { BrandLogo } from "@/components/common";
import { ThemeSwitcher } from "@/components/theme";

export default function AuthHeader() {
  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        flex gap-4 items-center justify-center py-4
        border-b border-black/5
        bg-background/90
        shadow-[0_12px_35px_-24px_rgba(15,23,42,0.55)]
        backdrop-blur-xl
        dark:border-white/10
      "
    >
      <BrandLogo />

      <ThemeSwitcher />
    </header>
  );
}
