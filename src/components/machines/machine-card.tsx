"use client";

import { IpBadge } from "@/components/inventory/ip-badge";
import { OsIcon } from "@/components/inventory/os-icon";
import { TaskList } from "@/components/inventory/task-list";
import type { Machine, Project } from "@/lib/types";

interface MachineCardProps {
  machine: Machine;
  projects: Project[];
}

export function MachineCard({ machine, projects }: MachineCardProps) {
  const project = projects.find((p) => p.id === machine.project_id);

  return (
    <div className="group overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-5 backdrop-blur-sm transition-all duration-200 hover:border-border hover:shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="font-mono text-sm font-semibold">{machine.name}</h3>
          {project && (
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <span className="text-xs text-muted-foreground">{project.name}</span>
            </div>
          )}
        </div>
        <OsIcon os={machine.os} />
      </div>

      <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{machine.description}</p>

      <div className="mb-3">
        <IpBadge ip={machine.ip} isStatic={machine.is_static} staticLabel="Static" dhcpLabel="DHCP" />
      </div>

      {machine.tasks.length > 0 && (
        <div className="border-t border-border/50 pt-3">
          <TaskList tasks={machine.tasks} />
        </div>
      )}
    </div>
  );
}
