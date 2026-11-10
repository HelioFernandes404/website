---
title: "Self-hosted GitOps platform (Flux CD + Kubernetes) · 3 apps in production"
description: "A single-node Kubernetes platform driven by Flux CD from one repository. 4 deploy repos became 1, deploys have no downtime, and 3 apps run on it."
tech:
  - "Flux CD"
  - "Kubernetes (KubeSolo)"
  - "VictoriaMetrics"
order: 1
category: "04. Platform"
metricLabel: "DEPLOY REPOS"
metricValue: "4 → 1"
metricCaption: "4 REPOS -> 1 REPO"
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=70&w=640&auto=format&fit=crop&fm=webp"
imageAlt: "Server infrastructure for a self-hosted Kubernetes platform"
statusEndpoint: "https://status.heliosuns404.com/v1"
carl:
  context: "My platform first ran on a pull-based deploy agent I wrote in Go (giohel-cd) and Docker Compose. The state was spread across several repos: deployments, the agent, ingress and observability. Every change meant switching between them, and Compose deploys caused downtime. The goal was to organize the platform so it could scale, cut that context switching and deploy without downtime."
  action: "I moved the platform to Flux CD on KubeSolo, a single-node Kubernetes distribution, with one repository (fleet) as the source of truth. Secrets come from the Doppler Kubernetes Operator, Postgres 18 is one shared StatefulSet, backups are CronJobs with an automated restore test, and traffic enters through a Cloudflare Tunnel with Traefik behind it. Observability uses VictoriaMetrics, VictoriaLogs and VictoriaTraces with an OpenTelemetry Collector, vmalert and Alertmanager. Renovate bumps image tags, and a dev cluster rehearsed the migration before production."
  result: "One repository is now the source of truth, replacing 4 deploy repos. Deploys have no downtime, and 3 apps run on the same cluster. Memory requests add up to 1.6 GB on a 3.8 GB VPS. Availability has a target of 99.5% over 30 days with multi-window burn-rate alerts, and it is a target: there is no history yet to claim it was met."
  learning: "A single node is a conscious trade: no high availability, in exchange for a platform small enough to understand and to fit in memory. The constraint that shaped most decisions was memory, not features, so a written memory budget with requests and limits for every component was worth more than any single tool. Rehearsing the migration on a dev cluster first meant the production window was not the first run."
architecture:
  title: "Architecture"
  hint: "Click a component to see the decision made there and what it cost."
  nodes:
    - id: "renovate"
      label: "Renovate"
      kind: "external"
      subtitle: "image tags"
      x: 0
      y: 0
      decision: "Renovate opens pull requests that bump image tags in the fleet repo. Automerge is limited to my own images, and charts stay manual."
      tradeoff: "Up to about 1 hour from image release to deploy, and chart upgrades need a human."
    - id: "fleet"
      label: "fleet repo"
      kind: "entry"
      subtitle: "source of truth"
      x: 0
      y: 150
      decision: "One repository holds the desired state of the whole cluster, replacing 4 deploy repos. App CI opens pull requests here, so app repos hold no cluster credentials."
      tradeoff: "Every change goes through review in one place. The price is that the repo is the single door: if it is wrong, the cluster converges to the wrong thing."
    - id: "flux"
      label: "Flux CD"
      kind: "service"
      subtitle: "minimal install"
      x: 260
      y: 150
      decision: "Flux with only the source, kustomize, helm and notification controllers. Layers apply in a dependency chain with prune and wait, so a deploy only moves on when the previous layer is healthy."
      tradeoff: "Flux reserves about 150 MiB of memory on a small VPS. In exchange, deploys are reproducible and rolling, with no downtime, which the Compose setup could not give."
    - id: "kubesolo"
      label: "KubeSolo"
      kind: "service"
      subtitle: "single node"
      x: 520
      y: 150
      decision: "Run Kubernetes on KubeSolo, a single-binary distribution, on a 3.8 GB VPS where Docker Compose used to run. It costs about 200 MB of overhead."
      tradeoff: "One node means no high availability and no node drain, which I accepted. Memory is the real constraint, so every workload has requests and limits."
    - id: "tunnel"
      label: "Cloudflare Tunnel + Traefik"
      kind: "entry"
      subtitle: "outbound only"
      x: 260
      y: 330
      decision: "Cloudflare Tunnel connects outbound to Traefik, which sits behind it. TLS ends at Cloudflare and the web ports on the server stay closed. Traefik stays for rate limit, circuit breaker and canonical redirects."
      tradeoff: "Cloudflare sits in the path of every request, and traffic is plain HTTP inside the node."
    - id: "apps"
      label: "3 apps"
      kind: "service"
      subtitle: "scout, estudiomadame, english-notes"
      x: 800
      y: 60
      decision: "Three apps share one cluster: Estúdio Madame (a photo-selection gallery for a real client), Scout (Go API with MCP) and english-notes. Each gets its own namespace."
      tradeoff: "They compete for the same small machine. Requests add up to 1.6 GB of the 3.8 GB, with limits deliberately overcommitted, so memory pressure is watched instead of assumed away."
    - id: "doppler"
      label: "Doppler Operator"
      kind: "external"
      subtitle: "secrets"
      x: 520
      y: 330
      decision: "The Doppler Kubernetes Operator syncs secrets into the cluster, and apps read them as environment variables. Pods keep running with the last synced secret if Doppler is down."
      tradeoff: "The operator is a single point for secret freshness, and it needed a workaround to deliver a registry pull secret."
    - id: "postgres"
      label: "Postgres 18"
      kind: "data"
      subtitle: "shared StatefulSet"
      x: 800
      y: 260
      decision: "One shared Postgres 18 StatefulSet with one database and role per app, instead of one instance per app. Each role has a connection limit and statement timeout."
      tradeoff: "Shared fate and coupled upgrades. Three instances would not fit in the memory of this VPS."
    - id: "backups"
      label: "Backup CronJobs"
      kind: "service"
      subtitle: "restore tested"
      x: 1080
      y: 260
      decision: "Backups are CronJobs: hourly dumps kept 48 hours, daily dumps kept 14 days, and a weekly automated restore test in a throwaway Postgres."
      tradeoff: "Backups live on the same disk as the database and there is no off-site copy yet. I accepted that risk for now."
    - id: "obs"
      label: "Victoria stack + OTel"
      kind: "service"
      subtitle: "metrics, logs, traces"
      x: 1080
      y: 60
      decision: "VictoriaMetrics, VictoriaLogs and VictoriaTraces, fed by an OpenTelemetry Collector, with vmalert and Alertmanager. Alerts are multi-window burn-rate against a 99.5% availability target over 30 days. Critical alerts go to chat, warnings to email."
      tradeoff: "The whole stack has a real memory cost on a small node, so every component has requests and limits, and traces are the first thing to cut under pressure."
  edges:
    - from: "renovate"
      to: "fleet"
      label: "image bump PR"
    - from: "fleet"
      to: "flux"
      label: "reconcile"
    - from: "flux"
      to: "kubesolo"
      label: "apply"
    - from: "kubesolo"
      to: "apps"
    - from: "tunnel"
      to: "apps"
      label: "requests"
    - from: "doppler"
      to: "apps"
      label: "secrets"
      async: true
    - from: "apps"
      to: "postgres"
    - from: "postgres"
      to: "backups"
      label: "dump"
      async: true
    - from: "apps"
      to: "obs"
      label: "metrics / logs"
      async: true
---

A self-hosted GitOps platform that runs 3 apps on a single-node Kubernetes cluster, with Flux CD reconciling everything from one repository. The live status above comes from the cluster itself.
