"use client";

import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color?: string;
}

export function StatCard({ label, value, icon: Icon, color = "#00D4AA" }: StatCardProps) {
  return (
    <div className="glass-card glass-reflection hover-lift relative overflow-hidden rounded-2xl p-5">
      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-2">
          <p className="label-caps font-medium">{label}</p>
          <p className="font-heading text-4xl font-bold tabular-nums text-sv-indigo dark:text-sv-cyan">{value}</p>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${color}15`,
            boxShadow: `0 0 20px ${color}20`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
      </div>
    </div>
  );
}
