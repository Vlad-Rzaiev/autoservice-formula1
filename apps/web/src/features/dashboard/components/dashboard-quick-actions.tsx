import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserDto } from '@autoservice/contracts';
import { Container, Section } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';
import { dashboardQuickActions } from '../config/dashboard-quick-actions';

export default function DashboardQuickActions({ user }: UserDto) {
  const t = useTranslations('dashboard.home.quick-actions');

  if (!user) {
    return null;
  }

  const actions = dashboardQuickActions.filter((action) =>
    action.roles.includes(user.role),
  );

  return (
    <Section className="space-y-4">
      <Container>
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight">{t('title')}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Card
                className="
                    h-full
                    border-border/60
                    shadow-[0_4px_8px_rgb(0_0_0/0.06),0_12px_28px_rgb(0_0_0/0.12)]
                    transition-[transform,box-shadow,border-color]
                    duration-200
                    group-hover:-translate-y-1
                    group-hover:border-primary/40
                    group-hover:shadow-[0_8px_16px_rgb(0_0_0/0.08),0_20px_40px_rgb(0_0_0/0.16)]
                    dark:border-white/10
                    dark:shadow-[0_2px_4px_rgb(0_0_0/0.35),0_12px_28px_rgb(0_0_0/0.45),inset_0_1px_0_rgb(255_255_255/0.06)]
                    dark:group-hover:border-white/20
                    dark:group-hover:shadow-[0_8px_16px_rgb(0_0_0/0.4),0_24px_44px_rgb(0_0_0/0.55),inset_0_1px_0_rgb(255_255_255/0.10)]
                "
              >
                <CardContent className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FontAwesomeIcon
                      icon={action.icon}
                      className="size-5"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold">{t(action.labelKey)}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t(action.descriptionKey)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
