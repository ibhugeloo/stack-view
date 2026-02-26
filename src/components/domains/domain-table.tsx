"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ProviderBadge } from "./provider-badge";
import { ExternalLink, Check, X } from "lucide-react";
import { projects } from "@/data/mock-machines";
import type { Domain } from "@/data/mock-domains";
import type { Dictionary } from "@/lib/dictionaries";

interface DomainTableProps {
  domains: Domain[];
  dict: Dictionary;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function daysUntil(iso: string) {
  const now = new Date();
  const target = new Date(iso);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function DomainTable({ domains, dict }: DomainTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/50">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-medium">{dict.domains.domain}</TableHead>
            <TableHead className="font-medium">{dict.domains.provider}</TableHead>
            <TableHead className="font-medium">{dict.domains.project}</TableHead>
            <TableHead className="font-medium">{dict.domains.expires}</TableHead>
            <TableHead className="font-medium">{dict.domains.autoRenew}</TableHead>
            <TableHead className="font-medium text-right">{dict.domains.dashboard}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {domains.map((domain) => {
            const days = daysUntil(domain.expiresAt);
            const isExpiringSoon = days <= 90;
            const project = domain.projectId
              ? projects.find((p) => p.id === domain.projectId)
              : null;

            return (
              <TableRow key={domain.id} className="group">
                <TableCell className="font-mono text-sm font-medium">
                  {domain.name}
                </TableCell>
                <TableCell>
                  <ProviderBadge provider={domain.provider} />
                </TableCell>
                <TableCell>
                  {project ? (
                    <span className="inline-flex items-center gap-1.5 text-sm">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      {project.name}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {dict.domains.noProject}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-2 text-sm">
                    {formatDate(domain.expiresAt)}
                    {isExpiringSoon && (
                      <Badge
                        variant="destructive"
                        className="text-[10px] px-1.5 py-0"
                      >
                        {days}j
                      </Badge>
                    )}
                  </span>
                </TableCell>
                <TableCell>
                  {domain.autoRenew ? (
                    <span className="inline-flex items-center gap-1 text-sm text-emerald-600">
                      <Check className="h-3.5 w-3.5" />
                      {dict.domains.yes}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <X className="h-3.5 w-3.5" />
                      {dict.domains.no}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <a
                    href={domain.dashboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:bg-accent hover:text-foreground"
                  >
                    {dict.domains.openDashboard}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
