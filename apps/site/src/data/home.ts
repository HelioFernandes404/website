// Homepage copy. Facts and numbers come from the owner's verified story bank
// (scout-agent-workflow/data/historias.yaml). Rules from that file: no client
// names, znvet is "Founding Engineer" (never founder), the AI diagnosis agent
// is "in validation", alert dedup is "took part in", estimates keep "~".

export const hero = {
  badge: "Open to platform / SRE roles · remote",
  role: "Platform / DevOps Engineer",
  headline: "I replace hand-run infrastructure with platforms teams can trust.",
  intro:
    "I build and run the Kubernetes, GitOps and observability behind a multi-tenant monitoring platform. I propose changes in RFCs, roll them out client by client, and measure what changed.",
  stats: [
    { value: "12", label: "clients migrated to Kubernetes in 3 months" },
    { value: "2,275", label: "GitOps deploys since Mar 2025" },
    { value: "~877k", label: "active metric series across 2 AZs" },
    { value: "50→20 min", label: "MTTR after self-healing playbooks" },
  ],
};

export const caseStudies = [
  {
    id: "k8s-migration",
    kicker: "SystemFrame · 2025",
    title: "Moving a multi-tenant platform from Docker to K3s",
    summary:
      "Each client ran on Docker, deployed by hand with Ansible. Secrets often failed to load at machine bootstrap, and fixing it meant restarting Docker and digging through hosts for hours.",
    href: "/projects/systemframe/",
    metrics: [
      { value: "4/wk → 0", label: "secret incidents" },
      { value: "12", label: "clients migrated" },
      { value: "3 months", label: "smallest to largest" },
      { value: "99.8%", label: "enterprise SLA met" },
    ],
    steps: [
      {
        title: "Spotted the problem and proposed the change",
        body: "Nobody asked for a migration. I traced the recurring incidents to how secrets reached the containers and brought a proposal to the tech lead.",
      },
      {
        title: "Wrote an RFC with the costs, not just the benefits",
        body: "Kubernetes adds a learning curve and makes debugging harder. I listed that next to the gains. I also compared managed Kubernetes with K3s and picked K3s for cost, and that choice went into the same RFC. The team approved it.",
      },
      {
        title: "Built the path",
        body: "Manifests and bootstrap with Ansible. Secrets created with Terraform in AWS SSM Parameter Store and synced into the cluster by External Secrets Operator. Deploys through Argo CD.",
      },
      {
        title: "Migrated gradually",
        body: "One client at a time, starting with the smallest (around 500 users) to validate the setup before touching the larger ones.",
      },
    ],
    after: {
      title: "What it unlocked later",
      items: [
        "Helm + Argo CD GitOps: one values folder per client and environment, generated from the old Ansible config. 2,275 deploys since Mar 2025, ~8 per business day, across 90 servers.",
        "Client onboarding automated with Terraform, Ansible and GitOps: from 3 days to 4 hours.",
      ],
    },
    lesson: {
      title: "What I'd do differently",
      body: "Define success metrics and runbooks before the first client moves. We spent a few days debugging metrics in the unified cluster that a checklist would have caught.",
    },
    stack: ["K3s", "Argo CD", "Helm", "Ansible", "Terraform", "External Secrets Operator", "AWS SSM"],
  },
  {
    id: "znvet",
    kicker: "znvet · Founding Engineer",
    title: "A full production platform for R$ 936 a year",
    summary:
      "A veterinary-clinic SaaS with one paying client (6 clinics) and a team of three. I own the infrastructure and also ship product code. The budget is small, but production still has to behave like production.",
    href: "",
    metrics: [
      { value: "R$ 936", label: "infrastructure per year" },
      { value: "99.7%", label: "measured availability (15 days)" },
      { value: "~3 min", label: "merge to GitOps commit" },
      { value: "1 year", label: "in production" },
    ],
    steps: [
      {
        title: "Platform",
        body: "K3s on a VPS, bootstrapped with Ansible, infra in Terraform (HCP). Argo CD deploys a Helm chart versioned in OCI to dev, staging and prod, promoted by pull request with gates.",
      },
      {
        title: "Observability from day one",
        body: "VictoriaMetrics, VictoriaLogs, Jaeger and OpenTelemetry, alerts in vmalert, errors in GlitchTip. Decisions recorded as ADRs.",
      },
      {
        title: "The incident",
        body: "A dashboard ETL ran a query with no batching or limit. It loaded everything into memory, the backend pod got OOMKilled and restarted in a loop. That meant about 70 minutes of downtime at night, and the client felt it.",
      },
      {
        title: "The response",
        body: "Stabilise first, then find the cause. The fix (batched processing with a limit) shipped the next day. I ran the post-mortem. We added error tracking to the backend and frontend, raised test coverage and added a load-test quality gate.",
      },
    ],
    after: null,
    lesson: {
      title: "What changed",
      body: "Now errors show up in GlitchTip before the client notices, and heavy changes go through a load test before they reach prod.",
    },
    stack: ["K3s", "Argo CD", "Helm OCI", "Terraform", "VictoriaMetrics", "VictoriaLogs", "OpenTelemetry", "GlitchTip"],
  },
];

