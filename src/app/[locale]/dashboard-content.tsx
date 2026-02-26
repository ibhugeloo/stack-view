"use client";

import { useMemo } from "react";
import { Server, Wifi, WifiOff, FolderKanban, ListTodo } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { MachineCard } from "@/components/machines/machine-card";
import { useProject } from "@/providers/project-provider";
import { machines, projects } from "@/data/mock-machines";
import type { Dictionary } from "@/lib/dictionaries";

interface DashboardContentProps {
  dict: Dictionary;
}

export function DashboardContent({ dict }: DashboardContentProps) {
  const { selectedProjectId } = useProject();

  const filtered = useMemo(
    () =>
      selectedProjectId
        ? machines.filter((m) => m.projectId === selectedProjectId)
        : machines,
    [selectedProjectId]
  );

  const stats = useMemo(() => {
    const staticIps = filtered.filter((m) => m.isStatic).length;
    const activeTasks = filtered.reduce(
      (sum, m) => sum + m.tasks.filter((t) => !t.done).length,
      0
    );
    const uniqueProjects = new Set(filtered.map((m) => m.projectId)).size;

    return { total: filtered.length, staticIps, dhcp: filtered.length - staticIps, activeTasks, uniqueProjects };
  }, [filtered]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{dict.dashboard.title}</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label={dict.dashboard.totalMachines} value={stats.total} icon={Server} color="#3b82f6" />
        <StatCard label={dict.dashboard.staticIps} value={stats.staticIps} icon={Wifi} color="#10b981" />
        <StatCard label={dict.dashboard.dhcpIps} value={stats.dhcp} icon={WifiOff} color="#f59e0b" />
        <StatCard label={dict.dashboard.projects} value={stats.uniqueProjects} icon={FolderKanban} color="#8b5cf6" />
        <StatCard label={dict.dashboard.activeTasks} value={stats.activeTasks} icon={ListTodo} color="#ef4444" />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium tracking-tight">Machines</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      </div>
    </div>
  );
}
