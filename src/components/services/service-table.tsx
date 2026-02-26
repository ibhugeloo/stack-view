"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./status-badge";
import { CategoryBadge } from "./category-badge";
import { ExternalLink, Check, Circle } from "lucide-react";
import { machines, projects } from "@/data/mock-machines";
import type { Service } from "@/data/mock-services";
import type { Dictionary } from "@/lib/dictionaries";

interface ServiceTableProps {
  services: Service[];
  dict: Dictionary;
}

export function ServiceTable({ services, dict }: ServiceTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/50">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-medium">{dict.services.name}</TableHead>
            <TableHead className="font-medium">{dict.services.category}</TableHead>
            <TableHead className="font-medium">{dict.services.status}</TableHead>
            <TableHead className="font-medium">{dict.services.machine}</TableHead>
            <TableHead className="font-medium">{dict.services.port}</TableHead>
            <TableHead className="font-medium">{dict.services.tasks}</TableHead>
            <TableHead className="font-medium text-right">{dict.services.url}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((svc) => {
            const machine = svc.machineId
              ? machines.find((m) => m.id === svc.machineId)
              : null;
            const project = svc.projectId
              ? projects.find((p) => p.id === svc.projectId)
              : null;
            const done = svc.tasks.filter((t) => t.done).length;

            return (
              <TableRow key={svc.id} className="group">
                {/* Name + description */}
                <TableCell>
                  <div className="space-y-0.5">
                    <p className="font-mono text-sm font-medium">{svc.name}</p>
                    <p className="max-w-xs truncate text-xs text-muted-foreground">
                      {svc.description}
                    </p>
                  </div>
                </TableCell>

                {/* Category */}
                <TableCell>
                  <CategoryBadge category={svc.category} />
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge status={svc.status} dict={dict} />
                </TableCell>

                {/* Machine */}
                <TableCell>
                  {machine ? (
                    <span className="inline-flex items-center gap-1.5 text-sm">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: project?.color ?? "#6b7280",
                        }}
                      />
                      <span className="font-mono text-xs">{machine.name}</span>
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {dict.services.noMachine}
                    </span>
                  )}
                </TableCell>

                {/* Port */}
                <TableCell>
                  {svc.port ? (
                    <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                      :{svc.port}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>

                {/* Tasks */}
                <TableCell>
                  {svc.tasks.length === 0 ? (
                    <span className="text-xs text-muted-foreground">—</span>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>
                          {done}/{svc.tasks.length}
                        </span>
                        <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{
                              width: `${(done / svc.tasks.length) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <ul className="space-y-0.5">
                        {svc.tasks.slice(0, 2).map((task, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-1.5 text-xs"
                          >
                            {task.done ? (
                              <Check className="h-3 w-3 text-primary" />
                            ) : (
                              <Circle className="h-3 w-3 text-muted-foreground" />
                            )}
                            <span
                              className={
                                task.done
                                  ? "text-muted-foreground line-through"
                                  : ""
                              }
                            >
                              {task.label}
                            </span>
                          </li>
                        ))}
                        {svc.tasks.length > 2 && (
                          <li className="text-xs text-muted-foreground">
                            +{svc.tasks.length - 2} more
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </TableCell>

                {/* URL */}
                <TableCell className="text-right">
                  {svc.url ? (
                    <a
                      href={svc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:bg-accent hover:text-foreground"
                    >
                      {dict.services.open}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {dict.services.noUrl}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
