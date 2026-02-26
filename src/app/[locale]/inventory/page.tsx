import { getDictionary, type Locale } from "@/lib/dictionaries";
import { InventoryContent } from "./inventory-content";
import { createClient } from "@/lib/supabase/server";
import type { Machine, Project } from "@/lib/types";

export default async function InventoryPage({
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
    <InventoryContent
      dict={dict}
      machines={(machines as Machine[]) ?? []}
      projects={(projects as Project[]) ?? []}
    />
  );
}
