import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">🧄 Garlic Admin</h1>
      <nav className="space-y-3">
        <Link href="/" className="block hover:text-green-400">
          Dashboard
        </Link>
        <a href="/customers" className="block hover:text-green-400">
          Customers
        </a>
        <a href="/garlic-entry" className="block hover:text-green-400">
          Garlic Entry
        </a>
        <a href="/payments" className="block hover:text-green-400">
          Payments
        </a>
        <a href="/summary" className="block hover:text-green-400">
          Monthly Summary
        </a>
      </nav>
    </aside>
  );
}
