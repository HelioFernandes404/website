---
title: "Exporters Prometheus custom: Aruba, Meraki e Zabbix"
description: "Como padronizar métricas heterogêneas de rede e observabilidade para consultas consistentes."
pubDate: "2026-02-12"
category: "Observability"
lead: "Sem padronização de métricas, a observabilidade vira coleção de dashboards desconectados."
tags:
  - "Prometheus exporters"
  - "SNMP"
  - "network monitoring"
  - "Zabbix"
---

## Problema real e contexto

As fontes de dados usavam formatos e nomenclaturas diferentes, dificultando correlação e alertas entre domínios.

A meta foi consolidar o modelo de métricas com semântica estável para operação e capacidade.

## Decisões técnicas

- Criar convenção de nomes e unidades para todas as métricas.

- Normalizar labels essenciais e descartar dimensões ruidosas.

- Expor health/status padronizados por endpoint.

- Versionar exporters e contratos de métrica.

> **Tip:** Documente o contrato das métricas como API: nome, tipo, unidade e labels.

## Checklist final

- Definir taxonomia oficial de métricas.

- Publicar exemplos de consultas para cada métrica principal.

- Adicionar testes de contrato no pipeline do exporter.

- Medir impacto de scraping no sistema de origem.

## Erros comuns

- Misturar unidade de tempo (ms, s) na mesma família de métrica.

- Criar label sem propósito operacional claro.

- Não versionar breaking changes no exporter.
