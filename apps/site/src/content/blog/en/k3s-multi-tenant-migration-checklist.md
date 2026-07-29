---
title: "Docker → Kubernetes (K3s) in a Multi-Tenant Environment"
description: "A practical checklist from the K3s migration: rollout, per-tenant isolation, and the trade-offs that kept incidents at bay."
pubDate: "2026-02-20"
category: "DevOps"
lead: "Migrating to K3s in a multi-tenant setup demands rollout and observability discipline from the very first deploy."
tags:
  - "Kubernetes"
  - "K3s"
  - "multi-tenant"
  - "migration"
  - "SRE"
---

## Context

The operation grew to serve multiple clients, and the Docker Compose-based model started causing friction in deployment, scalability, and troubleshooting.

The goal was to migrate to K3s with minimal downtime, while preserving per-tenant governance and cost predictability.

## Action

- Mapped network, storage, and secrets dependencies before the migration.

- Separated workloads by namespace with per-tenant resource limits, using a standardized Helm values pattern per tenant.

- Progressive rollout: pilot tenant first, validating runbook, metrics, and rollback before scaling to the remaining client groups.

- Standardized probes, requests/limits, and operational labels across all services.

- Instrumented latency, error, and saturation metrics, with automated smoke tests after every rollout.

- Formalized rollback playbooks for every critical service, with automatic post-deploy validation.

> **Tip:** Start with a pilot tenant and validate runbook, metrics, and rollback before scaling.

## Result

Migration completed with no availability incident noticeable to tenants. The phased rollout caught configuration issues in the pilot tenant before they could affect the entire base, and the smoke-test checklist caught regressions before they turned into incidents.

## Lessons learned

- Migrating all tenants at once, without a pilot phase, would have hidden problems until they hit full scale — where the cost of rollback would have been much higher.

- Ignoring per-tenant resource limits creates a noisy-neighbor problem: one noisy tenant drags down the performance of others on the same node.

- An informal rollback process for a critical service is technical debt disguised as time savings — it comes due the first time a migration goes wrong.
