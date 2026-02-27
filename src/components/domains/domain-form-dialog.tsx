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
import { createDomain, updateDomain } from "@/lib/actions/domains";
import type { Dictionary } from "@/lib/dictionaries";
import type { Domain, Project } from "@/lib/types";

const PROVIDERS = ["cloudflare", "lws", "ovh", "gandi", "namecheap", "google"] as const;

interface DomainFormDialogProps {
  dict: Dictionary;
  projects: Project[];
  domain?: Domain;
}

export function DomainFormDialog({ dict, projects, domain }: DomainFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isEdit = !!domain;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      if (isEdit) {
        await updateDomain(domain.id, formData);
      } else {
        await createDomain(formData);
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
        {isEdit ? <Pencil className="h-3.5 w-3.5" /> : <><Plus className="mr-1.5 h-4 w-4" />{dict.auth.addDomain}</>}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEdit ? dict.auth.editDomain : dict.auth.addDomain}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Domain name</label>
              <input
                name="name"
                required
                placeholder="example.com"
                defaultValue={domain?.name}
                className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Provider</label>
                <select
                  name="provider"
                  defaultValue={domain?.provider ?? "cloudflare"}
                  className="select-glass"
                >
                  {PROVIDERS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Expires at</label>
                <input
                  name="expires_at"
                  type="date"
                  required
                  defaultValue={domain?.expires_at}
                  className="input-glass"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Dashboard URL</label>
              <input
                name="dashboard_url"
                type="url"
                defaultValue={domain?.dashboard_url}
                className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Project</label>
                <select
                  name="project_id"
                  defaultValue={domain?.project_id ?? ""}
                  className="select-glass"
                >
                  <option value="">— None —</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  id="auto_renew"
                  name="auto_renew"
                  type="checkbox"
                  value="true"
                  defaultChecked={domain?.auto_renew !== false}
                  className="h-4 w-4 rounded border-border accent-primary"
                />
                <label htmlFor="auto_renew" className="text-sm font-medium">Auto-renew</label>
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
