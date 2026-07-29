---
title: "Implementando RBAC: quando centralizar parecia a resposta certa"
description: "Por que um RBAC Core centralizado virou ponto único de falha e gargalo organizacional, e como um modelo federado com OpenFGA resolveu isso."
pubDate: "2026-07-29"
category: "Arquitetura"
lead: "Uma boa arquitetura de autorização não concentra o controle: ela distribui responsabilidades sem perder a capacidade de governar o conjunto."
tags:
  - "RBAC"
  - "OpenFGA"
  - "Authorization"
  - "Distributed Systems"
  - "Architecture"
---

Quando comecei a trabalhar na implementação de RBAC, o objetivo parecia simples: criar um ponto central para controlar quem poderia acessar cada recurso das aplicações.

## A primeira ideia: um RBAC Core

A primeira ideia foi construir um **RBAC Core**. Todas as aplicações consultariam esse serviço antes de permitir uma ação.

O fluxo seria parecido com isto:

```text
┌─────────┐      ┌─────────┐      ┌───────────┐      ┌──────────┐
│ App A   │─────▶│         │      │           │      │          │
├─────────┤      │ RBAC    │─────▶│  OpenFGA  │─────▶│ Decisão  │
│ App B   │─────▶│ Core    │      │           │      │          │
├─────────┤      │         │      │           │      │          │
│ App C   │─────▶│         │      │           │      │          │
└─────────┘      └─────────┘      └───────────┘      └──────────┘
```

Na teoria, isso entregaria padronização, governança e uma interface única. Na prática, começaram a surgir algumas perguntas importantes.

O que aconteceria se o RBAC Core ficasse indisponível? Todas as aplicações perderiam a capacidade de autorizar usuários? Quem seria responsável por atualizar os modelos de autorização? O time responsável pelo serviço central precisaria conhecer todas as regras de negócio de todos os sistemas?

Percebi que estávamos criando não apenas um serviço central, mas também um possível ponto único de falha e um gargalo organizacional.

## A virada: um modelo federado

A arquitetura começou então a evoluir para um modelo federado:

```text
┌─────────┐      ┌──────────────────┐
│ App A   │─────▶│ SDK autorização  │─────▶┐
└─────────┘      └──────────────────┘      │
                                            │
┌─────────┐      ┌──────────────────┐      ▼
│ App B   │─────▶│ SDK autorização  │─────▶ OpenFGA
└─────────┘      └──────────────────┘      ▲
                                            │
┌─────────┐      ┌──────────────────┐      │
│ App C   │─────▶│ SDK autorização  │─────▶┘
└─────────┘      └──────────────────┘
                          │
                          │ modelos versionados,
                          │ aplicados como migrations
                          ▼
                 ┌──────────────────┐
                 │  Governança      │
                 │  central         │
                 │  (view/audit,    │
                 │  fora do caminho │
                 │  crítico)        │
                 └──────────────────┘
```

Cada aplicação passou a ser responsável pelo próprio modelo de autorização, por suas relações e por suas políticas. Essas políticas seriam tratadas de forma semelhante a migrations de banco de dados: versionadas, revisadas e aplicadas de maneira idempotente durante o deploy.

O serviço central deixou de estar no caminho crítico das requisições. Seu papel passou a ser o de governança: visualizar modelos, acompanhar alterações, executar auditorias e ajudar na administração das permissões.

Também entendemos que autorização não deveria depender completamente da disponibilidade do control plane. Por isso, entraram na discussão estratégias como cache temporário das decisões, aplicação automatizada dos modelos e comunicação direta entre cada sistema e o OpenFGA.

## O que ficou

A principal descoberta dessa caminhada foi que RBAC não é apenas uma tabela com usuários, papéis e permissões. É uma decisão de arquitetura distribuída.

Centralizar a governança pode ser valioso. Centralizar todas as decisões em tempo de execução, porém, pode aumentar o acoplamento e reduzir a resiliência.

No final, a implementação deixou de ser apenas sobre controlar acessos. Ela passou a ser sobre encontrar o equilíbrio entre autonomia, segurança, governança e disponibilidade.

E talvez essa tenha sido a maior lição: uma boa arquitetura de autorização não é aquela que concentra todo o controle, mas aquela que distribui responsabilidades sem perder a capacidade de governar o conjunto.
