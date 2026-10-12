import { Section, Container } from '@/components/layout';

interface CarPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CarPage({ params }: CarPageProps) {
  const { id } = await params;

  return (
    <Section>
      <Container>
        <h1>My Car Page</h1>

        <p>{`ID: ${id}`}</p>
      </Container>
    </Section>
  );
}
