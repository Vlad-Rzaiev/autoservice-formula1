'use client';

import { Container, Section } from '@/components/layout';
import { useAuth } from '@/providers';

export default function ProfileDetails() {
  const data = useAuth();

  console.log(data.user);

  return (
    <Section>
      <Container>
        <h1>PROFILE PAGE</h1>

        {!data.user && <p>LOADING.....</p>}

        {data.user && <p>{`MY EMAIL: ${data.user.email}`}</p>}
      </Container>
    </Section>
  );
}
