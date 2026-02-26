"use client";

import { NetworkMap } from "@/components/topology/network-map";
import { useProject } from "@/providers/project-provider";
import type { Dictionary } from "@/lib/dictionaries";
import type { Machine, Project } from "@/lib/types";

interface TopologyContentProps {
  dict: Dictionary;
  machines: Machine[];
  projects: Project[];
}

export function TopologyContent({ dict, machines, projects }: TopologyContentProps) {
  const { selectedProjectId } = useProject();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">{dict.topology.title}</h1>
      <NetworkMap selectedProjectId={selectedProjectId} machines={machines} projects={projects} />
    </div>
  );
}
