---
title: "Avaliação de RAG sem romantizar: testes mínimos para produção"
description: "Conjunto mínimo de testes e métricas para evitar regressões silenciosas em aplicações RAG."
pubDate: "2025-12-12"
category: "AI"
lead: "RAG sem avaliação contínua vira loteria: funciona no demo e falha no mundo real."
tags:
  - "RAG evaluation"
  - "retrieval metrics"
  - "hallucination"
  - "test harness"
---

## Problema real e contexto

Respostas aceitáveis em ambiente de teste não se sustentavam com dados vivos e perguntas reais.

Foi criado um processo de avaliação simples, repetível e integrado ao ciclo de release.

## Decisões técnicas

- Golden set com perguntas críticas por domínio.

- Métricas de retrieval e qualidade de resposta.

- Testes de regressão antes de cada atualização de índice/modelo.

- Critérios claros para bloquear release.

> **Tip:** Comece com um conjunto pequeno de casos críticos e aumente cobertura por prioridade de negócio.

## Checklist final

- Montar golden set revisado por especialistas do domínio.

- Definir limiar mínimo de qualidade aceitável.

- Executar regressão automatizada em mudanças de prompt/índice/modelo.

- Reportar tendência de qualidade ao longo do tempo.

## Erros comuns

- Avaliar apenas por percepção subjetiva.

- Não separar erro de retrieval de erro de geração.

- Atualizar índice sem rerodar suíte de regressão.
