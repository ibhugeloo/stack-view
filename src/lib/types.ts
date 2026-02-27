export interface Task {
  label: string;
  done: boolean;
}

export type OsType =
  | "ubuntu"
  | "debian"
  | "centos"
  | "windows"
  | "macos"
  | "proxmox"
  | "esxi"
  | "truenas"
  | "pfsense";

export type ServiceStatus = "running" | "stopped" | "degraded" | "to_test";

export type ServiceCategory =
  | "web"
  | "database"
  | "monitoring"
  | "storage"
  | "auth"
  | "devops"
  | "network"
  | "other";

export type DomainProvider =
  | "cloudflare"
  | "lws"
  | "ovh"
  | "gandi"
  | "namecheap"
  | "google";

export type ProjectEnvironment =
  | "production"
  | "staging"
  | "development"
  | "infrastructure";

export type ProjectStatus = "active" | "maintenance" | "archived";

export interface Project {
  id: string;
  user_id: string;
  name: string;
  color: string;
  description: string;
  environment: ProjectEnvironment;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface Machine {
  id: string;
  user_id: string;
  project_id: string | null;
  name: string;
  ip: string;
  is_static: boolean;
  os: OsType;
  description: string;
  tasks: Task[];
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  user_id: string;
  project_id: string | null;
  machine_id: string | null;
  name: string;
  description: string;
  category: ServiceCategory;
  status: ServiceStatus;
  url: string | null;
  port: number | null;
  tasks: Task[];
  created_at: string;
  updated_at: string;
}

export interface Domain {
  id: string;
  user_id: string;
  project_id: string | null;
  name: string;
  provider: DomainProvider;
  dashboard_url: string;
  expires_at: string;
  auto_renew: boolean;
  created_at: string;
  updated_at: string;
}

// Legacy meta kept for display purposes (categoryMeta, statusMeta, providerMeta)
export const categoryMeta: Record<
  ServiceCategory,
  { label: string; labelEn: string; color: string; icon: string }
> = {
  web:        { label: "Web",             labelEn: "Web",        color: "#3b82f6", icon: "🌐" },
  database:   { label: "Base de données", labelEn: "Database",   color: "#8b5cf6", icon: "🗄️" },
  monitoring: { label: "Monitoring",      labelEn: "Monitoring", color: "#f59e0b", icon: "📊" },
  storage:    { label: "Stockage",        labelEn: "Storage",    color: "#06b6d4", icon: "💾" },
  auth:       { label: "Auth",            labelEn: "Auth",       color: "#ec4899", icon: "🔐" },
  devops:     { label: "DevOps",          labelEn: "DevOps",     color: "#10b981", icon: "🚀" },
  network:    { label: "Réseau",          labelEn: "Network",    color: "#f97316", icon: "🔌" },
  other:      { label: "Autre",           labelEn: "Other",      color: "#6b7280", icon: "📦" },
};

export const statusMeta: Record<
  ServiceStatus,
  { label: string; labelEn: string; color: string }
> = {
  running:  { label: "Actif",    labelEn: "Running",  color: "#00D4AA" },
  stopped:  { label: "Arrêté",   labelEn: "Stopped",  color: "#E05A5A" },
  degraded: { label: "Dégradé",  labelEn: "Degraded", color: "#F0A030" },
  to_test:  { label: "À tester", labelEn: "To Test",  color: "#7C6FE0" },
};

export const providerMeta: Record<
  DomainProvider,
  { label: string; color: string; icon: string }
> = {
  cloudflare: { label: "Cloudflare",      color: "#f38020", icon: "☁️" },
  lws:        { label: "LWS",             color: "#0072ce", icon: "🌐" },
  ovh:        { label: "OVH",             color: "#000e9c", icon: "🔷" },
  gandi:      { label: "Gandi",           color: "#8B4513", icon: "🟤" },
  namecheap:  { label: "Namecheap",       color: "#de5833", icon: "🔶" },
  google:     { label: "Google Domains",  color: "#4285f4", icon: "🔵" },
};
