'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { useClient } from '@/features/dashboard/clients/api/use-client';
import { Container } from '@/components/layout';
import { QueryState } from '@/components/states';
import ClientPageSkeleton from './client-page-skeleton';
import ClientHeader from './client-details-header';
import ClientStatCards from './client-details-stat-cards';
import ClientInfo from './client-details-info';
import ClientCarsList from './client-details-cars-list';
import ClientHistory from './client-details-history';
import { ButtonLink } from '@/components/common';
import { routes } from '@/config';
import { Badge } from '@/components/ui';

interface ClientDetailsProps {
  id: string;
}

export default function ClientDetails({ id }: ClientDetailsProps) {
  const t = useTranslations('clients.client-page');

  const {
    data: client,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useClient(id);

  return (
    <>
      <Container className="flex justify-between mt-20 mb-6">
        <ButtonLink
          variant="link"
          href={routes.dashboard.clients.list}
          className="p-0"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          {t('back-to-list')}
        </ButtonLink>

        {client && (
          <Badge variant={client.emailVerified ? 'success' : 'error'}>
            {client.emailVerified ? t('verified') : t('unverified')}
          </Badge>
        )}
      </Container>

      <QueryState
        isPending={isPending}
        isError={isError}
        isEmpty={Boolean(!client)}
        loadingMessage={t('loading-state.loading-title')}
        loadingDescription={t('loading-state.loading-description')}
        loadingContent={<ClientPageSkeleton />}
        errorMessage={t('loading-state.error-title')}
        errorDescription={t('loading-state.error-description')}
        retryLabel={t('loading-state.retry')}
        isRetrying={isFetching}
        onRetry={() => void refetch()}
        emptyMessage={t('loading-state.empty-title')}
        emptyDescription={t('loading-state.empty-description')}
        emptyIcon={faScrewdriverWrench}
      >
        {client && (
          <>
            <ClientHeader
              photo={client.photo}
              firstName={client.firstName}
              lastName={client.lastName}
              email={client.email}
              userId={client.userId}
              phone={client.phone}
            />

            <ClientStatCards clientId={client._id} />

            <ClientInfo client={client} />

            <ClientCarsList clientId={client._id} />

            <ClientHistory clientId={client._id} />
          </>
        )}
      </QueryState>
    </>
  );
}
