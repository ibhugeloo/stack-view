"use client";

import { useTransition, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteProject } from "@/lib/actions/projects";
import type { Dictionary } from "@/lib/dictionaries";

interface ProjectDeleteButtonProps {
  id: string;
  dict: Dictionary;
}

export function ProjectDeleteButton({ id, dict }: ProjectDeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteProject(id);
      setOpen(false);
    });
  }

  return (
    <>
      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive" onClick={() => setOpen(true)}>
        <Trash2 className="h-3.5 w-3.5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{dict.auth.confirmDelete}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{dict.auth.confirmDeleteMsg}</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>{dict.auth.cancel}</Button>
            <Button variant="destructive" disabled={isPending} onClick={handleDelete}>
              {isPending ? dict.auth.saving : dict.auth.deleteProject}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
