"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { MachineTable } from "@/components/inventory/machine-table";
import { MachineFormDialog } from "@/components/machines/machine-form-dialog";
import { useProject } from "@/providers/project-provider";
import type { Dictionary } from "@/lib/dictionaries";
import type { Machine, Project } from "@/lib/types";

interface InventoryContentProps {
  dict: Dictionary;
  machines: Machine[];
  projects: Project[];
}

export function InventoryContent({ dict, machines, projects }: InventoryContentProps) {
  const { selectedProjectId } = useProject();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = selectedProjectId
      ? machines.filter((m) => m.project_id === selectedProjectId)
      : machines;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.ip.includes(q) ||
          m.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedProjectId, search, machines]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-sv-indigo dark:text-sv-cyan">{dict.inventory.title}</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={dict.inventory.search}
              className="input-glass w-64 pl-9 pr-3"
            />
          </div>
          <MachineFormDialog dict={dict} projects={projects} />
        </div>
      </div>

      <MachineTable machines={filtered} projects={projects} dict={dict} />
    </div>
  );
}
