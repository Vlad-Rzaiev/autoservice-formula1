import { BrandLogo } from '@/components/common';
import { LangSwitcher } from '@/components/locale';

export default function AuthFooter() {
  return (
    <footer className="mt-auto flex justify-center gap-3 py-4">
      <BrandLogo variant="footer" />

      <LangSwitcher />
    </footer>
  );
}
