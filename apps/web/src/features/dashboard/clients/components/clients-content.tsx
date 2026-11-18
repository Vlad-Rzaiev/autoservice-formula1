'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { IconButton } from '@/components/common';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationLink,
} from '@/components/ui';
import type { ClientDto, ClientListPagination } from '@autoservice/contracts';
import { routes } from '@/config';
import { formatPhoneNumber } from '@/lib';

interface ClientsContentProps {
  clients: ClientDto[];
  pagination: ClientListPagination;
  isFetching: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
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
  onPageChange,
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

  const getVisiblePages = () => {
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 'ellipsis', totalPages] as const;
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        'ellipsis',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ] as const;
    }

    return [
      1,
      'ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis',
      totalPages,
    ] as const;
  };

  const getCompactVisiblePages = () => {
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;

    if (totalPages <= 3) {
      return Array.from(
        { length: totalPages },
        (_, pageIndex) => pageIndex + 1,
      );
    }

    if (currentPage <= 2) {
      return [1, 2, 'ellipsis', totalPages] as const;
    }

    if (currentPage >= totalPages - 1) {
      return [1, 'ellipsis', totalPages - 1, totalPages] as const;
    }

    return [1, 'ellipsis', currentPage, 'ellipsis', totalPages] as const;
  };

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
                    {client.phone ? (
                      <a
                        href={`tel:${client.phone}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        <FontAwesomeIcon
                          icon={faPhone}
                          aria-hidden="true"
                          className="text-destructive"
                        />{' '}
                        {formatPhoneNumber(client.phone)}
                      </a>
                    ) : (
                      t('table.notProvided')
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    <span className="font-mono text-xs text-muted-foreground">
                      {client.userId}
                    </span>
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge variant={client.emailVerified ? 'success' : 'error'}>
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
                  {client.phone ? (
                    <a
                      href={`tel:${client.phone}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <FontAwesomeIcon
                        icon={faPhone}
                        aria-hidden="true"
                        className="text-destructive"
                      />{' '}
                      {formatPhoneNumber(client.phone)}
                    </a>
                  ) : (
                    t('table.notProvided')
                  )}
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
                <Badge variant={client.emailVerified ? 'success' : 'error'}>
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

        <Pagination className="mx-0 w-auto justify-center sm:justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text=""
                aria-disabled={pagination.page <= 1 || isFetching}
                tabIndex={pagination.page <= 1 || isFetching ? -1 : 0}
                onClick={(event) => {
                  event.preventDefault();

                  if (pagination.page > 1 && !isFetching) {
                    onPrevious();
                  }
                }}
              />
            </PaginationItem>

            {getCompactVisiblePages().map((page, pageIndex) => (
              <PaginationItem
                key={`compact-${page}-${pageIndex}`}
                className="min-[381px]:hidden"
              >
                {page === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={pagination.page === page}
                    aria-label={`Go to page ${page}`}
                    aria-disabled={isFetching}
                    tabIndex={isFetching ? -1 : 0}
                    onClick={(event) => {
                      event.preventDefault();

                      if (
                        typeof page === 'number' &&
                        !isFetching &&
                        pagination.page !== page
                      ) {
                        onPageChange(page);
                      }
                    }}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            {getVisiblePages().map((page, pageIndex) => (
              <PaginationItem
                key={`regular-${page}-${pageIndex}`}
                className="max-[380px]:hidden"
              >
                {page === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={pagination.page === page}
                    aria-label={`Go to page ${page}`}
                    aria-disabled={isFetching}
                    tabIndex={isFetching ? -1 : 0}
                    onClick={(event) => {
                      event.preventDefault();

                      if (
                        typeof page === 'number' &&
                        !isFetching &&
                        pagination.page !== page
                      ) {
                        onPageChange(page);
                      }
                    }}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                text=""
                aria-disabled={
                  pagination.page >= pagination.totalPages || isFetching
                }
                tabIndex={
                  pagination.page >= pagination.totalPages || isFetching
                    ? -1
                    : 0
                }
                onClick={(event) => {
                  event.preventDefault();

                  if (pagination.page < pagination.totalPages && !isFetching) {
                    onNext();
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
