"use client";

import { useMemo } from "react";
import { Server, Wifi, WifiOff, FolderKanban, ListTodo } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { MachineCard } from "@/components/machines/machine-card";
import { useProject } from "@/providers/project-provider";
import type { Dictionary } from "@/lib/dictionaries";
import type { Machine, Project } from "@/lib/types";

interface DashboardContentProps {
  dict: Dictionary;
  machines: Machine[];
  projects: Project[];
}

export function DashboardContent({ dict, machines, projects }: DashboardContentProps) {
  const { selectedProjectId } = useProject();

  const filtered = useMemo(
    () =>
      selectedProjectId
        ? machines.filter((m) => m.project_id === selectedProjectId)
        : machines,
    [selectedProjectId, machines]
  );

  const stats = useMemo(() => {
    const staticIps = filtered.filter((m) => m.is_static).length;
    const activeTasks = filtered.reduce(
      (sum, m) => sum + m.tasks.filter((t) => !t.done).length,
      0
    );
    const uniqueProjects = new Set(filtered.map((m) => m.project_id)).size;

    return { total: filtered.length, staticIps, dhcp: filtered.length - staticIps, activeTasks, uniqueProjects };
  }, [filtered]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-sv-indigo dark:text-sv-cyan">{dict.dashboard.title}</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label={dict.dashboard.totalMachines} value={stats.total} icon={Server} color="#00D4AA" />
        <StatCard label={dict.dashboard.staticIps} value={stats.staticIps} icon={Wifi} color="#7C6FE0" />
        <StatCard label={dict.dashboard.dhcpIps} value={stats.dhcp} icon={WifiOff} color="#F0A030" />
        <StatCard label={dict.dashboard.projects} value={stats.uniqueProjects} icon={FolderKanban} color="#27187E" />
        <StatCard label={dict.dashboard.activeTasks} value={stats.activeTasks} icon={ListTodo} color="#E05A5A" />
      </div>

      <div>
        <h2 className="mb-4 font-heading text-lg font-semibold text-sv-indigo dark:text-sv-cyan">Machines</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((machine) => (
            <MachineCard key={machine.id} machine={machine} projects={projects} />
          ))}
        </div>
      </div>
    </div>
  );
}
