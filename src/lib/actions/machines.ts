"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Task } from "@/lib/types";

async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return { supabase, user };
}

export async function createMachine(formData: FormData) {
  const { supabase, user } = await getUser();

  const projectId = formData.get("project_id") as string;

  const { error } = await supabase.from("machines").insert({
    user_id: user.id,
    project_id: projectId || null,
    name: formData.get("name") as string,
    ip: formData.get("ip") as string,
    is_static: formData.get("is_static") === "true",
    os: formData.get("os") as string,
    description: (formData.get("description") as string) || "",
    tasks: [],
  });

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

export async function updateMachine(id: string, formData: FormData) {
  const { supabase, user } = await getUser();

  const projectId = formData.get("project_id") as string;

  const { error } = await supabase
    .from("machines")
    .update({
      project_id: projectId || null,
      name: formData.get("name") as string,
      ip: formData.get("ip") as string,
      is_static: formData.get("is_static") === "true",
      os: formData.get("os") as string,
      description: (formData.get("description") as string) || "",
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

export async function updateMachineTasks(id: string, tasks: Task[]) {
  const { supabase, user } = await getUser();

  const { error } = await supabase
    .from("machines")
    .update({ tasks })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

export async function deleteMachine(id: string) {
  const { supabase, user } = await getUser();

  const { error } = await supabase
    .from("machines")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}
