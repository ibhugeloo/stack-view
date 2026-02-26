"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return { supabase, user };
}

export async function createProject(formData: FormData) {
  const { supabase, user } = await getUser();

  const { error } = await supabase.from("projects").insert({
    user_id: user.id,
    name: formData.get("name") as string,
    color: formData.get("color") as string,
    description: (formData.get("description") as string) || "",
    environment: formData.get("environment") as string,
    status: "active",
  });

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

export async function updateProject(id: string, formData: FormData) {
  const { supabase, user } = await getUser();

  const { error } = await supabase
    .from("projects")
    .update({
      name: formData.get("name") as string,
      color: formData.get("color") as string,
      description: (formData.get("description") as string) || "",
      environment: formData.get("environment") as string,
      status: formData.get("status") as string,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

export async function deleteProject(id: string) {
  const { supabase, user } = await getUser();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}
