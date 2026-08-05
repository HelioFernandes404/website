---
title: "SystemFrame"
description: "Multi-tenant observability platform for 12+ clients and 390+ endpoints, with GitOps deploy and an alert pipeline integrated with GLPI and ServiceNow."
tech:
  - "K3s / Helm"
  - "ArgoCD"
  - "Prometheus"
order: 2
category: "02. Data Ops"
metricLabel: "MTTR"
metricValue: "-60%"
metricCaption: "50MIN -> 20MIN"
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=70&w=640&auto=format&fit=crop&fm=webp"
imageAlt: "SystemFrame project focused on DevOps infrastructure with Kubernetes"
carl:
  context: "The platform monitors heterogeneous infrastructure across 12+ clients: Aruba and Meraki equipment, plus Zabbix and GLPI already installed in each client's fleet. There was no consolidated telemetry -- each client was an island, and diagnosing an incident could take a whole day. Alerts reached the team but didn't turn into a ticket on their own."
  action: "I took ownership of the platform layer with K3s, Helm, ArgoCD, and Ansible, sustaining continuous GitOps deployment. I wrote 5 custom exporters for Aruba, Meraki, Zabbix, and GLPI, consolidating 390+ endpoints into a single format. On top of that I built the alert pipeline connecting Alertmanager to GLPI and ServiceNow, running 296 rules, plus analysis tools built on the Prometheus and VictoriaMetrics APIs distributed across 2 availability zones."
  result: "MTTR dropped from 50 to 20 minutes (-60%), and incident diagnosis time went from 1 day to 2 hours. The GitOps deploy pipeline accumulated more than 3,500 CI/CD runs, averaging around 8 deploys per business day."
  learning: "A custom exporter is maintenance debt: each one becomes proprietary code that has to track vendor firmware and API changes. It was worth it because unified-format telemetry was what made the 296 rules possible -- without it, each client would need its own set of alerts. And an alert that doesn't automatically become a ticket doesn't reduce MTTR: the gain came from the GLPI and ServiceNow integration, not from detecting issues faster."
architecture:
  title: "Architecture"
  hint: "Click a component to see the decision made there and what it cost."
  nodes:
    - id: "parque"
      label: "Client fleet"
      kind: "entry"
      subtitle: "Aruba, Meraki, Zabbix, GLPI"
      x: 0
      y: 60
    - id: "exporters"
      label: "5 custom exporters"
      kind: "service"
      subtitle: "390+ endpoints"
      x: 280
      y: 60
      decision: "Write proprietary exporters for each source, instead of adopting a single off-the-shelf agent or accepting the native formats."
      tradeoff: "Each exporter is code that has to track vendor firmware and API changes. It was what enabled unified-format telemetry across heterogeneous fleets -- and without it, the 296 rules wouldn't exist."
    - id: "tsdb"
      label: "Prometheus / VictoriaMetrics"
      kind: "data"
      subtitle: "2 AZs"
      x: 580
      y: 60
      decision: "Keep VictoriaMetrics alongside Prometheus and distribute across 2 availability zones."
      tradeoff: "Two metrics systems to operate and understand instead of one. It buys longer retention and survival if one zone goes down."
    - id: "alertmanager"
      label: "Alertmanager"
      kind: "service"
      subtitle: "296 rules"
      x: 880
      y: -40
      decision: "Concentrate the 296 rules in Alertmanager and handle deduplication there, before any external integration."
      tradeoff: "The rules become a large, centralized artifact that requires discipline to keep from turning into a mess. It prevents each integration from reimplementing its own silencing logic."
    - id: "glpi"
      label: "GLPI"
      kind: "external"
      x: 1180
      y: -110
    - id: "servicenow"
      label: "ServiceNow"
      kind: "external"
      x: 1180
      y: 20
    - id: "analise"
      label: "Analysis tools"
      kind: "service"
      subtitle: "diagnosis 1 day -> 2h"
      x: 880
      y: 180
      decision: "Build query tools on top of the Prometheus and VictoriaMetrics APIs instead of relying solely on visual dashboards."
      tradeoff: "More internal code to maintain, outside the product's core path. It cut incident diagnosis time from a day to two hours, because investigating no longer depended on building a dashboard on the fly."
    - id: "argocd"
      label: "ArgoCD"
      kind: "service"
      subtitle: "GitOps"
      x: 280
      y: 320
      decision: "GitOps deployment with ArgoCD and Helm, with desired state versioned instead of applied by hand."
      tradeoff: "Every change now requires a commit and sync, which is slower for a one-off hotfix. In exchange, onboarding a new client became Helm values, and cluster state stopped depending on who applied what."
    - id: "k3s"
      label: "K3s + Helm"
      kind: "service"
      subtitle: "12+ clients"
      x: 580
      y: 320
      decision: "K3s instead of full Kubernetes to sustain the multi-tenant fleet."
      tradeoff: "Fewer components out of the box, so part of what a managed cluster delivers ready-made had to be built. It paid off through lower per-client resource consumption and simpler operations."
  edges:
    - from: "parque"
      to: "exporters"
      label: "scrape"
    - from: "exporters"
      to: "tsdb"
    - from: "tsdb"
      to: "alertmanager"
    - from: "alertmanager"
      to: "glpi"
      label: "ticket"
      async: true
    - from: "alertmanager"
      to: "servicenow"
      label: "ticket"
      async: true
    - from: "tsdb"
      to: "analise"
    - from: "argocd"
      to: "k3s"
      label: "sync"
    - from: "k3s"
      to: "exporters"
      label: "hosts"
---

Multi-tenant observability platform operated since December 2024, consolidating heterogeneous infrastructure telemetry across 12+ clients.
