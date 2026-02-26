# StackView — Design des fonctionnalités

> Document de conception pour une application de gestion d'infrastructure légère.

---

## Vue d'ensemble

StackView est un dashboard DCIM (Data Center Infrastructure Management) léger, construit avec Next.js, React et Sanity CMS. L'objectif est de fournir une interface simple et efficace pour gérer un parc de machines sans la complexité des solutions entreprise (NetBox, Ralph, etc.).

---

## Fonctionnalités existantes

| Fonctionnalité         | Statut | Composants clés                          |
| ---------------------- | ------ | ---------------------------------------- |
| Inventaire machines    | OK     | `inventory/page.tsx`, `MachineTable`     |
| Topologie réseau       | OK     | `topology/page.tsx`, XYFlow              |
| Dashboard KPI          | OK     | `dashboard/StatsCards`, `StatCard`       |
| Gestion projets        | OK     | `ProjectProvider`, `ProjectSelector`     |
| Gestion tâches basique | OK     | Interface `Task`, affichage par machine  |
| i18n (FR/EN)           | OK     | `dictionaries/`, middleware locale       |

---

## Fonctionnalités recommandées — Priorité haute

### 1. Monitoring et health checks

**Pourquoi :** Savoir si une machine est en ligne est le besoin #1 en gestion d'infra.

**Implémentation proposée :**
- Ajouter un champ `status: "online" | "offline" | "maintenance" | "unknown"` à l'interface `Machine`
- Ajouter un champ `lastSeen: Date` pour le dernier check
- Indicateur visuel (pastille verte/rouge) sur chaque machine dans l'inventaire et la topologie
- Page ou section dédiée aux alertes

**Modèle de données :**
```typescript
interface Machine {
  // ... champs existants
  status: "online" | "offline" | "maintenance" | "unknown";
  lastSeen: string; // ISO date
  uptimePercent?: number; // 0-100, calculé sur 30 jours
}
```

### 2. IPAM (IP Address Management)

**Pourquoi :** La gestion des IPs est critique dès qu'on dépasse 10 machines. Les conflits d'IP causent des pannes difficiles à diagnostiquer.

**Implémentation proposée :**
- Vue visuelle d'un sous-réseau (grille d'adresses IP)
- Coloration par statut : libre, utilisée, réservée, conflit
- Détection automatique de doublons d'IP dans l'inventaire
- Support multi-sous-réseaux (192.168.1.0/24, 10.0.1.0/24, etc.)

**Modèle de données :**
```typescript
interface Subnet {
  id: string;
  name: string;
  cidr: string; // ex: "192.168.1.0/24"
  gateway: string;
  vlan?: number;
  projectId: string;
}

interface IpAllocation {
  ip: string;
  subnetId: string;
  machineId?: string;
  type: "static" | "dhcp" | "reserved";
  note?: string;
}
```

**Nouvelle page :** `/[locale]/ipam`

### 3. Système de tâches amélioré

**Pourquoi :** Le système actuel (label + done) est trop simple pour suivre la maintenance.

**Implémentation proposée :**
- Ajout de priorité, date d'échéance, assignation
- Vue Kanban ou liste filtrée des tâches globales
- Historique des tâches complétées

**Modèle de données :**
```typescript
interface Task {
  id: string;
  label: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high" | "critical";
  assignee?: string;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
  machineId: string;
}
```

**Nouvelle page :** `/[locale]/tasks`

### 4. Journal d'audit et historique

**Pourquoi :** Dans une infra, savoir qui a fait quoi et quand est essentiel pour le debugging et la conformité.

