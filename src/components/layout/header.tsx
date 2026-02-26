"use client";

import { Globe, LogOut, User as UserIcon } from "lucide-react";
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

  return (
    <header className="fixed left-60 right-0 top-0 z-20 flex h-14 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <ProjectSelector dict={dict} projects={projects} />
      </div>

      <div className="flex items-center gap-2">
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
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground max-w-[200px]">
              <UserIcon className="h-4 w-4 shrink-0" />
              <span className="truncate text-xs">{user.email}</span>
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
