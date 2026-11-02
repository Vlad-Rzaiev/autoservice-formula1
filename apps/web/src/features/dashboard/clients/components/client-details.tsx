'use client';

import { Container, Section } from '@/components/layout';
import { useClient } from '@/features/dashboard/clients/api/use-client';

interface ClientDetailsProps {
  id: string;
}

export default function ClientDetails({ id }: ClientDetailsProps) {
  const { data: client } = useClient(id);

  console.log(client);

  return (
    <Section>
      <Container>
        <h1>CLIENT DETAILS PAGE</h1>

        <p>{`CLIENT EMAIL: ${client.email}`}</p>
      </Container>
    </Section>
  );
}
