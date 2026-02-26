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
import { createService, updateService } from "@/lib/actions/services";
import type { Dictionary } from "@/lib/dictionaries";
import type { Service, Machine, Project } from "@/lib/types";

const CATEGORIES = ["web", "database", "monitoring", "storage", "auth", "devops", "network", "other"] as const;
const STATUSES = ["running", "stopped", "degraded", "to_test"] as const;

interface ServiceFormDialogProps {
  dict: Dictionary;
  projects: Project[];
  machines: Machine[];
  service?: Service;
}

export function ServiceFormDialog({ dict, projects, machines, service }: ServiceFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isEdit = !!service;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      if (isEdit) {
        await updateService(service.id, formData);
      } else {
        await createService(formData);
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
        {isEdit ? <Pencil className="h-3.5 w-3.5" /> : <><Plus className="mr-1.5 h-4 w-4" />{dict.auth.addService}</>}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEdit ? dict.auth.editService : dict.auth.addService}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Name</label>
              <input
                name="name"
                required
                defaultValue={service?.name}
                className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Category</label>
                <select
                  name="category"
                  defaultValue={service?.category ?? "web"}
                  className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Status</label>
                <select
                  name="status"
                  defaultValue={service?.status ?? "to_test"}
                  className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Project</label>
                <select
                  name="project_id"
                  defaultValue={service?.project_id ?? ""}
                  className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
                >
                  <option value="">— None —</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Machine</label>
                <select
                  name="machine_id"
                  defaultValue={service?.machine_id ?? ""}
                  className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
                >
                  <option value="">— None —</option>
                  {machines.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">URL</label>
                <input
                  name="url"
                  type="url"
                  defaultValue={service?.url ?? ""}
                  className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Port</label>
                <input
                  name="port"
                  type="number"
                  defaultValue={service?.port ?? ""}
                  className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <input
                name="description"
                defaultValue={service?.description}
                className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
              />
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
