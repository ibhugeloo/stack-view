import { getDictionary, type Locale } from "@/lib/dictionaries";
import { TopologyContent } from "./topology-content";
import { createClient } from "@/lib/supabase/server";
import type { Machine, Project } from "@/lib/types";

export default async function TopologyPage({
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
    <TopologyContent
      dict={dict}
      machines={(machines as Machine[]) ?? []}
      projects={(projects as Project[]) ?? []}
    />
  );
}
