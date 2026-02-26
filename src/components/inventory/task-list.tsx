"use client";

import { Check, Circle } from "lucide-react";
import type { Task } from "@/data/mock-machines";

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }

  const done = tasks.filter((t) => t.done).length;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>{done}/{tasks.length}</span>
        <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(done / tasks.length) * 100}%` }}
          />
        </div>
      </div>
      <ul className="space-y-0.5">
        {tasks.slice(0, 3).map((task, i) => (
          <li key={i} className="flex items-center gap-1.5 text-xs">
            {task.done ? (
              <Check className="h-3 w-3 text-primary" />
            ) : (
              <Circle className="h-3 w-3 text-muted-foreground" />
            )}
            <span className={task.done ? "text-muted-foreground line-through" : ""}>
              {task.label}
            </span>
          </li>
        ))}
        {tasks.length > 3 && (
          <li className="text-xs text-muted-foreground">+{tasks.length - 3} more</li>
        )}
      </ul>
    </div>
  );
}
