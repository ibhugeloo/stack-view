"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Server, Shield, Database, Monitor, HardDrive } from "lucide-react";

const osIcons: Record<string, typeof Server> = {
  ubuntu: Monitor,
  debian: Monitor,
  centos: Monitor,
  windows: Monitor,
  macos: Monitor,
  proxmox: Server,
  esxi: Server,
  truenas: Database,
  pfsense: Shield,
};

interface MachineNodeData {
  label: string;
  ip: string;
  os: string;
  projectColor: string;
  [key: string]: unknown;
}

function MachineNodeComponent({ data }: NodeProps) {
  const nodeData = data as unknown as MachineNodeData;
  const Icon = osIcons[nodeData.os] || HardDrive;

  return (
    <div className="group relative">
      <Handle type="target" position={Position.Top} className="!bg-border" />
      <div
        className="flex min-w-[140px] items-center gap-2.5 rounded-xl border border-border/50 bg-card/95 px-3.5 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-150 hover:border-border hover:shadow-md"
        style={{ borderLeftWidth: 3, borderLeftColor: nodeData.projectColor }}
      >
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0">
          <p className="truncate font-mono text-xs font-semibold">{nodeData.label}</p>
          <p className="truncate text-[10px] text-muted-foreground">{nodeData.ip}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-border" />
    </div>
  );
}

export const MachineNode = memo(MachineNodeComponent);
