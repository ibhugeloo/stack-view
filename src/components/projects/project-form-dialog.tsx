"use client";

import { useTransition, useState } from "react";
import { Plus, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createProject, updateProject } from "@/lib/actions/projects";
import type { Dictionary } from "@/lib/dictionaries";
import type { Project } from "@/lib/types";

const ENVIRONMENTS = ["production", "staging", "development", "infrastructure"] as const;
const STATUSES = ["active", "maintenance", "archived"] as const;
const PRESET_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316", "#ec4899"];

interface ProjectFormDialogProps {
  dict: Dictionary;
  project?: Project;
}

export function ProjectFormDialog({ dict, project }: ProjectFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isEdit = !!project;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      if (isEdit) {
        await updateProject(project.id, formData);
      } else {
        await createProject(formData);
      }
      setOpen(false);
    });
  }

  return (
    <>
      <Button
        size="sm"
        variant={isEdit ? "ghost" : "default"}
        className={isEdit ? "h-8 w-8 p-0" : ""}
        onClick={() => setOpen(true)}
      >
        {isEdit ? <Pencil className="h-3.5 w-3.5" /> : <><Plus className="mr-1.5 h-4 w-4" />{dict.auth.addProject}</>}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEdit ? dict.auth.editProject : dict.auth.addProject}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Name</label>
              <input
                name="name"
                required
                defaultValue={project?.name}
                className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <input
                name="description"
                defaultValue={project?.description}
                className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Environment</label>
                <select
                  name="environment"
                  defaultValue={project?.environment ?? "development"}
                  className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
                >
                  {ENVIRONMENTS.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>

              {isEdit && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    name="status"
                    defaultValue={project.status}
                    className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Color</label>
              <div className="flex items-center gap-2">
                {PRESET_COLORS.map((c) => (
                  <label key={c} className="relative cursor-pointer">
                    <input type="radio" name="color" value={c} defaultChecked={project?.color === c || (!project && c === "#3b82f6")} className="sr-only peer" />
                    <span
                      className="block h-6 w-6 rounded-full ring-2 ring-transparent peer-checked:ring-foreground peer-checked:ring-offset-2 peer-checked:ring-offset-background"
                      style={{ backgroundColor: c }}
                    />
                  </label>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>{dict.auth.cancel}</Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? dict.auth.saving : dict.auth.save}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