**Implémentation proposée :**
- Log automatique des modifications (ajout/suppression de machine, changement d'IP, etc.)
- Fil d'activité sur le dashboard
- Filtrage par machine, utilisateur, type d'action

**Modèle de données :**
```typescript
interface AuditEntry {
  id: string;
  timestamp: string;
  action: "create" | "update" | "delete" | "status_change";
  entityType: "machine" | "task" | "project" | "subnet";
  entityId: string;
  userId?: string;
  changes: Record<string, { old: unknown; new: unknown }>;
  note?: string;
}
```

---

## Fonctionnalités recommandées — Priorité moyenne

### 5. Documentation inline par machine

- Champ `notes` en markdown par machine
- Section "Runbooks" avec liens vers la documentation
- Tags/labels personnalisés pour catégoriser les machines

```typescript
interface Machine {
  // ... champs existants
  notes?: string; // markdown
  tags?: string[];
  runbooks?: { title: string; url: string }[];
}
```

### 6. Export et import de données

- Export CSV/JSON de l'inventaire complet
- Export PDF d'un rapport de synthèse
- Import depuis fichier CSV (migration depuis un tableur)
- Import Ansible inventory (INI ou YAML)

### 7. Notifications et alertes

- Webhooks configurables (Slack, Discord, email)
- Alertes sur : machine offline, tâche en retard, certificat SSL expirant
- Préférences de notification par utilisateur

```typescript
interface AlertRule {
  id: string;
  name: string;
  condition: "machine_offline" | "task_overdue" | "cert_expiring" | "ip_conflict";
  threshold?: number; // ex: offline depuis X minutes
  channels: ("slack" | "discord" | "email" | "webhook")[];
  webhookUrl?: string;
  enabled: boolean;
}
```

### 8. Vue par services / applications

- Regrouper les machines par service applicatif (ex: "Stack Web" = web-prod-01 + db-prod-01)
- Visualiser les dépendances entre services
- Impact analysis : si cette machine tombe, quels services sont affectés ?

```typescript
interface Service {
  id: string;
  name: string;
  description?: string;
  machineIds: string[];
  dependencies?: string[]; // IDs d'autres services
  criticality: "low" | "medium" | "high" | "critical";
}
```

---

## Fonctionnalités recommandées — Priorité basse (nice-to-have)

### 9. Authentification et rôles

- Multi-utilisateurs avec NextAuth.js ou Clerk
- Rôles : admin, operator, viewer (lecture seule)
- Intégration LDAP/SSO pour les équipes

### 10. Intégrations externes

- Sync Ansible : import automatique depuis un inventory Ansible
- Sync Terraform : lecture du state pour alimenter l'inventaire
- API REST publique pour automatisation tierce

### 11. Suivi des backups

- Statut des sauvegardes par machine (dernier backup, taille, succès/échec)
- Alerte si un backup est en retard
- Lien avec le NAS (TrueNAS dans le cas du homelab)

### 12. Mode sombre et personnalisation UI

- Thème sombre natif (Tailwind dark mode)
- Personnalisation des couleurs de projet
- Layout responsive optimisé pour tablette (usage rack-side)

---

## Architecture technique recommandée

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│          Next.js 16 + React 19 + Tailwind        │
│                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │Dashboard │ │Inventory │ │   Topology       │  │
│  │  (KPI)   │ │ (Table)  │ │   (XYFlow)       │  │
│  └──────────┘ └──────────┘ └──────────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │  Tasks   │ │  IPAM    │ │  Audit Log       │  │
│  │ (Kanban) │ │ (Grid)   │ │  (Timeline)      │  │
│  └──────────┘ └──────────┘ └──────────────────┘  │
└──────────────────────┬──────────────────────────┘
                       │ API Routes / Server Actions
                       │
┌──────────────────────▼──────────────────────────┐
│                  Backend                         │
│          Sanity CMS (données machines)           │
│          + SQLite/Postgres (audit, tâches)        │
│          + Cron jobs (health checks)              │
└─────────────────────────────────────────────────┘
```

---

## Roadmap suggérée

| Phase   | Fonctionnalités                             | Effort estimé |
| ------- | ------------------------------------------- | ------------- |
| Phase 1 | Monitoring + statut machines                | Petit         |
| Phase 2 | IPAM basique + détection conflits           | Moyen         |
| Phase 3 | Tâches améliorées + vue Kanban              | Moyen         |
| Phase 4 | Audit log + fil d'activité                  | Petit         |
| Phase 5 | Documentation inline + tags                 | Petit         |
| Phase 6 | Export/Import + notifications               | Moyen         |
| Phase 7 | Auth + rôles + intégrations                 | Grand         |

---

## Principes de design

1. **Léger avant tout** — Pas de sur-ingénierie. Chaque fonctionnalité doit rester simple et ciblée.
2. **Offline-first** — L'app doit fonctionner même si le CMS est temporairement indisponible (cache local).
3. **Données mock en premier** — Prototyper avec des données mock avant d'intégrer Sanity.
4. **i18n natif** — Toute nouvelle fonctionnalité doit supporter FR et EN dès le départ.
5. **Accessible** — Utiliser les primitives Radix UI pour l'accessibilité clavier et screen reader.
