---
title: "GitOps na prática: ArgoCD + Helm para onboarding de clientes"
description: "Como reduzir onboarding de dias para horas com estrutura de repositórios, templates e promoção por ambiente."
pubDate: "2026-02-04"
category: "GitOps"
lead: "GitOps funciona quando o repositório representa o estado desejado com clareza e repetibilidade."
tags:
  - "GitOps"
  - "ArgoCD"
  - "Helm"
  - "multi-tenant"
  - "deployment automation"
---

## Problema real e contexto

O onboarding manual por cliente consumia tempo e aumentava variação entre ambientes.

Foi necessário transformar o processo em pipeline declarativo com validação e promoção controlada.

## Decisões técnicas

- Separação entre chart base e values por cliente.

- ArgoCD para sincronização contínua e drift detection.

- Estratégia de promoção com gates por ambiente.

- Política de secrets com rotação e escopo mínimo.

> **Tip:** Padronize naming de apps e namespaces para simplificar suporte em escala.

## Checklist final

- Template único validado para novos clientes.

- Checklist de variáveis obrigatórias por tenant.

- Pipeline com lint, render e policy checks.

- Playbook de rollback por release.

## Erros comuns

- Misturar configuração global e específica no mesmo arquivo.

- Promover sem validação em staging.

- Guardar segredo em texto puro no repositório.
