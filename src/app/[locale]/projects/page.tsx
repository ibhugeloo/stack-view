import { getDictionary, type Locale } from "@/lib/dictionaries";
import { ProjectsContent } from "./projects-content";
import { createClient } from "@/lib/supabase/server";
import type { Project, Machine, Service, Domain } from "@/lib/types";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const supabase = await createClient();
  const [
    { data: projects },
    { data: machines },
    { data: services },
    { data: domains },
  ] = await Promise.all([
    supabase.from("projects").select("*").order("name"),
    supabase.from("machines").select("*").order("name"),
    supabase.from("services").select("*").order("name"),
    supabase.from("domains").select("*").order("name"),
  ]);

  return (
    <ProjectsContent
      dict={dict}
      projects={(projects as Project[]) ?? []}
      machines={(machines as Machine[]) ?? []}
      services={(services as Service[]) ?? []}
      domains={(domains as Domain[]) ?? []}
    />
  );
}
