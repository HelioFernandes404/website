---
title: "Dai Tec AI"
description: "Plataforma SaaS de assistentes de IA conversacional multi-tenant, com billing recorrente em Stripe e atendimento em WhatsApp. Deploy caiu de 40 para 8 minutos."
tech:
  - "Node.js / TypeScript"
  - "AWS"
  - "Stripe"
order: 1
category: "01. Fintech"
metricLabel: "DEPLOY TIME"
metricValue: "-80%"
metricCaption: "40MIN -> 8MIN"
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
imageAlt: "Projeto Dai Tec AI com dashboard financeiro e automacao inteligente"
carl:
  context: "A DAI-TEC operava um SaaS de assistentes de IA conversacional atendendo 7 segmentos de tenant, com entrada por WhatsApp e cobranca recorrente. Cada deploy levava 40 minutos e precisava ser repetido em 3 ambientes, o que travava a frequencia de entrega. Do lado do produto, cada segmento novo exigia isolamento de consumo e de cobranca sem duplicar a base de codigo."
  action: "Estruturei a camada de CI/CD com GitHub Actions, Docker e AWS (ECR/ECS) cobrindo os 3 ambientes. No produto, implementei o billing recorrente com Stripe -- checkout, webhooks, assinaturas, invoices, cartao e boleto -- e operei o backend Node.js/TypeScript sobre MongoDB sustentando os 7 segmentos de tenant com isolamento de consumo. A camada conversacional integrou 4 provedores de WhatsApp e 29 workflows n8n para orquestracao de canal, sobre uma stack de IA com RAG em Qdrant, LiteLLM e 6 agentes especializados. Observabilidade via Prometheus, Grafana e Loki."
  result: "Deploy de 40 para 8 minutos (-80%), com mais de 737 execucoes de pipeline acumuladas nos 3 ambientes. Os 7 segmentos de tenant passaram a rodar em producao com cobranca recorrente e isolamento de consumo, e a troca de provedor de WhatsApp deixou de ser mudanca de codigo."
  learning: "Billing e o subsistema que menos perdoa: webhook do Stripe chega fora de ordem e pode repetir, entao idempotencia por evento precisa existir desde o primeiro dia, nao depois do primeiro incidente de cobranca duplicada. E abstrair os 4 provedores de WhatsApp atras de uma interface custou tempo antes de pagar -- so virou vantagem clara quando um provedor degradou e a troca foi configuracao em vez de refactor."
architecture:
  title: "Arquitetura"
  hint: "Clique em um componente para ver a decisao tomada ali e o que ela custou."
  nodes:
    - id: "whatsapp"
      label: "WhatsApp"
      kind: "entry"
      subtitle: "4 provedores"
      x: 0
      y: 40
      decision: "Integrar 4 provedores de WhatsApp atras de uma interface unica, em vez de acoplar o backend ao SDK de um so."
      tradeoff: "Custou uma camada de adaptacao a mais e trabalho adiantado que nao gerava feature visivel. Pagou quando um provedor degradou: a troca virou configuracao, nao refactor."
    - id: "n8n"
      label: "n8n"
      kind: "service"
      subtitle: "29 workflows"
      x: 260
      y: 40
      decision: "Orquestrar canal e integracoes em 29 workflows n8n, mantendo fora do backend a logica que mudava por cliente."
      tradeoff: "Parte do comportamento do sistema passou a viver fora do controle de versao do backend, o que dificulta review e testes. Em troca, ajuste de fluxo por cliente parou de exigir deploy."
    - id: "api"
      label: "API Node.js / TS"
      kind: "service"
      x: 520
      y: 130
      decision: "Backend unico multi-tenant com isolamento de consumo por segmento, em vez de uma instancia por cliente."
      tradeoff: "Todo caminho de dados precisa carregar o tenant corretamente -- um vazamento entre tenants seria falha grave. Evitou multiplicar operacao e custo por 7."
    - id: "stripe"
      label: "Stripe"
      kind: "external"
      subtitle: "checkout, webhooks"
      x: 260
      y: 300
      decision: "Delegar cobranca recorrente ao Stripe (assinaturas, invoices, cartao e boleto) em vez de construir controle de cobranca proprio."
      tradeoff: "Amarra o modelo de cobranca ao vocabulario do Stripe e a uma taxa por transacao. Em troca, PCI, retentativa de cobranca e emissao de invoice deixaram de ser codigo nosso."
    - id: "mongo"
      label: "MongoDB"
      kind: "data"
      subtitle: "7 segmentos de tenant"
      x: 800
      y: 240
    - id: "llm"
      label: "LiteLLM + 6 agentes"
      kind: "service"
      x: 800
      y: 20
      decision: "Colocar o LiteLLM como camada unica de acesso a modelo, com 6 agentes especializados em vez de um agente generico."
      tradeoff: "Mais superficie para manter e roteamento a decidir. Em compensacao, trocar de modelo virou configuracao, e agente com escopo estreito erra menos que um que tenta fazer tudo."
    - id: "qdrant"
      label: "Qdrant"
      kind: "data"
      subtitle: "RAG"
      x: 1080
      y: 20
    - id: "obs"
      label: "Prometheus / Grafana / Loki"
      kind: "service"
      x: 520
      y: 380
  edges:
    - from: "whatsapp"
      to: "n8n"
      label: "mensagem"
    - from: "n8n"
      to: "api"
    - from: "stripe"
      to: "api"
      label: "webhooks"
      async: true
    - from: "api"
      to: "llm"
    - from: "llm"
      to: "qdrant"
      label: "RAG"
    - from: "api"
      to: "mongo"
    - from: "api"
      to: "obs"
      label: "metricas / logs"
      async: true
---

Plataforma SaaS de assistentes de IA conversacional operada entre julho de 2022 e dezembro de 2024, cobrindo 7 segmentos de tenant com billing recorrente e atendimento multi-canal.
