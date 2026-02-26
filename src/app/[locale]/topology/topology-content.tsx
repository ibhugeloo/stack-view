"use client";

import { NetworkMap } from "@/components/topology/network-map";
import { useProject } from "@/providers/project-provider";
import type { Dictionary } from "@/lib/dictionaries";

interface TopologyContentProps {
  dict: Dictionary;
}

export function TopologyContent({ dict }: TopologyContentProps) {
  const { selectedProjectId } = useProject();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">{dict.topology.title}</h1>
      <NetworkMap selectedProjectId={selectedProjectId} />
    </div>
  );
}
