"use client";

import { Globe, LogOut, User as UserIcon, Search, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProjectSelector } from "@/components/ui/project-selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth";
import type { Dictionary } from "@/lib/dictionaries";
import type { Project } from "@/lib/types";
import type { User } from "@supabase/supabase-js";

interface HeaderProps {
  locale: string;
  dict: Dictionary;
  user: User;
  projects: Project[];
}

export function Header({ locale, dict, user, projects }: HeaderProps) {
  const pathname = usePathname();

  const switchLocalePath = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };

  const userInitial = (user.email ?? "U").charAt(0).toUpperCase();

  return (
    <header className="glass-light fixed left-60 right-0 top-0 z-20 flex h-14 items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <ProjectSelector dict={dict} projects={projects} />
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="input-glass w-64 pl-9 pr-3"
            readOnly
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications (visual only) */}
        <Button variant="ghost" size="icon-sm" className="relative text-muted-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-sv-cyan text-[9px] font-bold text-sv-indigo">
            3
          </span>
        </Button>

        {/* Language switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <Globe className="h-4 w-4" />
              {locale === "fr" ? "FR" : "EN"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={switchLocalePath("fr")}>{dict.common.french}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={switchLocalePath("en")}>{dict.common.english}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sv-indigo text-xs font-bold text-white dark:bg-sv-cyan dark:text-sv-indigo">
                {userInitial}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-2 py-1.5 text-xs text-muted-foreground truncate max-w-[200px]">
              {user.email}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <form action={signOut.bind(null, locale)} className="w-full">
                <button type="submit" className="flex w-full items-center gap-2 text-sm">
                  <LogOut className="h-4 w-4" />
                  {dict.auth.logout}
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
