export interface MechanicPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function MechanicPage({ params }: MechanicPageProps) {
  const { id } = await params;

  return <div>Mechanic Page {id}</div>;
}
