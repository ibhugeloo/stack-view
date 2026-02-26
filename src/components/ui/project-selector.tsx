"use client";

import { useProject } from "@/providers/project-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dictionary } from "@/lib/dictionaries";
import type { Project } from "@/lib/types";

interface ProjectSelectorProps {
  dict: Dictionary;
  projects: Project[];
}

export function ProjectSelector({ dict, projects }: ProjectSelectorProps) {
  const { selectedProjectId, setSelectedProjectId } = useProject();

  return (
    <Select
      value={selectedProjectId || "all"}
      onValueChange={(v) => setSelectedProjectId(v === "all" ? null : v)}
    >
      <SelectTrigger className="w-48 border-border/50 bg-background/50">
        <SelectValue placeholder={dict.common.selectProject} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{dict.common.allProjects}</SelectItem>
        {projects.map((p) => (
          <SelectItem key={p.id} value={p.id}>
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              {p.name}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
