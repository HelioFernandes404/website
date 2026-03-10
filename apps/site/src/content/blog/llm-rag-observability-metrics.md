---
title: "Observabilidade para LLM/RAG: o que medir e como instrumentar"
description: "Métricas essenciais de latência, custo e qualidade para operações de IA com visibilidade ponta a ponta."
pubDate: "2026-01-02"
category: "AI"
lead: "Sem observabilidade de IA, o time só descobre degradação quando o usuário reclama."
tags:
  - "LLM observability"
  - "OpenTelemetry"
  - "Prometheus"
  - "metrics"
---

## Problema real e contexto

Custos e latência variavam por rota e tipo de pergunta sem visibilidade por etapa.

A solução foi definir telemetria mínima para gestão contínua de qualidade e eficiência.

## Decisões técnicas

- Métricas por etapa: retrieval, geração e pós-processamento.

- Tracing distribuído com correlação de request.

- Controle de custo por token e por fluxo de negócio.

- Alertas para degradação de qualidade e timeout.

> **Tip:** Monitore qualidade com dataset fixo além de métricas de performance.

## Checklist final

- Definir SLIs de latência e taxa de fallback.

- Adicionar tags de modelo, versão e tenant nas métricas.

- Consolidar custo diário por feature de produto.

- Criar painéis executivos e painéis de engenharia separados.

## Erros comuns

- Medir apenas latência e ignorar qualidade.

- Falta de segmentação por modelo/tenant.

- Não correlacionar custo com valor entregue.
