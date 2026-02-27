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
import { ProjectFormDialog } from "@/components/projects/project-form-dialog";
import { ProjectDeleteButton } from "@/components/projects/project-delete-button";
import type { Dictionary } from "@/lib/dictionaries";
import type { Project, Machine, Service, Domain } from "@/lib/types";

interface ProjectsContentProps {
  dict: Dictionary;
  projects: Project[];
  machines: Machine[];
  services: Service[];
  domains: Domain[];
}

export function ProjectsContent({ dict, projects, machines, services, domains }: ProjectsContentProps) {
  const [search, setSearch] = useState("");

  const projectsWithStats = useMemo(() => {
    return projects.map((project) => {
      const projectMachines = machines.filter(
        (m) => m.project_id === project.id
      );
      const projectServices = services.filter(
        (s) => s.project_id === project.id
      );
      const projectDomains = domains.filter(
        (d) => d.project_id === project.id
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
  }, [projects, machines, services, domains]);

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
  }, [projects, machines, services]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-sv-indigo dark:text-sv-cyan">
          {dict.projects.title}
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={dict.projects.search}
              className="input-glass w-64 pl-9 pr-3"
            />
          </div>
          <ProjectFormDialog dict={dict} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={dict.projects.totalProjects}
          value={globalStats.total}
          icon={FolderKanban}
          color="#00D4AA"
        />
        <StatCard
          label={dict.projects.activeProjects}
          value={globalStats.active}
          icon={FolderCheck}
          color="#7C6FE0"
        />
        <StatCard
          label={dict.projects.totalMachines}
          value={globalStats.totalMachines}
          icon={Server}
          color="#F0A030"
        />
        <StatCard
          label={dict.projects.totalServices}
          value={globalStats.totalServices}
          icon={Boxes}
          color="#27187E"
        />
      </div>

      {/* Project cards grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {filtered.map(({ project, stats }) => (
          <div key={project.id} className="relative group/card">
            <ProjectCard project={project} stats={stats} dict={dict} />
            <div className="absolute right-4 top-4 flex items-center gap-1 opacity-0 transition-opacity group-hover/card:opacity-100">
              <ProjectFormDialog dict={dict} project={project} />
              <ProjectDeleteButton id={project.id} dict={dict} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
