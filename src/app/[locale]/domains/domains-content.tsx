"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Globe,
  RefreshCw,
  AlertTriangle,
  Building2,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { DomainTable } from "@/components/domains/domain-table";
import { useProject } from "@/providers/project-provider";
import { domains, providerMeta } from "@/data/mock-domains";
import type { Dictionary } from "@/lib/dictionaries";

interface DomainsContentProps {
  dict: Dictionary;
}

function daysUntil(iso: string) {
  const now = new Date();
  const target = new Date(iso);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function DomainsContent({ dict }: DomainsContentProps) {
  const { selectedProjectId } = useProject();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = selectedProjectId
      ? domains.filter((d) => d.projectId === selectedProjectId)
      : domains;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          providerMeta[d.provider].label.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedProjectId, search]);

  const stats = useMemo(() => {
    const autoRenewCount = filtered.filter((d) => d.autoRenew).length;
    const expiringSoon = filtered.filter(
      (d) => daysUntil(d.expiresAt) <= 90
    ).length;
    const uniqueProviders = new Set(filtered.map((d) => d.provider)).size;

    return { total: filtered.length, autoRenewCount, expiringSoon, uniqueProviders };
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {dict.domains.title}
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={dict.domains.search}
            className="h-9 w-64 rounded-lg border border-border/50 bg-background/50 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-border focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={dict.domains.totalDomains}
          value={stats.total}
          icon={Globe}
          color="#3b82f6"
        />
        <StatCard
          label={dict.domains.autoRenewCount}
          value={stats.autoRenewCount}
          icon={RefreshCw}
          color="#10b981"
        />
        <StatCard
          label={dict.domains.expiringSoon}
          value={stats.expiringSoon}
          icon={AlertTriangle}
          color="#f59e0b"
        />
        <StatCard
          label={dict.domains.providers}
          value={stats.uniqueProviders}
          icon={Building2}
          color="#8b5cf6"
        />
      </div>

      <DomainTable domains={filtered} dict={dict} />
    </div>
  );
}
