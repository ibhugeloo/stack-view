"use client";

import { ReactNode } from "react";
import { ProjectProvider } from "@/providers/project-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import type { Dictionary } from "@/lib/dictionaries";
import type { Project } from "@/lib/types";
import type { User } from "@supabase/supabase-js";

interface ClientShellProps {
  locale: string;
  dict: Dictionary;
  user: User;
  projects: Project[];
  children: ReactNode;
}

export function ClientShell({ locale, dict, user, projects, children }: ClientShellProps) {
  return (
    <ProjectProvider>
      <Sidebar locale={locale} dict={dict} />
      <Header locale={locale} dict={dict} user={user} projects={projects} />
      <main className="ml-60 mt-14 min-h-[calc(100vh-3.5rem)] p-6">{children}</main>
    </ProjectProvider>
  );
}
