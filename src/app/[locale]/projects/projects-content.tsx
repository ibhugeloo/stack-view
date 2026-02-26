"use client";

import { useMemo, useState } from "react";
import {
  Search,
  FolderKanban,
  FolderCheck,
  Server,
  Boxes,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProjectCard } from "@/components/projects/project-card";
import { projects, machines } from "@/data/mock-machines";
import { services } from "@/data/mock-services";
import { domains } from "@/data/mock-domains";
import type { Dictionary } from "@/lib/dictionaries";

interface ProjectsContentProps {
  dict: Dictionary;
}

export function ProjectsContent({ dict }: ProjectsContentProps) {
  const [search, setSearch] = useState("");

  const projectsWithStats = useMemo(() => {
    return projects.map((project) => {
      const projectMachines = machines.filter(
        (m) => m.projectId === project.id
      );
      const projectServices = services.filter(
        (s) => s.projectId === project.id
      );
      const projectDomains = domains.filter(
        (d) => d.projectId === project.id
      );

      // Aggregate tasks from machines + services
      const machineTasks = projectMachines.flatMap((m) => m.tasks);
      const serviceTasks = projectServices.flatMap((s) => s.tasks);
      const allTasks = [...machineTasks, ...serviceTasks];

      return {
        project,
        stats: {
          machineCount: projectMachines.length,
          serviceCount: projectServices.length,
          domainCount: projectDomains.length,
          tasksDone: allTasks.filter((t) => t.done).length,
          tasksTotal: allTasks.length,
        },
      };
    });
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return projectsWithStats;
    const q = search.toLowerCase();
    return projectsWithStats.filter(
      ({ project }) =>
        project.name.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q)
    );
  }, [projectsWithStats, search]);

  const globalStats = useMemo(() => {
    const active = projects.filter((p) => p.status === "active").length;
    const totalMachines = machines.length;
    const totalServices = services.length;
    return {
      total: projects.length,
      active,
      totalMachines,
      totalServices,
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {dict.projects.title}
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={dict.projects.search}
            className="h-9 w-64 rounded-lg border border-border/50 bg-background/50 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-border focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={dict.projects.totalProjects}
          value={globalStats.total}
          icon={FolderKanban}
          color="#3b82f6"
        />
        <StatCard
          label={dict.projects.activeProjects}
          value={globalStats.active}
          icon={FolderCheck}
          color="#10b981"
        />
        <StatCard
          label={dict.projects.totalMachines}
          value={globalStats.totalMachines}
          icon={Server}
          color="#f59e0b"
        />
        <StatCard
          label={dict.projects.totalServices}
          value={globalStats.totalServices}
          icon={Boxes}
          color="#8b5cf6"
        />
      </div>

      {/* Project cards grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {filtered.map(({ project, stats }) => (
          <ProjectCard
            key={project.id}
            project={project}
            stats={stats}
            dict={dict}
          />
        ))}
      </div>
    </div>
  );
}
