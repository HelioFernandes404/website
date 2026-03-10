---
title: "SQL vs NoSQL na vida real: Postgres, Mongo e Dynamo"
description: "Guia objetivo de escolha por padrão de acesso, consistência e custo operacional."
pubDate: "2026-01-14"
category: "Backend"
lead: "Escolha de banco é decisão de acesso e operação, não de tendência tecnológica."
tags:
  - "PostgreSQL"
  - "MongoDB"
  - "DynamoDB"
  - "data modeling"
---

## Problema real e contexto

Novos serviços pediam velocidade de entrega, mas decisões apressadas de banco podem criar dívida estrutural.

A proposta foi definir um roteiro de decisão baseado em requisitos mensuráveis.

## Decisões técnicas

- Postgres para transação forte e consultas relacionais.

- Mongo para flexibilidade de documento com evolução rápida.

- Dynamo para escala horizontal previsível por chave de acesso.

- Avaliar custo por padrão de leitura/escrita e retenção.

> **Tip:** Modele pelos acessos críticos primeiro, depois normalize/denormalize conforme necessidade.

## Checklist final

- Mapear consultas críticas e volume esperado.

- Definir exigência de consistência por caso de uso.

- Estimar custo de índices, storage e throughput.

- Documentar anti-patterns específicos do domínio.

## Erros comuns

- Escolher banco por familiaridade e não por requisito.

- Ignorar impacto de índices no custo total.

- Tentar usar um único banco para todos os cenários.
