'use client';

import { Container, Section } from '@/components/layout';
import { useClients } from '@/features/dashboard/clients/api/use-clients';

export default function GetClientsContainer() {
  const { data: clients } = useClients();

  console.log(clients);
  return (
    <Section>
      <Container>
        <h1>GET CLIENTS CONTAINER</h1>
      </Container>
    </Section>
  );
}
