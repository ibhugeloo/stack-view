export type ServiceStatus = "running" | "stopped" | "degraded" | "to_test";

export type ServiceCategory = "web" | "database" | "monitoring" | "storage" | "auth" | "devops" | "network" | "other";

export interface ServiceTask {
  label: string;
  done: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  status: ServiceStatus;
  url: string | null;
  machineId: string | null;
  projectId: string | null;
  port: number | null;
  tasks: ServiceTask[];
}

export const categoryMeta: Record<
  ServiceCategory,
  { label: string; labelEn: string; color: string; icon: string }
> = {
  web:        { label: "Web",          labelEn: "Web",          color: "#3b82f6", icon: "🌐" },
  database:   { label: "Base de données", labelEn: "Database",  color: "#8b5cf6", icon: "🗄️" },
  monitoring: { label: "Monitoring",   labelEn: "Monitoring",   color: "#f59e0b", icon: "📊" },
  storage:    { label: "Stockage",     labelEn: "Storage",      color: "#06b6d4", icon: "💾" },
  auth:       { label: "Auth",         labelEn: "Auth",         color: "#ec4899", icon: "🔐" },
  devops:     { label: "DevOps",       labelEn: "DevOps",       color: "#10b981", icon: "🚀" },
  network:    { label: "Réseau",       labelEn: "Network",      color: "#f97316", icon: "🔌" },
  other:      { label: "Autre",        labelEn: "Other",        color: "#6b7280", icon: "📦" },
};

export const statusMeta: Record<
  ServiceStatus,
  { label: string; labelEn: string; color: string }
> = {
  running:  { label: "Actif",    labelEn: "Running",  color: "#10b981" },
  stopped:  { label: "Arrêté",   labelEn: "Stopped",  color: "#ef4444" },
  degraded: { label: "Dégradé",  labelEn: "Degraded", color: "#f59e0b" },
  to_test:  { label: "À tester", labelEn: "To Test",  color: "#6366f1" },
};

export const services: Service[] = [
  {
    id: "svc-1",
    name: "Nginx",
    description: "Reverse proxy & load balancer principal",
    category: "web",
    status: "running",
    url: "https://stackview.dev",
    machineId: "web-prod-01",
    projectId: "production",
    port: 443,
    tasks: [
      { label: "Configurer rate limiting", done: false },
      { label: "Activer HTTP/3", done: false },
      { label: "Renouveler certificat wildcard", done: true },
    ],
  },
  {
    id: "svc-2",
    name: "PostgreSQL",
    description: "Base de données relationnelle production",
    category: "database",
    status: "running",
    url: null,
    machineId: "db-prod-01",
    projectId: "production",
    port: 5432,
    tasks: [
      { label: "Configurer réplication streaming", done: false },
      { label: "Mettre en place pg_basebackup", done: false },
      { label: "Optimiser requêtes lentes", done: true },
    ],
  },
  {
    id: "svc-3",
    name: "Grafana",
    description: "Dashboards de monitoring & alerting",
    category: "monitoring",
    status: "running",
    url: "http://192.168.1.50:3000",
    machineId: "monitor-01",
    projectId: "homelab",
    port: 3000,
    tasks: [
      { label: "Créer dashboard réseau", done: false },
      { label: "Configurer alertes Slack", done: true },
    ],
  },
  {
    id: "svc-4",
    name: "Prometheus",
    description: "Collecte de métriques & time-series",
    category: "monitoring",
    status: "running",
    url: "http://192.168.1.50:9090",
    machineId: "monitor-01",
    projectId: "homelab",
    port: 9090,
    tasks: [
      { label: "Ajouter node_exporter sur toutes les machines", done: false },
      { label: "Configurer rétention 30j", done: true },
    ],
  },
  {
    id: "svc-5",
    name: "Traefik",
    description: "Reverse proxy Docker avec auto-discovery",
    category: "devops",
    status: "to_test",
    url: null,
    machineId: "docker-01",
    projectId: "homelab",
    port: 8080,
    tasks: [
      { label: "Installer via Docker Compose", done: false },
      { label: "Configurer Let's Encrypt auto", done: false },
      { label: "Tester routing par labels", done: false },
      { label: "Migrer services depuis Nginx local", done: false },
    ],
  },
  {
    id: "svc-6",
    name: "MinIO",
    description: "Stockage S3-compatible self-hosted",
    category: "storage",
    status: "to_test",
    url: null,
    machineId: "nas-01",
    projectId: "homelab",
    port: 9000,
    tasks: [
      { label: "Déployer en mode standalone", done: false },
      { label: "Créer bucket backups", done: false },
      { label: "Tester upload via CLI mc", done: false },
    ],
  },
  {
    id: "svc-7",
    name: "Authelia",
    description: "SSO & 2FA pour services self-hosted",
    category: "auth",
    status: "to_test",
    url: null,
    machineId: "docker-01",
    projectId: "homelab",
    port: 9091,
    tasks: [
      { label: "Configurer LDAP backend", done: false },
      { label: "Activer TOTP 2FA", done: false },
      { label: "Intégrer avec Traefik", done: false },
      { label: "Tester politique d'accès", done: false },
    ],
  },
  {
    id: "svc-8",
    name: "WireGuard",
    description: "VPN tunnel site-to-site & remote access",
    category: "network",
    status: "running",
    url: null,
    machineId: "fw-01",
    projectId: "network",
    port: 51820,
    tasks: [
      { label: "Ajouter peer mobile", done: true },
      { label: "Configurer split tunneling", done: false },
    ],
  },
  {
    id: "svc-9",
    name: "Gitea",
    description: "Forge Git self-hosted légère",
    category: "devops",
    status: "running",
    url: "http://192.168.1.30:3001",
    machineId: "docker-01",
    projectId: "homelab",
    port: 3001,
    tasks: [
      { label: "Configurer mirroring GitHub", done: true },
      { label: "Activer CI/CD Actions", done: false },
    ],
  },
  {
    id: "svc-10",
    name: "Uptime Kuma",
    description: "Monitoring de disponibilité avec alertes",
    category: "monitoring",
    status: "to_test",
    url: null,
    machineId: "docker-01",
    projectId: "homelab",
    port: 3002,
    tasks: [
      { label: "Déployer via Docker", done: false },
      { label: "Ajouter sondes HTTP pour chaque service", done: false },
      { label: "Configurer notifications Telegram", done: false },
    ],
  },
  {
    id: "svc-11",
    name: "Active Directory",
    description: "Annuaire LDAP & GPO Windows",
    category: "auth",
    status: "degraded",
    url: null,
    machineId: "win-srv-01",
    projectId: "production",
    port: 389,
    tasks: [
      { label: "Configurer GPO sécurité", done: false },
      { label: "Auditer comptes inactifs", done: false },
      { label: "Activer LDAPS", done: false },
    ],
  },
  {
    id: "svc-12",
    name: "Loki",
    description: "Agrégation de logs centralisée",
    category: "monitoring",
    status: "running",
    url: "http://192.168.1.50:3100",
    machineId: "monitor-01",
    projectId: "homelab",
    port: 3100,
    tasks: [
      { label: "Déployer Promtail sur toutes les machines", done: false },
      { label: "Configurer rétention logs 14j", done: true },
    ],
  },
];
