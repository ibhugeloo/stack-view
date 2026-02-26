import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { ClientShell } from "./client-shell";
import { AuthProvider } from "@/providers/auth-provider";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StackView — DCIM Dashboard",
  description: "Infrastructure management made beautiful",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const projects: Project[] = [];
  if (user) {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("name");
    if (data) projects.push(...(data as Project[]));
  }

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider initialUser={user}>
          {user ? (
            <ClientShell locale={locale} dict={dict} user={user} projects={projects}>
              {children}
            </ClientShell>
          ) : (
            <main className="flex min-h-screen items-center justify-center bg-background px-4">
              {children}
            </main>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
