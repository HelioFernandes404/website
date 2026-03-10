---
title: "Terraform + Ansible: divisão correta de responsabilidades"
description: "Estratégia para evitar drift separando provisionamento de infraestrutura e configuração de runtime."
pubDate: "2026-01-31"
category: "IaC"
lead: "Quando Terraform e Ansible têm fronteiras claras, o pipeline ganha previsibilidade e o drift cai."
tags:
  - "Terraform"
  - "Ansible"
  - "IaC"
  - "drift"
  - "automation"
---

## Problema real e contexto

Sem fronteira entre ferramentas, tasks se sobrepunham e mudanças manuais viravam fonte recorrente de drift.

A prioridade foi criar um modelo simples para saber onde cada responsabilidade vive.

## Decisões técnicas

- Terraform para recursos declarativos de infraestrutura.

- Ansible para configuração de sistema e pacotes.

- Pipelines independentes com checkpoints de integração.

- Inventário e estado versionados com revisão obrigatória.

> **Tip:** Evite usar Ansible para 'corrigir' recurso que deveria ser gerenciado por Terraform.

## Checklist final

- Publicar matriz de responsabilidades TF x Ansible.

- Bloquear mudanças fora de pipeline.

- Executar detecção de drift em rotina contínua.

- Documentar exceções temporárias com prazo de remoção.

## Erros comuns

- Provisionar e configurar o mesmo recurso em duas ferramentas.

- Aplicar hotfix manual sem registrar no IaC.

- Não revisar módulo reutilizável após mudança crítica.
