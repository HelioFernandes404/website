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

## Contexto

A operação cresceu com múltiplos clientes e o modelo baseado em Docker Compose começou a gerar fricção em deploy, escalabilidade e troubleshooting.

O objetivo foi migrar para K3s com downtime mínimo, mantendo governança por tenant e previsibilidade de custo.

## Ação

- Mapeamento de dependências de rede, storage e segredos antes da migração.

- Separação por namespaces e limites de recursos por tenant, com padrão de helm values definido por tenant.

- Rollout progressivo: tenant piloto primeiro, validando runbook, métricas e rollback antes de escalar para os demais grupos de clientes.

- Padronização de probes, requests/limits e labels operacionais em todos os serviços.

- Instrumentação de métricas de latência, erro e saturação, com smoke tests automatizados após cada rollout.

- Playbooks de rollback formalizados por serviço crítico, com validação automática pós-deploy.

> **Tip:** Comece com um tenant piloto e valide runbook, métricas e rollback antes de escalar.

## Resultado

Migração concluída sem incidente de disponibilidade percebido pelos tenants. O rollout faseado permitiu detectar problemas de configuração no tenant piloto antes que afetassem a base inteira, e o checklist de smoke tests pegou regressões antes de virarem incidente.

## Aprendizado

- Migrar todos os tenants de uma vez, sem fase piloto, teria escondido problemas até a escala total — e aí o custo de rollback seria maior.

- Ignorar limites de recursos por tenant gera noisy neighbor: um tenant barulhento derruba a performance dos outros no mesmo node.

- Rollback não formalizado por serviço crítico é dívida técnica disfarçada de economia de tempo — cobra na primeira migração que dá errado.
