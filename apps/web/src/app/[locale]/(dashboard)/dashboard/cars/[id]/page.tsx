import { CarDetails } from '@/features/dashboard';

interface CarPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CarPage({ params }: CarPageProps) {
  const { id } = await params;

  return <CarDetails carId={id} />;
}
