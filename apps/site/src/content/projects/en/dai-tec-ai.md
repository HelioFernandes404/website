---
title: "Dai Tec AI"
description: "Multi-tenant conversational AI SaaS platform with recurring Stripe billing and WhatsApp support. Deploy time dropped from 40 to 8 minutes."
tech:
  - "Node.js / TypeScript"
  - "AWS"
  - "Stripe"
order: 1
category: "01. Fintech"
metricLabel: "DEPLOY TIME"
metricValue: "-80%"
metricCaption: "40MIN -> 8MIN"
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=70&w=640&auto=format&fit=crop&fm=webp"
imageAlt: "Dai Tec AI project with financial dashboard and intelligent automation"
carl:
  context: "DAI-TEC ran a conversational AI assistant SaaS serving 7 tenant segments, with WhatsApp as the entry channel and recurring billing. Each deploy took 40 minutes and had to be repeated across 3 environments, which throttled delivery frequency. On the product side, every new segment required consumption and billing isolation without duplicating the codebase."
  action: "I built the CI/CD layer with GitHub Actions, Docker, and AWS (ECR/ECS) covering all 3 environments. On the product side, I implemented recurring billing with Stripe -- checkout, webhooks, subscriptions, invoices, credit card and boleto -- and ran the Node.js/TypeScript backend on MongoDB, supporting the 7 tenant segments with consumption isolation. The conversational layer integrated 4 WhatsApp providers and 29 n8n workflows for channel orchestration, on top of an AI stack with RAG in Qdrant, LiteLLM, and 6 specialized agents. Observability ran through Prometheus, Grafana, and Loki."
  result: "Deploy time went from 40 to 8 minutes (-80%), with more than 737 pipeline runs accumulated across the 3 environments. The 7 tenant segments started running in production with recurring billing and consumption isolation, and switching WhatsApp providers stopped being a code change."
  learning: "Billing is the least forgiving subsystem: Stripe webhooks arrive out of order and can repeat, so per-event idempotency needs to exist from day one, not after the first duplicate-charge incident. Abstracting the 4 WhatsApp providers behind a single interface cost time before it paid off -- it only became a clear win when one provider degraded and switching became a config change instead of a refactor."
architecture:
  title: "Architecture"
  hint: "Click a component to see the decision made there and what it cost."
  nodes:
    - id: "whatsapp"
      label: "WhatsApp"
      kind: "entry"
      subtitle: "4 providers"
      x: 0
      y: 40
      decision: "Integrate 4 WhatsApp providers behind a single interface, instead of coupling the backend to one provider's SDK."
      tradeoff: "Cost an extra adaptation layer and upfront work that didn't produce a visible feature. It paid off when one provider degraded: switching became a config change, not a refactor."
    - id: "n8n"
      label: "n8n"
      kind: "service"
      subtitle: "29 workflows"
      x: 260
      y: 40
      decision: "Orchestrate channel and integrations across 29 n8n workflows, keeping logic that varied per client out of the backend."
      tradeoff: "Part of the system's behavior ended up living outside the backend's version control, which makes review and testing harder. In exchange, per-client flow adjustments stopped requiring a deploy."
    - id: "api"
      label: "API Node.js / TS"
      kind: "service"
      x: 520
      y: 130
      decision: "Single multi-tenant backend with per-segment consumption isolation, instead of one instance per client."
      tradeoff: "Every data path has to carry the tenant correctly -- a cross-tenant leak would be a serious failure. It avoided multiplying operations and cost by 7."
    - id: "stripe"
      label: "Stripe"
      kind: "external"
      subtitle: "checkout, webhooks"
      x: 260
      y: 300
      decision: "Delegate recurring billing to Stripe (subscriptions, invoices, credit card, and boleto) instead of building a proprietary billing engine."
      tradeoff: "Ties the billing model to Stripe's vocabulary and a per-transaction fee. In exchange, PCI compliance, charge retries, and invoice issuance stopped being our code to maintain."
    - id: "mongo"
      label: "MongoDB"
      kind: "data"
      subtitle: "7 tenant segments"
      x: 800
      y: 240
    - id: "llm"
      label: "LiteLLM + 6 agents"
      kind: "service"
      x: 800
      y: 20
      decision: "Put LiteLLM as the single model-access layer, with 6 specialized agents instead of one generic agent."
      tradeoff: "More surface area to maintain and routing to decide. In exchange, switching models became a config change, and a narrowly scoped agent makes fewer mistakes than one trying to do everything."
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
      label: "message"
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
      label: "metrics / logs"
      async: true
---

Conversational AI assistant SaaS platform operated between July 2022 and December 2024, covering 7 tenant segments with recurring billing and multi-channel support.
