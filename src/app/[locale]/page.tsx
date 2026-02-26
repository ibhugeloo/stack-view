import { getDictionary, type Locale } from "@/lib/dictionaries";
import { DashboardContent } from "./dashboard-content";
import { createClient } from "@/lib/supabase/server";
import type { Machine, Project } from "@/lib/types";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const supabase = await createClient();
  const [{ data: machines }, { data: projects }] = await Promise.all([
    supabase.from("machines").select("*").order("name"),
    supabase.from("projects").select("*").order("name"),
  ]);

  return (
    <DashboardContent
      dict={dict}
      machines={(machines as Machine[]) ?? []}
      projects={(projects as Project[]) ?? []}
    />
  );
}
