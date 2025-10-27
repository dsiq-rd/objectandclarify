"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const linkClasses = (path: string) =>
    `block px-4 py-2 rounded-md text-sm font-medium ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-56 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-blue-600 mb-6">Navigation</h2>
      <nav className="space-y-1">
        <Link href="/dashboard" className={linkClasses("/main/dashboard")}>
          Dashboard
        </Link>
        <Link href="/users" className={linkClasses("/main/users")}>
          Users
        </Link>
      </nav>
    </aside>
  );
}
