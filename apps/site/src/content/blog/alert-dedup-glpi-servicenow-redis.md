---
title: "Alertas com deduplicação: GLPI + ServiceNow + Redis"
description: "Estratégia para reduzir ruído operacional com idempotência, janelas de correlação e integração ITSM."
pubDate: "2026-02-08"
category: "DevOps"
lead: "O incidente crítico não é o alerta que falta, e sim o ruído que faz o time ignorar sinais importantes."
tags:
  - "alert deduplication"
  - "incident management"
  - "Redis"
  - "ITSM"
---

## Problema real e contexto

Alertas duplicados geravam tickets repetidos e aumento de MTTA. O fluxo entre monitoramento e ITSM precisava de controle de repetição.

A proposta foi centralizar deduplicação e roteamento antes da abertura de chamados.

## Decisões técnicas

- Chave idempotente por fingerprint de alerta.

- Janela de dedup por severidade e tipo de evento.

- Redis como camada de estado temporal.

- Regras explícitas de abertura, atualização e fechamento de ticket.

> **Tip:** Defina a fingerprint do alerta com campos estáveis para evitar falsos positivos de dedup.

## Checklist final

- Padronizar payload de alerta antes da deduplicação.

- Definir TTL por criticidade e serviço.

- Registrar trilha de auditoria para cada decisão do fluxo.

- Medir redução de tickets duplicados por semana.

## Erros comuns

- TTL curto demais e reabertura excessiva de incidentes.

- Fingerprint com campos voláteis.

- Falta de observabilidade no próprio pipeline de alertas.
