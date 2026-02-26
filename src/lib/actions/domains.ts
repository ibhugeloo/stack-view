"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return { supabase, user };
}

export async function createDomain(formData: FormData) {
  const { supabase, user } = await getUser();

  const projectId = formData.get("project_id") as string;

  const { error } = await supabase.from("domains").insert({
    user_id: user.id,
    project_id: projectId || null,
    name: formData.get("name") as string,
    provider: formData.get("provider") as string,
    dashboard_url: (formData.get("dashboard_url") as string) || "",
    expires_at: formData.get("expires_at") as string,
    auto_renew: formData.get("auto_renew") === "true",
  });

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

export async function updateDomain(id: string, formData: FormData) {
  const { supabase, user } = await getUser();

  const projectId = formData.get("project_id") as string;

  const { error } = await supabase
    .from("domains")
    .update({
      project_id: projectId || null,
      name: formData.get("name") as string,
      provider: formData.get("provider") as string,
      dashboard_url: (formData.get("dashboard_url") as string) || "",
      expires_at: formData.get("expires_at") as string,
      auto_renew: formData.get("auto_renew") === "true",
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

export async function deleteDomain(id: string) {
  const { supabase, user } = await getUser();

  const { error } = await supabase
    .from("domains")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}
