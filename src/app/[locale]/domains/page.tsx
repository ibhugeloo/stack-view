import { getDictionary, type Locale } from "@/lib/dictionaries";
import { DomainsContent } from "./domains-content";
import { createClient } from "@/lib/supabase/server";
import type { Domain, Project } from "@/lib/types";

export default async function DomainsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const supabase = await createClient();
  const [{ data: domains }, { data: projects }] = await Promise.all([
    supabase.from("domains").select("*").order("name"),
    supabase.from("projects").select("*").order("name"),
  ]);

  return (
    <DomainsContent
      dict={dict}
      domains={(domains as Domain[]) ?? []}
      projects={(projects as Project[]) ?? []}
    />
  );
}
