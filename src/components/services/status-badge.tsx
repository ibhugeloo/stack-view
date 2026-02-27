"use client";

import { statusMeta, type ServiceStatus } from "@/lib/types";
import type { Dictionary } from "@/lib/dictionaries";

const pulseAnimation: Record<ServiceStatus, string> = {
  running: "animate-[pulse-green_2s_ease-in-out_infinite]",
  stopped: "animate-[pulse-red_2s_ease-in-out_infinite]",
  degraded: "animate-[pulse-orange_2s_ease-in-out_infinite]",
  to_test: "",
};

interface StatusBadgeProps {
  status: ServiceStatus;
  dict: Dictionary;
}

export function StatusBadge({ status, dict }: StatusBadgeProps) {
  const meta = statusMeta[status];
  const label = dict.services[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: `${meta.color}15`,
        color: meta.color,
      }}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${pulseAnimation[status]}`}
        style={{ backgroundColor: meta.color }}
      />
      {label}
    </span>
  );
}
