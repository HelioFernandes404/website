---
title: "RAG em produção para CRM: LangChain + LlamaIndex"
description: "Arquitetura prática para RAG com foco em recuperação confiável, latência controlada e limites operacionais."
pubDate: "2026-01-08"
category: "AI"
lead: "RAG em produção não é só gerar resposta boa, é manter qualidade consistente sob carga real."
tags:
  - "RAG"
  - "LangChain"
  - "LlamaIndex"
  - "LLM"
  - "production AI"
---

## Problema real e contexto

Times de atendimento precisavam acessar conhecimento distribuído sem depender de busca manual.

O objetivo foi criar uma camada RAG com governança de contexto e monitoramento contínuo.

## Decisões técnicas

- Pipeline de chunking e embeddings com versionamento.

- Fallback para resposta sem contexto quando retrieval falhar.

- Camada de avaliação com conjunto de perguntas críticas.

- Logs estruturados por etapa: retrieval, prompt e resposta.

> **Tip:** Não misture dados de baixa confiança no mesmo índice sem metadados de qualidade.

## Checklist final

- Definir estratégia de chunk e overlap por tipo de documento.

- Registrar versão de embedding em cada item indexado.

- Instrumentar latência e taxa de resposta sem contexto.

- Criar rotina de reindexação controlada.

## Erros comuns

- Assumir que prompt resolve retrieval ruim.

- Não validar dados duplicados ou desatualizados no índice.

- Ignorar fallback quando a confiança é baixa.
