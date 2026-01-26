"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMyContext } from "@/context/context";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useMyContext();

  console.log("User in Sidebar:", user);


  // If user isn't loaded yet, just show base itemss
  const navItems = [
    { name: "Profile", href: "/dashboard/profile" },
    ...(user?.userRoll === "admin"
      ? [{ name: "Add products", href: "/dashboard/add-product" }]: []),
    { name: "Dashboard", href: "/dashboard" },
    { name: "Cart", href: "/dashboard/cart" },
  ];

  return (
    <aside className="w-64 h-screen border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  isActive ? "bg-gray-200 dark:bg-gray-700" : ""
                } text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600`}
              >
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
