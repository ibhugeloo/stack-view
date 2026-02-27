"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Table2, Network, Globe, Boxes, FolderKanban, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/dictionaries";

interface SidebarProps {
  locale: string;
  dict: Dictionary;
}

const navItems = (locale: string, dict: Dictionary) => [
  {
    href: `/${locale}`,
    label: dict.nav.dashboard,
    icon: LayoutDashboard,
  },
  {
    href: `/${locale}/inventory`,
    label: dict.nav.inventory,
    icon: Table2,
  },
  {
    href: `/${locale}/topology`,
    label: dict.nav.topology,
    icon: Network,
  },
  {
    href: `/${locale}/domains`,
    label: dict.nav.domains,
    icon: Globe,
  },
  {
    href: `/${locale}/services`,
    label: dict.nav.services,
    icon: Boxes,
  },
  {
    href: `/${locale}/projects`,
    label: dict.nav.projects,
    icon: FolderKanban,
  },
];

export function Sidebar({ locale, dict }: SidebarProps) {
  const pathname = usePathname();

  const items = navItems(locale, dict);

  return (
    <aside className="glass-dark fixed left-0 top-0 z-30 flex h-screen w-60 flex-col">
      <div className="flex h-14 items-center gap-2.5 border-b border-white/10 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sv-cyan/20">
          <Server className="h-4 w-4 text-sv-cyan" />
        </div>
        <span className="text-base font-semibold tracking-tight text-white">StackView</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => {
          const isActive =
            item.href === `/${locale}`
              ? pathname === `/${locale}` || pathname === `/${locale}/`
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                isActive
                  ? "border-l-2 border-sv-cyan bg-white/8 text-white shadow-[inset_0_0_12px_oklch(0.78_0.15_175_/_0.06)]"
                  : "border-l-2 border-transparent text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <p className="text-xs text-white/40">StackView v0.1</p>
      </div>
    </aside>
  );
}
