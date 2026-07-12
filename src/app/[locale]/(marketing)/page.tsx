"use client";

import { Link } from "@/i18n/navigation";

export default function Home() {
  return (
    <main>
      <Link className="block mb-2" href="/login">
        Login page
      </Link>
      <Link className="block mb-2" href="/register">
        Register page
      </Link>
      <Link href="/clients">Clients page</Link>
    </main>
  );
}
