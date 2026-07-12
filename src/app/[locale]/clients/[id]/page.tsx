interface ClientPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params;
  return (
    <div>
      <h2>{`Client page ${id}`}</h2>
      <p>{new Date().toLocaleString()}</p>
    </div>
  );
}
