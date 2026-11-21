'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/providers';
import { useAppointments } from '@/features/dashboard/appointments/api/use-appointments';
import type { AppointmentsListQuery } from '@autoservice/contracts';
import { Container, Section } from '@/components/layout';

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 300;

export default function AppointmentsContainer() {
  const t = useTranslations('dashboard.appointments');
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  const query: AppointmentsListQuery = {
    page,
    limit: PAGE_SIZE,
    ...(search ? { search } : {}),
  };

  const { data, isPending, isError, isFetching, refetch } = useAppointments(
    query,
    user?.userId,
  );

  const appointments = data?.items ?? {};
  const pagination = data?.pagination;
  const totalItems = pagination?.totalItems ?? 0;

  const from =
    pagination && totalItems > 0
      ? (pagination.page - 1) * pagination.limit + 1
      : 0;
  const to = pagination
    ? Math.min(pagination.page * pagination.limit, totalItems)
    : 0;

  return (
    <Section className="mt-4">
      <Container>
        <h2>All appointments page container</h2>
      </Container>
    </Section>
  );
}
