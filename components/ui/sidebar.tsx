"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./button";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
      { name: "Profile", href: "/dashboard/profile" },
      { name: "Dashboard", href: "/dashboard" },
      { name: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 flex flex-col p-4 h-screen">
      <div className="text-2xl font-bold mb-8">MyLogo</div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={`justify-start w-full
                ${pathname === item.href ? "bg-gray-200 dark:bg-gray-700" : ""}
                text-gray-900 dark:text-gray-100
                hover:bg-gray-300 dark:hover:bg-gray-600
                hover:text-gray-900 dark:hover:text-gray-100
              `}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
