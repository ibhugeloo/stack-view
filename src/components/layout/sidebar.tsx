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
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-60 flex-col border-r border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-2.5 border-b border-border/50 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Server className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-base font-semibold tracking-tight">StackView</span>
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
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/50 p-4">
        <p className="text-xs text-muted-foreground">StackView v0.1</p>
      </div>
    </aside>
  );
}