export const wins = [
  {
    tag: "Observability",
    title: "One view over scattered telemetry",
    body: "Wrote 5 Prometheus exporters in Python (Aruba, Aruba Central, Meraki, Zabbix, GLPI), handling pagination and API rate limits. They run per client on K3s and vmagent discovers them. The platform covers 570+ endpoints, ~60k samples/s and ~2.8M logs a day.",
    stack: ["Python", "VictoriaMetrics", "vmagent", "Grafana"],
    href: "",
  },
  {
    tag: "Incident response",
    title: "Giving the NOC its own fixes",
    body: "Proposed AWX, wired it into the alert pipeline and wrote self-healing playbooks with a runbook per alert. MTTR went from 50 to 20 min and escalations from 20 to 5 a week.",
    stack: ["AWX", "Ansible", "Alertmanager"],
    href: "",
  },
  {
    tag: "SRE",
    title: "SLA reports that write themselves",
    body: "Client SLA used to be built by hand each month. Now it's measured with blackbox probes and recording rules, and SLOs with error budgets where the contract asks for them. A monthly report goes out by email automatically, and 56 people use the dashboards.",
    stack: ["Grafana", "VictoriaMetrics", "Blackbox exporter"],
    href: "",
  },
  {
    tag: "Alerting",
    title: "Duplicate tickets, mostly gone",
    body: "Took part in the RFC and the implementation of fingerprint-based deduplication in the alert worker, rolled out behind a feature flag. Around 95% of duplicate tickets disappeared (team estimate).",
    stack: ["Alertmanager", "GLPI", "ServiceNow"],
    href: "",
  },
  {
    tag: "Team process",
    title: "Unblocking code review with DORA",
    body: "With AI-assisted coding, PRs grew huge and sat for days. DORA metrics showed review was the bottleneck. I proposed diff-size limits, domain-based reviewers and an author summary. Review wait dropped from up to a week to about a day.",
    stack: ["DORA"],
    href: "",
  },
  {
    tag: "In validation",
    title: "Read-only AI for incident diagnosis",
    body: "A Go tool that gives a model read-only access to metrics, alerts, logs and traces, correlates them for one service and window, and suggests a likely cause and runbook. Humans act; the AI doesn't. It runs in parallel with the normal flow.",
    stack: ["Go", "VictoriaMetrics", "Jaeger"],
    href: "",
  },
  {
    tag: "DAI-TEC",
    title: "Releases from a full day to 15 minutes",
    body: "As the only DevOps for 2 squads (10 engineers), I set up shared GitHub Actions pipelines with semantic release and blue/green deploys on CodeDeploy. Deploy frequency went up 3–5x across 13 apps. New-project setup in Terraform went from 2 days to under an hour.",
    stack: ["GitHub Actions", "AWS ECS", "Terraform"],
    href: "/projects/dai-tec-ai/",
  },
  {
    tag: "Personal platform",
    title: "A tiny cluster run like a real one",
    body: "My own VPS (3.8 GB) runs 3 apps on KubeSolo with Flux CD. I moved off a deploy agent I'd written in Go and merged 4 repos into 1. It has a 99.5% SLO target with burn-rate alerts, and hourly backups with an automated weekly restore test.",
    stack: ["Flux CD", "KubeSolo", "Doppler", "Renovate"],
    href: "/projects/my-cluster/",
  },
];

export const about = {
  title: "A software foundation, a reliability mindset",
  paragraphs: [
    "I started in QA and full-stack development, building services and integrations and the pipelines behind them. Then I moved into DevOps and SRE because I wanted to understand how those systems behave, fail and recover in production.",
    "That background stays with me. I approach infrastructure with a developer's sense of how the application works, and I approach development knowing what happens after deploy.",
  ],
  photoAlt: "Hélio at his desk, with code and a terminal open on the monitor",
  caption: "Where the alert pipeline gets written.",
};

export const jobs = [
  {
    company: "SystemFrame",
    role: "Software Engineer (DevOps / SRE)",
    period: "Dec 2024 – present",
    context: "Multi-tenant observability platform: 12+ clients, 570+ monitored endpoints.",
    note: "",
    href: "/projects/systemframe/",
  },
  {
    company: "DAI-TEC",
    role: "Software Engineer (DevOps / SRE)",
    period: "Jul 2022 – Dec 2024",
    context: "Multi-tenant AI SaaS on AWS: 5 projects, 13 production apps.",
    note: "Started in QA and full-stack development; moved to DevOps / SRE in Jul 2023.",
    href: "/projects/dai-tec-ai/",
  },
  {
    company: "znvet",
    role: "Founding Engineer · DevOps / SRE and developer",
    period: "Project",
    context: "Management SaaS for veterinary clinics; 1 paying client with 6 clinics.",
    note: "",
    href: "",
  },
];

export const toolbox = [
  "Kubernetes / K3s",
  "Terraform",
  "AWS",
  "GitOps (Argo CD, Flux)",
  "Prometheus",
  "VictoriaMetrics",
  "Grafana",
  "Helm",
  "Ansible / AWX",
  "GitHub Actions",
  "OpenTelemetry",
  "Jaeger",
  "Python",
  "Go",
  "Linux",
];
