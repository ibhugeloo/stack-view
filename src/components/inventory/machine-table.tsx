"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IpBadge } from "./ip-badge";
import { OsIcon } from "./os-icon";
import { TaskList } from "./task-list";
import { MachineFormDialog } from "@/components/machines/machine-form-dialog";
import { MachineDeleteButton } from "@/components/machines/machine-delete-button";
import type { Machine, Project } from "@/lib/types";
import type { Dictionary } from "@/lib/dictionaries";

interface MachineTableProps {
  machines: Machine[];
  projects: Project[];
  dict: Dictionary;
}

export function MachineTable({ machines, projects, dict }: MachineTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/50">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-medium">{dict.inventory.hostname}</TableHead>
            <TableHead className="font-medium">{dict.inventory.ip}</TableHead>
            <TableHead className="font-medium">{dict.inventory.os}</TableHead>
            <TableHead className="font-medium">{dict.inventory.description}</TableHead>
            <TableHead className="font-medium">{dict.inventory.tasks}</TableHead>
            <TableHead className="w-20" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {machines.map((machine) => (
            <TableRow key={machine.id} className="group">
              <TableCell className="font-mono text-sm font-medium">
                {machine.name}
              </TableCell>
              <TableCell>
                <IpBadge
                  ip={machine.ip}
                  isStatic={machine.is_static}
                  staticLabel={dict.inventory.static}
                  dhcpLabel={dict.inventory.dhcp}
                />
              </TableCell>
              <TableCell>
                <OsIcon os={machine.os} />
              </TableCell>
              <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                {machine.description}
              </TableCell>
              <TableCell>
                <TaskList tasks={machine.tasks} />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <MachineFormDialog dict={dict} projects={projects} machine={machine} />
                  <MachineDeleteButton id={machine.id} dict={dict} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
