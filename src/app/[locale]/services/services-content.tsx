"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Boxes,
  Activity,
  FlaskConical,
  Layers,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ServiceTable } from "@/components/services/service-table";
import { useProject } from "@/providers/project-provider";
import {
  services,
  categoryMeta,
  statusMeta,
  type ServiceStatus,
} from "@/data/mock-services";
import type { Dictionary } from "@/lib/dictionaries";

interface ServicesContentProps {
  dict: Dictionary;
}

export function ServicesContent({ dict }: ServicesContentProps) {
  const { selectedProjectId } = useProject();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ServiceStatus | "all">(
    "all"
  );

  const filtered = useMemo(() => {
    let result = selectedProjectId
      ? services.filter((s) => s.projectId === selectedProjectId)
      : services;

    if (statusFilter !== "all") {
      result = result.filter((s) => s.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          categoryMeta[s.category].label.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedProjectId, statusFilter, search]);

  const stats = useMemo(() => {
    const base = selectedProjectId
      ? services.filter((s) => s.projectId === selectedProjectId)
      : services;

    const running = base.filter((s) => s.status === "running").length;
    const toTest = base.filter((s) => s.status === "to_test").length;
    const uniqueCategories = new Set(base.map((s) => s.category)).size;

    return { total: base.length, running, toTest, uniqueCategories };
  }, [selectedProjectId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {dict.services.title}
        </h1>
        <div className="flex items-center gap-3">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ServiceStatus | "all")
            }
            className="h-9 rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-border focus:ring-1 focus:ring-ring"
          >
            <option value="all">{dict.services.allStatuses}</option>
            {(
              Object.keys(statusMeta) as ServiceStatus[]
            ).map((status) => (
              <option key={status} value={status}>
                {dict.services[status]}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={dict.services.search}
              className="h-9 w-64 rounded-lg border border-border/50 bg-background/50 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-border focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={dict.services.totalServices}
          value={stats.total}
          icon={Boxes}
          color="#3b82f6"
        />
        <StatCard
          label={dict.services.runningCount}
          value={stats.running}
          icon={Activity}
          color="#10b981"
        />
        <StatCard
          label={dict.services.toTestCount}
          value={stats.toTest}
          icon={FlaskConical}
          color="#6366f1"
        />
        <StatCard
          label={dict.services.categories}
          value={stats.uniqueCategories}
          icon={Layers}
          color="#f59e0b"
        />
      </div>

      {/* Table */}
      <ServiceTable services={filtered} dict={dict} />
    </div>
  );
}
