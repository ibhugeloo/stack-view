"use client";

import { providerMeta, type DomainProvider } from "@/data/mock-domains";

interface ProviderBadgeProps {
  provider: DomainProvider;
}

export function ProviderBadge({ provider }: ProviderBadgeProps) {
  const meta = providerMeta[provider];

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
