"use client";

import { memo } from "react";
import type { NodeProps } from "@xyflow/react";

interface GroupData {
  label: string;
  color: string;
  width: number;
  height: number;
  [key: string]: unknown;
}

function ProjectGroupComponent({ data }: NodeProps) {
  const groupData = data as unknown as GroupData;

  return (
    <div
      className="rounded-2xl border-2 border-dashed"
      style={{
        width: groupData.width,
        height: groupData.height,
        borderColor: `${groupData.color}40`,
        backgroundColor: `${groupData.color}08`,
      }}
    >
      <div
        className="inline-flex items-center gap-1.5 rounded-br-lg rounded-tl-xl px-3 py-1.5"
        style={{ backgroundColor: `${groupData.color}15` }}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: groupData.color }}
        />
        <span className="text-xs font-medium" style={{ color: groupData.color }}>
          {groupData.label}
        </span>
      </div>
    </div>
  );
}

export const ProjectGroup = memo(ProjectGroupComponent);
