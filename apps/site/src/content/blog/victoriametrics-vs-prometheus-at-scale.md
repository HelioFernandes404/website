---
title: "Observabilidade para 1.200 servidores: VictoriaMetrics vs Prometheus"
description: "Quando usar Prometheus puro e quando o VictoriaMetrics traz melhor retenção e custo em escala."
pubDate: "2026-02-16"
category: "Observability"
lead: "Em escala, a decisão não é sobre ferramenta favorita, e sim sobre cardinalidade, retenção e custo por métrica útil."
tags:
  - "VictoriaMetrics"
  - "Prometheus"
  - "metrics at scale"
  - "remote write"
---

## Problema real e contexto

Com mais de mil servidores, o volume de séries e a janela de retenção passaram a impactar performance e custo operacional.

Foi necessário revisar a arquitetura de coleta e armazenamento para manter consultas rápidas e alertas confiáveis.

## Decisões técnicas

- Prometheus para scraping e regras locais de alerta.

- VictoriaMetrics para retenção longa e ingestão otimizada.

- Controle de cardinalidade por naming e labels obrigatórios.

- Dashboards com foco em SLO, não em vanity metrics.

> **Tip:** Sem política de cardinalidade, qualquer stack de observabilidade degrada rapidamente.

## Checklist final

- Definir budget de cardinalidade por domínio.

- Padronizar labels como env, service e tenant.

- Monitorar ingestão, query latency e uso de disco.

- Revisar periodicamente séries sem uso em dashboards/alertas.

## Erros comuns

- Reter tudo por padrão sem critério de negócio.

- Criar labels de alta cardinalidade com IDs dinâmicos.

- Alertar em sinais ruidosos sem deduplicação.
