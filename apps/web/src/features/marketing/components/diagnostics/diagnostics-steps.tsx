import { CardGrid, IconCard } from '@/components/common';
import { steps } from './steps';
import { useTranslations } from 'next-intl';

export default function DiagnosticsSteps() {
  const t = useTranslations('marketing.diagnostics');

  return (
    <CardGrid columns="four">
      {steps.map((item) => (
        <li key={item.id}>
          <IconCard
            steps={item.id}
            icon={item.icon}
            title={t(item.title)}
            description={t(item.description)}
            className="
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-red-500/30
                hover:shadow-[0_20px_45px_-30px_rgba(220,38,38,0.45)]
                "
          />
        </li>
      ))}
    </CardGrid>
  );
}
