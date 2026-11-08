'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faEye,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { IconButton } from '@/components/common';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import type { ClientDto, ClientListPagination } from '@autoservice/contracts';
import { routes } from '@/config';

interface ClientsContentProps {
  clients: ClientDto[];
  pagination: ClientListPagination;
  isFetching: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

function getClientName(client: ClientDto, fallback: string): string {
  const fullName = [client.firstName, client.lastName]
    .filter(Boolean)
    .join(' ');

  return fullName || fallback;
}

function getClientInitials(client: ClientDto): string {
  const firstInitial = client.firstName?.[0] ?? '';
  const lastInitial = client.lastName?.[0] ?? '';

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

export default function ClientsContent({
  clients,
  pagination,
  isFetching,
  onPrevious,
  onNext,
}: ClientsContentProps) {
  const t = useTranslations('clients');

  const firstItem =
    pagination.totalItems === 0
      ? 0
      : (pagination.page - 1) * pagination.limit + 1;

  const lastItem = Math.min(
    pagination.page * pagination.limit,
    pagination.totalItems,
  );

  return (
    <div className="space-y-4">
      <div
        className={`hidden overflow-hidden rounded-xl border border-border bg-card transition-opacity xl:block ${
          isFetching ? 'opacity-60' : ''
        }`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">{t('table.client')}</TableHead>
              <TableHead className="text-center">{t('table.email')}</TableHead>
              <TableHead className="text-center">{t('table.phone')}</TableHead>
              <TableHead className="text-center">{t('table.userId')}</TableHead>
              <TableHead className="text-center">
                {t('table.emailStatus')}
              </TableHead>
              <TableHead className="text-center">
                {t('table.actions')}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clients.map((client) => {
              const clientName = getClientName(
                client,
                t('table.unknownClient'),
              );

              return (
                <TableRow key={client._id}>
                  <TableCell className="text-center">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="size-10 shrink-0">
                        <AvatarImage
                          src={client.photo ?? undefined}
                          alt={clientName}
                        />
                        <AvatarFallback>
                          {getClientInitials(client) || (
                            <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                          )}
                        </AvatarFallback>
                      </Avatar>

                      <span className="truncate font-medium text-foreground">
                        {clientName}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <span className="text-sm text-foreground">
                      {client.email}
                    </span>
                  </TableCell>

                  <TableCell className="text-center">
                    <span className="text-sm text-muted-foreground">
                      {client.phone ?? t('table.notProvided')}
                    </span>
                  </TableCell>

                  <TableCell className="text-center">
                    <span className="font-mono text-xs text-muted-foreground">
                      {client.userId}
                    </span>
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={
                        client.emailVerified
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600'
                          : 'border-amber-500/30 bg-amber-500/10 text-amber-600'
                      }
                    >
                      {client.emailVerified
                        ? t('table.verified')
                        : t('table.unverified')}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-center">
                    <IconButton
                      asChild
                      variant="iconGhost"
                      size="icon-lg"
                      aria-label={t('table.viewProfile')}
                    >
                      <Link href={routes.dashboard.clients.detail(client._id)}>
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div
        className={`grid grid-cols-1 gap-3 sm:grid-cols-2 xl:hidden transition-opacity ${
          isFetching ? 'opacity-60' : ''
        }`}
      >
        {clients.map((client) => {
          const clientName = getClientName(client, t('table.unknownClient'));

          return (
            <div
              key={client._id}
              className="min-w-0 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="size-11 shrink-0">
                  <AvatarImage
                    src={client.photo ?? undefined}
                    alt={clientName}
                  />
                  <AvatarFallback>
                    {getClientInitials(client) || (
                      <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-foreground">
                    {clientName}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {client.email}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    {t('table.phone')}
                  </p>
                  <p className="mt-1 truncate text-sm text-foreground">
                    {client.phone ?? t('table.notProvided')}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    {t('table.userId')}
                  </p>
                  <p className="mt-1 truncate font-mono text-sm text-foreground">
                    {client.userId}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <Badge
                  variant="outline"
                  className={
                    client.emailVerified
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600'
                      : 'border-amber-500/30 bg-amber-500/10 text-amber-600'
                  }
                >
                  {client.emailVerified
                    ? t('table.verified')
                    : t('table.unverified')}
                </Badge>

                <IconButton
                  asChild
                  variant="iconGhost"
                  size="icon-lg"
                  aria-label={t('table.viewProfile')}
                >
                  <Link href={routes.dashboard.clients.detail(client._id)}>
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          {t('pagination.showing')} {firstItem}–{lastItem} {t('pagination.of')}{' '}
          {pagination.totalItems}
        </p>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page <= 1 || isFetching}
            onClick={onPrevious}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            {t('pagination.previous')}
          </Button>

          <span className="min-w-16 text-center text-sm text-muted-foreground">
            {pagination.page} / {pagination.totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page >= pagination.totalPages || isFetching}
            onClick={onNext}
          >
            {t('pagination.next')}
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      </div>
    </div>
  );
}
