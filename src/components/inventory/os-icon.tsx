"use client";

import {
  Monitor,
  HardDrive,
  Shield,
  Server,
  Database,
} from "lucide-react";

const osConfig: Record<string, { icon: typeof Monitor; label: string; color: string }> = {
  ubuntu: { icon: Monitor, label: "Ubuntu", color: "#E95420" },
  debian: { icon: Monitor, label: "Debian", color: "#A80030" },
  centos: { icon: Monitor, label: "CentOS", color: "#932279" },
  windows: { icon: Monitor, label: "Windows", color: "#0078D4" },
  macos: { icon: Monitor, label: "macOS", color: "#555555" },
  proxmox: { icon: Server, label: "Proxmox", color: "#E57000" },
  esxi: { icon: Server, label: "ESXi", color: "#6DB33F" },
  truenas: { icon: Database, label: "TrueNAS", color: "#0095D5" },
  pfsense: { icon: Shield, label: "pfSense", color: "#212121" },
};

interface OsIconProps {
  os: string;
}

export function OsIcon({ os }: OsIconProps) {
  const config = osConfig[os] || { icon: HardDrive, label: os, color: "#888" };
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4" style={{ color: config.color }} />
      <span className="text-sm">{config.label}</span>
    </div>
  );
}
