"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { MachineNode } from "./machine-node";
import { ProjectGroup } from "./project-group";
import type { Machine, Project } from "@/lib/types";

const nodeTypes = {
  machine: MachineNode,
  projectGroup: ProjectGroup,
};

function buildTopology(filteredMachines: Machine[], projects: Project[]) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const groupedByProject: Record<string, Machine[]> = {};
  for (const m of filteredMachines) {
    const key = m.project_id ?? "none";
    if (!groupedByProject[key]) groupedByProject[key] = [];
    groupedByProject[key].push(m);
  }

  const projectIds = Object.keys(groupedByProject);
  const groupWidth = 300;
  const groupPadding = 40;

  projectIds.forEach((projectId, pIdx) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const groupMachines = groupedByProject[projectId];
    const groupX = pIdx * (groupWidth + 60);
    const groupHeight = groupMachines.length * 70 + 80;

    nodes.push({
      id: `group-${projectId}`,
      type: "projectGroup",
      position: { x: groupX, y: 0 },
      data: {
        label: project.name,
        color: project.color,
        width: groupWidth,
        height: groupHeight,
      },
      draggable: false,
      selectable: false,
    });

    groupMachines.forEach((machine, mIdx) => {
      nodes.push({
        id: machine.id,
        type: "machine",
        position: { x: groupX + groupPadding, y: 50 + mIdx * 70 },
        data: {
          label: machine.name,
          ip: machine.ip,
          os: machine.os,
          projectColor: project.color,
        },
      });

      if (mIdx > 0) {
        edges.push({
          id: `e-${groupMachines[mIdx - 1].id}-${machine.id}`,
          source: groupMachines[mIdx - 1].id,
          target: machine.id,
          style: { stroke: `${project.color}60`, strokeWidth: 1.5 },
          animated: true,
        });
      }
    });
  });

  // Connect firewalls/routers to other groups
  const firewall = filteredMachines.find((m) => m.os === "pfsense");
  if (firewall) {
    projectIds.forEach((projectId) => {
      if (projectId === (firewall.project_id ?? "none")) return;
      const firstInGroup = groupedByProject[projectId]?.[0];
      if (firstInGroup) {
        edges.push({
          id: `e-fw-${firstInGroup.id}`,
          source: firewall.id,
          target: firstInGroup.id,
          style: { stroke: "#888", strokeWidth: 1, strokeDasharray: "5 5" },
        });
      }
    });
  }

  return { nodes, edges };
}

interface NetworkMapProps {
  selectedProjectId: string | null;
  machines: Machine[];
  projects: Project[];
}

export function NetworkMap({ selectedProjectId, machines, projects }: NetworkMapProps) {
  const filteredMachines = useMemo(
    () =>
      selectedProjectId
        ? machines.filter((m) => m.project_id === selectedProjectId)
        : machines,
    [selectedProjectId, machines]
  );

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildTopology(filteredMachines, projects),
    [filteredMachines, projects]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-[calc(100vh-8rem)] w-full overflow-hidden rounded-xl border border-border/50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e5e5e5" />
        <Controls className="!rounded-lg !border-border/50 !shadow-sm" />
      </ReactFlow>
    </div>
  );
}
