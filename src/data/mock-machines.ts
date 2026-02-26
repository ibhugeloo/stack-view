export interface Task {
  label: string;
  done: boolean;
}

export interface Machine {
  id: string;
  name: string;
  ip: string;
  isStatic: boolean;
  os: "ubuntu" | "debian" | "centos" | "windows" | "macos" | "proxmox" | "esxi" | "truenas" | "pfsense";
  projectId: string;
  description: string;
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  color: string;
  description: string;
  environment: "production" | "staging" | "development" | "infrastructure";
  status: "active" | "maintenance" | "archived";
}

export const projects: Project[] = [
  {
    id: "homelab",
    name: "Homelab",
    color: "#3b82f6",
    description: "Lab perso — expérimentation, self-hosting et apprentissage infra",
    environment: "development",
    status: "active",
  },
  {
    id: "production",
    name: "Production",
    color: "#10b981",
    description: "Environnement de production — services clients et applications live",
    environment: "production",
    status: "active",
  },
  {
    id: "staging",
    name: "Staging",
    color: "#f59e0b",
    description: "Pré-production — tests d'intégration et validation avant déploiement",
    environment: "staging",
    status: "active",
  },
  {
    id: "network",
    name: "Network",
    color: "#8b5cf6",
    description: "Infrastructure réseau — firewall, VPN, routage et sécurité périmétrique",
    environment: "infrastructure",
    status: "active",
  },
];

export const machines: Machine[] = [
  {
    id: "pve-01",
    name: "pve-01",
    ip: "192.168.1.10",
    isStatic: true,
    os: "proxmox",
    projectId: "homelab",
    description: "Proxmox VE principal — hyperviseur bare-metal",
    tasks: [
      { label: "Mise à jour vers PVE 8.1", done: true },
      { label: "Configurer backup PBS", done: false },
    ],
  },
  {
    id: "nas-01",
    name: "nas-01",
    ip: "192.168.1.20",
    isStatic: true,
    os: "truenas",
    projectId: "homelab",
    description: "NAS TrueNAS Scale — stockage ZFS 4x8TB",
    tasks: [
      { label: "Configurer snapshot auto", done: true },
      { label: "Ajouter partage SMB", done: false },
      { label: "Configurer réplication off-site", done: false },
    ],
  },
  {
    id: "fw-01",
    name: "fw-01",
    ip: "192.168.1.1",
    isStatic: true,
    os: "pfsense",
    projectId: "network",
    description: "Firewall pfSense — routeur principal",
    tasks: [
      { label: "Configurer VPN WireGuard", done: true },
      { label: "Activer IDS/IPS Suricata", done: false },
    ],
  },
  {
    id: "web-prod-01",
    name: "web-prod-01",
    ip: "10.0.1.10",
    isStatic: true,
    os: "ubuntu",
    projectId: "production",
    description: "Serveur web production — Nginx + Node.js",
    tasks: [
      { label: "Renouveler certificat SSL", done: false },
      { label: "Mettre à jour Node.js 20 LTS", done: true },
    ],
  },
  {
    id: "db-prod-01",
    name: "db-prod-01",
    ip: "10.0.1.20",
    isStatic: true,
    os: "ubuntu",
    projectId: "production",
    description: "Base de données PostgreSQL production",
    tasks: [
      { label: "Configurer réplication streaming", done: false },
      { label: "Optimiser pg_hba.conf", done: true },
    ],
  },
  {
    id: "web-stg-01",
    name: "web-stg-01",
    ip: "10.0.2.10",
    isStatic: false,
    os: "ubuntu",
    projectId: "staging",
    description: "Serveur web staging — mirror de production",
    tasks: [
      { label: "Déployer branche develop", done: false },
    ],
  },
  {
    id: "db-stg-01",
    name: "db-stg-01",
    ip: "10.0.2.20",
    isStatic: false,
    os: "debian",
    projectId: "staging",
    description: "Base de données staging",
    tasks: [],
  },
  {
    id: "monitor-01",
    name: "monitor-01",
    ip: "192.168.1.50",
    isStatic: true,
    os: "ubuntu",
    projectId: "homelab",
    description: "Stack monitoring — Grafana + Prometheus + Loki",
    tasks: [
      { label: "Ajouter dashboard réseau", done: false },
      { label: "Configurer alertes Slack", done: true },
      { label: "Intégrer node_exporter partout", done: false },
    ],
  },
  {
    id: "docker-01",
    name: "docker-01",
    ip: "192.168.1.30",
    isStatic: true,
    os: "ubuntu",
    projectId: "homelab",
    description: "Serveur Docker — services self-hosted",
    tasks: [
      { label: "Migrer vers Docker Compose v2", done: true },
      { label: "Configurer Traefik reverse proxy", done: false },
    ],
  },
  {
    id: "win-srv-01",
    name: "win-srv-01",
    ip: "10.0.1.100",
    isStatic: true,
    os: "windows",
    projectId: "production",
    description: "Windows Server 2022 — Active Directory",
    tasks: [
      { label: "Configurer GPO sécurité", done: false },
      { label: "Activer BitLocker", done: false },
    ],
  },
];
