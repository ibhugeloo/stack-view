"use client";

import { Badge } from "@/components/ui/badge";

interface IpBadgeProps {
  ip: string;
  isStatic: boolean;
  staticLabel: string;
  dhcpLabel: string;
}

export function IpBadge({ ip, isStatic, staticLabel, dhcpLabel }: IpBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <code className="text-sm font-heading">{ip}</code>
      <Badge
        variant={isStatic ? "default" : "secondary"}
        className="text-[10px] font-medium px-1.5 py-0"
      >
        {isStatic ? staticLabel : dhcpLabel}
      </Badge>
    </div>
  );
}
