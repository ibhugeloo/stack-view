"use client";

import {
  Server,
  Boxes,
  Globe,
  CheckCircle2,
  Circle,
} from "lucide-react";
import type { Project } from "@/lib/types";
import type { Dictionary } from "@/lib/dictionaries";

interface ProjectStats {
  machineCount: number;
  serviceCount: number;
  domainCount: number;
  tasksDone: number;
  tasksTotal: number;
}

interface ProjectCardProps {
  project: Project;
  stats: ProjectStats;
  dict: Dictionary;
}

export function ProjectCard({ project, stats, dict }: ProjectCardProps) {
  const taskPercent =
    stats.tasksTotal > 0
      ? Math.round((stats.tasksDone / stats.tasksTotal) * 100)
      : 0;

  const envLabel =
    dict.projects[project.environment as keyof typeof dict.projects] as string;
  const statusLabel =
    dict.projects[project.status as keyof typeof dict.projects] as string;

  const statusColor =
    project.status === "active"
      ? "#10b981"
      : project.status === "maintenance"
        ? "#f59e0b"
        : "#6b7280";

  return (
    <div className="glass-card glass-reflection hover-lift group relative overflow-hidden rounded-2xl p-6">
      {/* Color accent bar */}
      <div
        className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
        style={{ backgroundColor: project.color }}
      />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${project.color}15` }}
            >
              <span
                className="text-sm font-bold"
                style={{ color: project.color }}
              >
                {project.name.charAt(0)}
              </span>
            </div>
            <h3 className="text-lg font-semibold tracking-tight">
              {project.name}
            </h3>
          </div>
          <p className="pl-[42px] text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>
      </div>

      {/* Status & Environment badges */}
      <div className="mt-4 flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: `${statusColor}15`,
            color: statusColor,
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: statusColor }}
          />
          {statusLabel}
        </span>
        <span className="inline-flex items-center rounded-full bg-sv-violet/10 px-2.5 py-0.5 text-xs font-medium text-sv-violet">
          {envLabel}
        </span>
      </div>

      {/* Resource counts */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-sv-indigo/[0.03] px-3 py-2">
          <Server className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-sm font-medium">{stats.machineCount}</span>
          <span className="text-xs text-muted-foreground">
            {dict.projects.machines}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-sv-indigo/[0.03] px-3 py-2">
          <Boxes className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-sm font-medium">{stats.serviceCount}</span>
          <span className="text-xs text-muted-foreground">
            {dict.projects.services}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-sv-indigo/[0.03] px-3 py-2">
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-sm font-medium">{stats.domainCount}</span>
          <span className="text-xs text-muted-foreground">
            {dict.projects.domains}
          </span>
        </div>
      </div>

      {/* Task progress */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-muted-foreground">
            {dict.projects.taskProgress}
          </span>
          <span className="font-medium">
            {stats.tasksDone}/{stats.tasksTotal}{" "}
            <span className="text-muted-foreground">{dict.projects.done}</span>
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${taskPercent}%`,
              backgroundColor: project.color,
            }}
          />
        </div>
        <div className="flex items-center justify-end text-xs text-muted-foreground">
          {taskPercent}%
        </div>
      </div>
    </div>
  );
}
