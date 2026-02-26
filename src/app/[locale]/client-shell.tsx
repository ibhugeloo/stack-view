"use client";

import { ReactNode } from "react";
import { ProjectProvider } from "@/providers/project-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import type { Dictionary } from "@/lib/dictionaries";

interface ClientShellProps {
  locale: string;
  dict: Dictionary;
  children: ReactNode;
}

export function ClientShell({ locale, dict, children }: ClientShellProps) {
  return (
    <ProjectProvider>
      <Sidebar locale={locale} dict={dict} />
      <Header locale={locale} dict={dict} />
      <main className="ml-60 mt-14 min-h-[calc(100vh-3.5rem)] p-6">{children}</main>
    </ProjectProvider>
  );
}
