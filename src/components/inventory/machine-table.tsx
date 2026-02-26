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
import type { Machine } from "@/data/mock-machines";
import type { Dictionary } from "@/lib/dictionaries";

interface MachineTableProps {
  machines: Machine[];
  dict: Dictionary;
}

export function MachineTable({ machines, dict }: MachineTableProps) {
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
                  isStatic={machine.isStatic}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
