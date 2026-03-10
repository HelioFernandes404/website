---
title: "Docker → Kubernetes (K3s) em ambiente multi-tenant"
description: "Checklist prático da migração para K3s: rollout, isolamento por tenant e trade-offs que evitaram incidentes."
pubDate: "2026-02-20"
category: "DevOps"
lead: "Migrar para K3s em multi-tenant exige disciplina de rollout e observabilidade desde o primeiro deploy."
tags:
  - "Kubernetes"
  - "K3s"
  - "multi-tenant"
  - "migration"
  - "SRE"
---

## Problema real e contexto

A operação cresceu com múltiplos clientes e o modelo baseado em Docker Compose começou a gerar fricção em deploy, escalabilidade e troubleshooting.

O objetivo foi migrar com downtime mínimo, mantendo governança por tenant e previsibilidade de custo.

## Decisões técnicas

- Separação por namespaces e limites de recursos por tenant.

- Rollout progressivo por grupos de clientes antes da migração total.

- Padronização de probes, requests/limits e labels operacionais.

- Playbooks de rollback e validação automática pós-deploy.

> **Tip:** Comece com um tenant piloto e valide runbook, métricas e rollback antes de escalar.

## Checklist final

- Mapear dependências de rede, storage e segredos antes da migração.

- Definir padrão de helm values por tenant.

- Instrumentar métricas de latência, erro e saturação.

- Executar smoke tests automatizados após cada rollout.

## Erros comuns

- Migrar todos os tenants de uma vez sem fase piloto.

- Ignorar limites de recursos e causar noisy neighbor.

- Não formalizar rollback por serviço crítico.
