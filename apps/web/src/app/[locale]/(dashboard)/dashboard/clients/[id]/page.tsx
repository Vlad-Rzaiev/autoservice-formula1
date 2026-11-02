import { ClientDetails } from '@/features/dashboard';

interface ClientPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params;

  return <ClientDetails id={id} />;
}
