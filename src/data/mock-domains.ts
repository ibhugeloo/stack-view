export type DomainProvider = "cloudflare" | "lws" | "ovh" | "gandi" | "namecheap" | "google";

export interface Domain {
  id: string;
  name: string;
  provider: DomainProvider;
  dashboardUrl: string;
  expiresAt: string;
  autoRenew: boolean;
  projectId: string | null;
}

export const providerMeta: Record<
  DomainProvider,
  { label: string; color: string; icon: string }
> = {
  cloudflare: { label: "Cloudflare", color: "#f38020", icon: "☁️" },
  lws: { label: "LWS", color: "#0072ce", icon: "🌐" },
  ovh: { label: "OVH", color: "#000e9c", icon: "🔷" },
  gandi: { label: "Gandi", color: "#8B4513", icon: "🟤" },
  namecheap: { label: "Namecheap", color: "#de5833", icon: "🔶" },
  google: { label: "Google Domains", color: "#4285f4", icon: "🔵" },
};

export const domains: Domain[] = [
  {
    id: "dom-1",
    name: "stackview.dev",
    provider: "cloudflare",
    dashboardUrl: "https://dash.cloudflare.com",
    expiresAt: "2027-03-15",
    autoRenew: true,
    projectId: "production",
  },
  {
    id: "dom-2",
    name: "stackview.fr",
    provider: "lws",
    dashboardUrl: "https://panel.lws.fr",
    expiresAt: "2026-11-20",
    autoRenew: true,
    projectId: "production",
  },
  {
    id: "dom-3",
    name: "myhomelabstuff.com",
    provider: "ovh",
    dashboardUrl: "https://www.ovh.com/manager",
    expiresAt: "2026-06-01",
    autoRenew: false,
    projectId: "homelab",
  },
  {
    id: "dom-4",
    name: "staging-app.io",
    provider: "namecheap",
    dashboardUrl: "https://ap.www.namecheap.com",
    expiresAt: "2026-09-10",
    autoRenew: true,
    projectId: "staging",
  },
  {
    id: "dom-5",
    name: "netops-tools.org",
    provider: "gandi",
    dashboardUrl: "https://admin.gandi.net",
    expiresAt: "2026-04-05",
    autoRenew: false,
    projectId: "network",
  },
  {
    id: "dom-6",
    name: "idriss-chen.dev",
    provider: "cloudflare",
    dashboardUrl: "https://dash.cloudflare.com",
    expiresAt: "2027-01-22",
    autoRenew: true,
    projectId: null,
  },
];
