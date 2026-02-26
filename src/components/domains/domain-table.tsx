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
import { DomainFormDialog } from "./domain-form-dialog";
import { DomainDeleteButton } from "./domain-delete-button";
import { ExternalLink, Check, X } from "lucide-react";
import type { Domain, Project } from "@/lib/types";
import type { Dictionary } from "@/lib/dictionaries";

interface DomainTableProps {
  domains: Domain[];
  projects: Project[];
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

export function DomainTable({ domains, projects, dict }: DomainTableProps) {
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
            <TableHead className="w-20" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {domains.map((domain) => {
            const days = daysUntil(domain.expires_at);
            const isExpiringSoon = days <= 90;
            const project = domain.project_id
              ? projects.find((p) => p.id === domain.project_id)
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
                    {formatDate(domain.expires_at)}
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
                  {domain.auto_renew ? (
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
                    href={domain.dashboard_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:bg-accent hover:text-foreground"
                  >
                    {dict.domains.openDashboard}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <DomainFormDialog dict={dict} projects={projects} domain={domain} />
                    <DomainDeleteButton id={domain.id} dict={dict} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
