import { useTranslations } from 'next-intl';

export default function DashboardFooter() {
  const t = useTranslations('dashboard.footer');

  return (
    <footer className="border-t border-border/60 px-4 py-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} AutoService Formula 1. {t('rights')}
        </p>

        <p>
          {t('created-by')}
          <span className="font-medium text-foreground"> Vlad Rzaiev</span>
        </p>
      </div>
    </footer>
  );
}
