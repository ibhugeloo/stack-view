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

export async function createService(formData: FormData) {
  const { supabase, user } = await getUser();

  const projectId = formData.get("project_id") as string;
  const machineId = formData.get("machine_id") as string;
  const port = formData.get("port") as string;
  const url = formData.get("url") as string;

  const { error } = await supabase.from("services").insert({
    user_id: user.id,
    project_id: projectId || null,
    machine_id: machineId || null,
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || "",
    category: formData.get("category") as string,
    status: formData.get("status") as string,
    url: url || null,
    port: port ? parseInt(port, 10) : null,
    tasks: [],
  });

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

export async function updateService(id: string, formData: FormData) {
  const { supabase, user } = await getUser();

  const projectId = formData.get("project_id") as string;
  const machineId = formData.get("machine_id") as string;
  const port = formData.get("port") as string;
  const url = formData.get("url") as string;

  const { error } = await supabase
    .from("services")
    .update({
      project_id: projectId || null,
      machine_id: machineId || null,
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || "",
      category: formData.get("category") as string,
      status: formData.get("status") as string,
      url: url || null,
      port: port ? parseInt(port, 10) : null,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

export async function updateServiceTasks(id: string, tasks: Task[]) {
  const { supabase, user } = await getUser();

  const { error } = await supabase
    .from("services")
    .update({ tasks })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}

export async function deleteService(id: string) {
  const { supabase, user } = await getUser();

  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
}
