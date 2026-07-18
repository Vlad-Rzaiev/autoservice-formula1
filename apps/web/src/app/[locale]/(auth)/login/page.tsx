import { Link } from "@/i18n/navigation";

export default function Page() {
  return (
    <div>
      <Link href="/">Back to main page</Link>
      <h2>login page</h2>
      <Link className="block" href="/forgot-password">
        Forgot password?
      </Link>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
