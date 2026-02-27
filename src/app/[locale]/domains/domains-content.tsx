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
import { DomainFormDialog } from "@/components/domains/domain-form-dialog";
import { useProject } from "@/providers/project-provider";
import { providerMeta } from "@/lib/types";
import type { Domain, Project } from "@/lib/types";
import type { Dictionary } from "@/lib/dictionaries";

interface DomainsContentProps {
  dict: Dictionary;
  domains: Domain[];
  projects: Project[];
}

function daysUntil(iso: string) {
  const now = new Date();
  const target = new Date(iso);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function DomainsContent({ dict, domains, projects }: DomainsContentProps) {
  const { selectedProjectId } = useProject();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = selectedProjectId
      ? domains.filter((d) => d.project_id === selectedProjectId)
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
  }, [selectedProjectId, search, domains]);

  const stats = useMemo(() => {
    const autoRenewCount = filtered.filter((d) => d.auto_renew).length;
    const expiringSoon = filtered.filter(
      (d) => daysUntil(d.expires_at) <= 90
    ).length;
    const uniqueProviders = new Set(filtered.map((d) => d.provider)).size;

    return { total: filtered.length, autoRenewCount, expiringSoon, uniqueProviders };
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-sv-indigo dark:text-sv-cyan">
          {dict.domains.title}
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={dict.domains.search}
              className="input-glass w-64 pl-9 pr-3"
            />
          </div>
          <DomainFormDialog dict={dict} projects={projects} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={dict.domains.totalDomains}
          value={stats.total}
          icon={Globe}
          color="#00D4AA"
        />
        <StatCard
          label={dict.domains.autoRenewCount}
          value={stats.autoRenewCount}
          icon={RefreshCw}
          color="#7C6FE0"
        />
        <StatCard
          label={dict.domains.expiringSoon}
          value={stats.expiringSoon}
          icon={AlertTriangle}
          color="#F0A030"
        />
        <StatCard
          label={dict.domains.providers}
          value={stats.uniqueProviders}
          icon={Building2}
          color="#27187E"
        />
      </div>

      <DomainTable domains={filtered} dict={dict} projects={projects} />
    </div>
  );
}
