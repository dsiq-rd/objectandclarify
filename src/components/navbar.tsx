"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const linkClasses = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-blue-600">
          Object & Clarify
        </Link>
        <div className="flex space-x-2">
          <Link href="/signin" className={linkClasses("/signin")}>
            Sign in
          </Link>
          <Link href="/signup" className={linkClasses("/signup")}>
            Sign up
          </Link>
          <Link href="/dashboard" className={linkClasses("/dashboard")}>
            Dashboard
          </Link>
          <Link href="/users" className={linkClasses("/users")}>
            Users
          </Link>
        </div>
      </div>
    </nav>
  );
}
