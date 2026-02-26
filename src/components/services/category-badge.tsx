"use client";

import { categoryMeta, type ServiceCategory } from "@/data/mock-services";

interface CategoryBadgeProps {
  category: ServiceCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const meta = categoryMeta[category];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: `${meta.color}12`,
        color: meta.color,
      }}
    >
      <span>{meta.icon}</span>
      {meta.label}
    </span>
  );
}
