import { getDictionary, type Locale } from "@/lib/dictionaries";
import { ServicesContent } from "./services-content";
import { createClient } from "@/lib/supabase/server";
import type { Service, Machine, Project } from "@/lib/types";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const supabase = await createClient();
  const [{ data: services }, { data: machines }, { data: projects }] =
    await Promise.all([
      supabase.from("services").select("*").order("name"),
      supabase.from("machines").select("*").order("name"),
      supabase.from("projects").select("*").order("name"),
    ]);

  return (
    <ServicesContent
      dict={dict}
      services={(services as Service[]) ?? []}
      machines={(machines as Machine[]) ?? []}
      projects={(projects as Project[]) ?? []}
    />
  );
}
