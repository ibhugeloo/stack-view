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
import { createMachine, updateMachine } from "@/lib/actions/machines";
import type { Dictionary } from "@/lib/dictionaries";
import type { Machine, Project } from "@/lib/types";

const OS_OPTIONS = ["ubuntu", "debian", "centos", "windows", "macos", "proxmox", "esxi", "truenas", "pfsense"] as const;

interface MachineFormDialogProps {
  dict: Dictionary;
  projects: Project[];
  machine?: Machine;
}

export function MachineFormDialog({ dict, projects, machine }: MachineFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isEdit = !!machine;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      if (isEdit) {
        await updateMachine(machine.id, formData);
      } else {
        await createMachine(formData);
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
        {isEdit ? <Pencil className="h-3.5 w-3.5" /> : <><Plus className="mr-1.5 h-4 w-4" />{dict.auth.addMachine}</>}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEdit ? dict.auth.editMachine : dict.auth.addMachine}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Hostname</label>
                <input
                  name="name"
                  required
                  defaultValue={machine?.name}
                  className="input-glass"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">IP Address</label>
                <input
                  name="ip"
                  required
                  defaultValue={machine?.ip}
                  className="input-glass"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">OS</label>
                <select
                  name="os"
                  defaultValue={machine?.os ?? "ubuntu"}
                  className="select-glass"
                >
                  {OS_OPTIONS.map((os) => (
                    <option key={os} value={os}>{os}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">IP Type</label>
                <select
                  name="is_static"
                  defaultValue={machine?.is_static === false ? "false" : "true"}
                  className="select-glass"
                >
                  <option value="true">Static</option>
                  <option value="false">DHCP</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Project</label>
              <select
                name="project_id"
                defaultValue={machine?.project_id ?? ""}
                className="select-glass"
              >
                <option value="">— No project —</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <input
                name="description"
                defaultValue={machine?.description}
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
