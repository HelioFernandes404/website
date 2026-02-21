export interface BlogPostSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  tips?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  lead: string;
  sections: BlogPostSection[];
  checklist: string[];
  commonErrors: string[];
  keywords: string[];
}

export const posts: BlogPost[] = [
  {
    slug: "k3s-multi-tenant-migration-checklist",
    title: "Docker → Kubernetes (K3s) em ambiente multi-tenant",
    description:
      "Checklist prático da migração para K3s: rollout, isolamento por tenant e trade-offs que evitaram incidentes.",
    date: "2026-02-20",
    category: "DevOps",
    lead: "Migrar para K3s em multi-tenant exige disciplina de rollout e observabilidade desde o primeiro deploy.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "A operação cresceu com múltiplos clientes e o modelo baseado em Docker Compose começou a gerar fricção em deploy, escalabilidade e troubleshooting.",
          "O objetivo foi migrar com downtime mínimo, mantendo governança por tenant e previsibilidade de custo.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Separação por namespaces e limites de recursos por tenant.",
          "Rollout progressivo por grupos de clientes antes da migração total.",
          "Padronização de probes, requests/limits e labels operacionais.",
          "Playbooks de rollback e validação automática pós-deploy.",
        ],
        tips: ["Comece com um tenant piloto e valide runbook, métricas e rollback antes de escalar."],
      },
    ],
    checklist: [
      "Mapear dependências de rede, storage e segredos antes da migração.",
      "Definir padrão de helm values por tenant.",
      "Instrumentar métricas de latência, erro e saturação.",
      "Executar smoke tests automatizados após cada rollout.",
    ],
    commonErrors: [
      "Migrar todos os tenants de uma vez sem fase piloto.",
      "Ignorar limites de recursos e causar noisy neighbor.",
      "Não formalizar rollback por serviço crítico.",
    ],
    keywords: ["Kubernetes", "K3s", "multi-tenant", "migration", "SRE"],
  },
  {
    slug: "victoriametrics-vs-prometheus-at-scale",
    title: "Observabilidade para 1.200 servidores: VictoriaMetrics vs Prometheus",
    description:
      "Quando usar Prometheus puro e quando o VictoriaMetrics traz melhor retenção e custo em escala.",
    date: "2026-02-16",
    category: "Observability",
    lead: "Em escala, a decisão não é sobre ferramenta favorita, e sim sobre cardinalidade, retenção e custo por métrica útil.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "Com mais de mil servidores, o volume de séries e a janela de retenção passaram a impactar performance e custo operacional.",
          "Foi necessário revisar a arquitetura de coleta e armazenamento para manter consultas rápidas e alertas confiáveis.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Prometheus para scraping e regras locais de alerta.",
          "VictoriaMetrics para retenção longa e ingestão otimizada.",
          "Controle de cardinalidade por naming e labels obrigatórios.",
          "Dashboards com foco em SLO, não em vanity metrics.",
        ],
        tips: ["Sem política de cardinalidade, qualquer stack de observabilidade degrada rapidamente."],
      },
    ],
    checklist: [
      "Definir budget de cardinalidade por domínio.",
      "Padronizar labels como env, service e tenant.",
      "Monitorar ingestão, query latency e uso de disco.",
      "Revisar periodicamente séries sem uso em dashboards/alertas.",
    ],
    commonErrors: [
      "Reter tudo por padrão sem critério de negócio.",
      "Criar labels de alta cardinalidade com IDs dinâmicos.",
      "Alertar em sinais ruidosos sem deduplicação.",
    ],
    keywords: ["VictoriaMetrics", "Prometheus", "metrics at scale", "remote write"],
  },
  {
    slug: "prometheus-exporters-aruba-meraki-zabbix",
    title: "Exporters Prometheus custom: Aruba, Meraki e Zabbix",
    description:
      "Como padronizar métricas heterogêneas de rede e observabilidade para consultas consistentes.",
    date: "2026-02-12",
    category: "Observability",
    lead: "Sem padronização de métricas, a observabilidade vira coleção de dashboards desconectados.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "As fontes de dados usavam formatos e nomenclaturas diferentes, dificultando correlação e alertas entre domínios.",
          "A meta foi consolidar o modelo de métricas com semântica estável para operação e capacidade.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Criar convenção de nomes e unidades para todas as métricas.",
          "Normalizar labels essenciais e descartar dimensões ruidosas.",
          "Expor health/status padronizados por endpoint.",
          "Versionar exporters e contratos de métrica.",
        ],
        tips: ["Documente o contrato das métricas como API: nome, tipo, unidade e labels."],
      },
    ],
    checklist: [
      "Definir taxonomia oficial de métricas.",
      "Publicar exemplos de consultas para cada métrica principal.",
      "Adicionar testes de contrato no pipeline do exporter.",
      "Medir impacto de scraping no sistema de origem.",
    ],
    commonErrors: [
      "Misturar unidade de tempo (ms, s) na mesma família de métrica.",
      "Criar label sem propósito operacional claro.",
      "Não versionar breaking changes no exporter.",
    ],
    keywords: ["Prometheus exporters", "SNMP", "network monitoring", "Zabbix"],
  },
  {
    slug: "alert-dedup-glpi-servicenow-redis",
    title: "Alertas com deduplicação: GLPI + ServiceNow + Redis",
    description:
      "Estratégia para reduzir ruído operacional com idempotência, janelas de correlação e integração ITSM.",
    date: "2026-02-08",
    category: "DevOps",
    lead: "O incidente crítico não é o alerta que falta, e sim o ruído que faz o time ignorar sinais importantes.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "Alertas duplicados geravam tickets repetidos e aumento de MTTA. O fluxo entre monitoramento e ITSM precisava de controle de repetição.",
          "A proposta foi centralizar deduplicação e roteamento antes da abertura de chamados.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Chave idempotente por fingerprint de alerta.",
          "Janela de dedup por severidade e tipo de evento.",
          "Redis como camada de estado temporal.",
          "Regras explícitas de abertura, atualização e fechamento de ticket.",
        ],
        tips: ["Defina a fingerprint do alerta com campos estáveis para evitar falsos positivos de dedup."],
      },
    ],
    checklist: [
      "Padronizar payload de alerta antes da deduplicação.",
      "Definir TTL por criticidade e serviço.",
      "Registrar trilha de auditoria para cada decisão do fluxo.",
      "Medir redução de tickets duplicados por semana.",
    ],
    commonErrors: [
      "TTL curto demais e reabertura excessiva de incidentes.",
      "Fingerprint com campos voláteis.",
      "Falta de observabilidade no próprio pipeline de alertas.",
    ],
    keywords: ["alert deduplication", "incident management", "Redis", "ITSM"],
  },
  {
    slug: "gitops-argocd-helm-client-onboarding",
    title: "GitOps na prática: ArgoCD + Helm para onboarding de clientes",
    description:
      "Como reduzir onboarding de dias para horas com estrutura de repositórios, templates e promoção por ambiente.",
    date: "2026-02-04",
    category: "GitOps",
    lead: "GitOps funciona quando o repositório representa o estado desejado com clareza e repetibilidade.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "O onboarding manual por cliente consumia tempo e aumentava variação entre ambientes.",
          "Foi necessário transformar o processo em pipeline declarativo com validação e promoção controlada.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Separação entre chart base e values por cliente.",
          "ArgoCD para sincronização contínua e drift detection.",
          "Estratégia de promoção com gates por ambiente.",
          "Política de secrets com rotação e escopo mínimo.",
        ],
        tips: ["Padronize naming de apps e namespaces para simplificar suporte em escala."],
      },
    ],
    checklist: [
      "Template único validado para novos clientes.",
      "Checklist de variáveis obrigatórias por tenant.",
      "Pipeline com lint, render e policy checks.",
      "Playbook de rollback por release.",
    ],
    commonErrors: [
      "Misturar configuração global e específica no mesmo arquivo.",
      "Promover sem validação em staging.",
      "Guardar segredo em texto puro no repositório.",
    ],
    keywords: ["GitOps", "ArgoCD", "Helm", "multi-tenant", "deployment automation"],
  },
  {
    slug: "terraform-ansible-responsibility-split",
    title: "Terraform + Ansible: divisão correta de responsabilidades",
    description:
      "Estratégia para evitar drift separando provisionamento de infraestrutura e configuração de runtime.",
    date: "2026-01-31",
    category: "IaC",
    lead: "Quando Terraform e Ansible têm fronteiras claras, o pipeline ganha previsibilidade e o drift cai.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "Sem fronteira entre ferramentas, tasks se sobrepunham e mudanças manuais viravam fonte recorrente de drift.",
          "A prioridade foi criar um modelo simples para saber onde cada responsabilidade vive.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Terraform para recursos declarativos de infraestrutura.",
          "Ansible para configuração de sistema e pacotes.",
          "Pipelines independentes com checkpoints de integração.",
          "Inventário e estado versionados com revisão obrigatória.",
        ],
        tips: ["Evite usar Ansible para 'corrigir' recurso que deveria ser gerenciado por Terraform."],
      },
    ],
    checklist: [
      "Publicar matriz de responsabilidades TF x Ansible.",
      "Bloquear mudanças fora de pipeline.",
      "Executar detecção de drift em rotina contínua.",
      "Documentar exceções temporárias com prazo de remoção.",
    ],
    commonErrors: [
      "Provisionar e configurar o mesmo recurso em duas ferramentas.",
      "Aplicar hotfix manual sem registrar no IaC.",
      "Não revisar módulo reutilizável após mudança crítica.",
    ],
    keywords: ["Terraform", "Ansible", "IaC", "drift", "automation"],
  },
  {
    slug: "microservices-node-python-reliability-patterns",
    title: "Microsserviços Node.js + Python com zero incidentes críticos",
    description:
      "Padrões operacionais repetíveis para confiabilidade em produção com serviços heterogêneos.",
    date: "2026-01-27",
    category: "Backend",
    lead: "Confiabilidade em microserviços é processo: contratos claros, limites explícitos e telemetria útil.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "Serviços em linguagens diferentes exigiam padrões unificados para health checks, timeout e observabilidade.",
          "O desafio era manter previsibilidade de comportamento sem limitar autonomia de stack.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Timeout e retry com budget por operação.",
          "Health checks separados para liveness e readiness.",
          "Tracing distribuído e logs estruturados por request.",
          "Circuit breaker para dependências com histórico de instabilidade.",
        ],
        tips: ["Defina um contrato operacional mínimo que todo serviço precisa cumprir antes de ir para produção."],
      },
    ],
    checklist: [
      "Padronizar middleware de observabilidade em todas as APIs.",
      "Definir SLIs e SLOs por domínio de negócio.",
      "Executar testes de falha em dependências externas.",
      "Criar runbook de incidente para serviços críticos.",
    ],
    commonErrors: [
      "Retry sem backoff causando efeito cascata.",
      "Health check superficial que não detecta degradação real.",
      "Logs sem correlação entre serviços.",
    ],
    keywords: ["microservices", "Node.js", "Python", "reliability", "production readiness"],
  },
  {
    slug: "redis-beyond-cache-idempotency",
    title: "Redis além de cache: deduplicação, idempotência e filas simples",
    description:
      "Uso pragmático de Redis para integrar sistemas com menor repetição de eventos e melhor controle de concorrência.",
    date: "2026-01-22",
    category: "Backend",
    lead: "Redis é uma ferramenta de coordenação leve quando você precisa de resposta rápida e modelo simples.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "Integrações assíncronas sofriam com reentrega de eventos e execução duplicada de processos.",
          "Era necessário implementar barreiras de idempotência sem aumentar complexidade arquitetural.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Chaves de idempotência por operação com TTL.",
          "Locks com tempo curto para seções críticas.",
          "Filas simples para amortecer picos de processamento.",
          "Auditoria de eventos descartados por duplicidade.",
        ],
        tips: ["Desenhe as chaves com semântica de negócio, não apenas com IDs técnicos."],
      },
    ],
    checklist: [
      "Definir política de expiração por tipo de operação.",
      "Garantir idempotência também no destino final.",
      "Medir taxa de mensagens duplicadas evitadas.",
      "Planejar comportamento para expiração antecipada de chave.",
    ],
    commonErrors: [
      "TTL longo demais consumindo memória desnecessária.",
      "Lock sem estratégia de renovação/expiração.",
      "Assumir que dedup elimina necessidade de observabilidade.",
    ],
    keywords: ["Redis", "idempotency", "deduplication", "distributed systems"],
  },
  {
    slug: "stripe-whatsapp-architecture",
    title: "Integrações de pagamentos e mensageria: Stripe + WhatsApp Business API",
    description:
      "Arquitetura orientada a webhooks com retries, DLQ e rastreabilidade ponta a ponta.",
    date: "2026-01-19",
    category: "Backend",
    lead: "Integrações externas confiáveis dependem mais de fluxo assíncrono robusto do que de SDK.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "Eventos de pagamento e comunicação precisavam ser processados com confiabilidade e sem perda de contexto.",
          "O foco foi garantir consistência operacional mesmo com falhas transitórias de provedores.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Validação de assinatura e autenticação de webhooks.",
          "Processamento assíncrono com retries exponenciais.",
          "DLQ para eventos inválidos ou com falha recorrente.",
          "Ledger de auditoria para rastrear estado de cada evento.",
        ],
        tips: ["Nunca execute lógica pesada na recepção síncrona do webhook."],
      },
    ],
    checklist: [
      "Validar assinatura antes de persistir evento.",
      "Registrar idempotency key por provider event id.",
      "Definir política clara de retry e dead-letter.",
      "Criar dashboards de sucesso, atraso e falha.",
    ],
    commonErrors: [
      "Ignorar ordem de entrega de webhooks.",
      "Não tratar eventos duplicados como cenário normal.",
      "Falta de trilha de auditoria para reconciliação financeira.",
    ],
    keywords: ["Stripe", "WhatsApp Business API", "webhooks", "async processing"],
  },
  {
    slug: "sql-vs-nosql-decision-guide",
    title: "SQL vs NoSQL na vida real: Postgres, Mongo e Dynamo",
    description:
      "Guia objetivo de escolha por padrão de acesso, consistência e custo operacional.",
    date: "2026-01-14",
    category: "Backend",
    lead: "Escolha de banco é decisão de acesso e operação, não de tendência tecnológica.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "Novos serviços pediam velocidade de entrega, mas decisões apressadas de banco podem criar dívida estrutural.",
          "A proposta foi definir um roteiro de decisão baseado em requisitos mensuráveis.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Postgres para transação forte e consultas relacionais.",
          "Mongo para flexibilidade de documento com evolução rápida.",
          "Dynamo para escala horizontal previsível por chave de acesso.",
          "Avaliar custo por padrão de leitura/escrita e retenção.",
        ],
        tips: ["Modele pelos acessos críticos primeiro, depois normalize/denormalize conforme necessidade."],
      },
    ],
    checklist: [
      "Mapear consultas críticas e volume esperado.",
      "Definir exigência de consistência por caso de uso.",
      "Estimar custo de índices, storage e throughput.",
      "Documentar anti-patterns específicos do domínio.",
    ],
    commonErrors: [
      "Escolher banco por familiaridade e não por requisito.",
      "Ignorar impacto de índices no custo total.",
      "Tentar usar um único banco para todos os cenários.",
    ],
    keywords: ["PostgreSQL", "MongoDB", "DynamoDB", "data modeling"],
  },
  {
    slug: "rag-crm-langchain-llamaindex",
    title: "RAG em produção para CRM: LangChain + LlamaIndex",
    description:
      "Arquitetura prática para RAG com foco em recuperação confiável, latência controlada e limites operacionais.",
    date: "2026-01-08",
    category: "AI",
    lead: "RAG em produção não é só gerar resposta boa, é manter qualidade consistente sob carga real.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "Times de atendimento precisavam acessar conhecimento distribuído sem depender de busca manual.",
          "O objetivo foi criar uma camada RAG com governança de contexto e monitoramento contínuo.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Pipeline de chunking e embeddings com versionamento.",
          "Fallback para resposta sem contexto quando retrieval falhar.",
          "Camada de avaliação com conjunto de perguntas críticas.",
          "Logs estruturados por etapa: retrieval, prompt e resposta.",
        ],
        tips: ["Não misture dados de baixa confiança no mesmo índice sem metadados de qualidade."],
      },
    ],
    checklist: [
      "Definir estratégia de chunk e overlap por tipo de documento.",
      "Registrar versão de embedding em cada item indexado.",
      "Instrumentar latência e taxa de resposta sem contexto.",
      "Criar rotina de reindexação controlada.",
    ],
    commonErrors: [
      "Assumir que prompt resolve retrieval ruim.",
      "Não validar dados duplicados ou desatualizados no índice.",
      "Ignorar fallback quando a confiança é baixa.",
    ],
    keywords: ["RAG", "LangChain", "LlamaIndex", "LLM", "production AI"],
  },
  {
    slug: "llm-rag-observability-metrics",
    title: "Observabilidade para LLM/RAG: o que medir e como instrumentar",
    description:
      "Métricas essenciais de latência, custo e qualidade para operações de IA com visibilidade ponta a ponta.",
    date: "2026-01-02",
    category: "AI",
    lead: "Sem observabilidade de IA, o time só descobre degradação quando o usuário reclama.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "Custos e latência variavam por rota e tipo de pergunta sem visibilidade por etapa.",
          "A solução foi definir telemetria mínima para gestão contínua de qualidade e eficiência.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Métricas por etapa: retrieval, geração e pós-processamento.",
          "Tracing distribuído com correlação de request.",
          "Controle de custo por token e por fluxo de negócio.",
          "Alertas para degradação de qualidade e timeout.",
        ],
        tips: ["Monitore qualidade com dataset fixo além de métricas de performance."],
      },
    ],
    checklist: [
      "Definir SLIs de latência e taxa de fallback.",
      "Adicionar tags de modelo, versão e tenant nas métricas.",
      "Consolidar custo diário por feature de produto.",
      "Criar painéis executivos e painéis de engenharia separados.",
    ],
    commonErrors: [
      "Medir apenas latência e ignorar qualidade.",
      "Falta de segmentação por modelo/tenant.",
      "Não correlacionar custo com valor entregue.",
    ],
    keywords: ["LLM observability", "OpenTelemetry", "Prometheus", "metrics"],
  },
  {
    slug: "mlflow-tracking-deploy-latency",
    title: "MLflow na prática: versionamento, tracking e deploy",
    description:
      "Fluxo pragmático com MLflow para registrar experimentos, promover modelos e reduzir risco em produção.",
    date: "2025-12-23",
    category: "AI",
    lead: "MLOps eficiente começa com rastreabilidade: experimento, modelo e decisão de deploy precisam estar conectados.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "Modelos eram publicados sem histórico robusto, dificultando comparação e rollback.",
          "A equipe precisou formalizar critérios de promoção para ganho real de estabilidade.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Tracking completo de parâmetros, métricas e artefatos.",
          "Model registry com estágios claros de promoção.",
          "Gate de deploy baseado em baseline e custo de inferência.",
          "Plano de rollback para regressão de qualidade.",
        ],
        tips: ["Sem baseline estável, a comparação entre experimentos perde valor operacional."],
      },
    ],
    checklist: [
      "Versionar dataset de treino e validação.",
      "Definir métrica primária e métrica de guardrail.",
      "Automatizar registro e promoção no pipeline.",
      "Testar rollback com tráfego real controlado.",
    ],
    commonErrors: [
      "Promover modelo sem validação comparativa.",
      "Ignorar custo de inferência no critério de aprovação.",
      "Não manter histórico de decisões de deploy.",
    ],
    keywords: ["MLflow", "MLOps", "model tracking", "inference optimization"],
  },
  {
    slug: "rag-evaluation-production-minimum-tests",
    title: "Avaliação de RAG sem romantizar: testes mínimos para produção",
    description:
      "Conjunto mínimo de testes e métricas para evitar regressões silenciosas em aplicações RAG.",
    date: "2025-12-12",
    category: "AI",
    lead: "RAG sem avaliação contínua vira loteria: funciona no demo e falha no mundo real.",
    sections: [
      {
        heading: "Problema real e contexto",
        paragraphs: [
          "Respostas aceitáveis em ambiente de teste não se sustentavam com dados vivos e perguntas reais.",
          "Foi criado um processo de avaliação simples, repetível e integrado ao ciclo de release.",
        ],
      },
      {
        heading: "Decisões técnicas",
        paragraphs: [],
        bullets: [
          "Golden set com perguntas críticas por domínio.",
          "Métricas de retrieval e qualidade de resposta.",
          "Testes de regressão antes de cada atualização de índice/modelo.",
          "Critérios claros para bloquear release.",
        ],
        tips: ["Comece com um conjunto pequeno de casos críticos e aumente cobertura por prioridade de negócio."],
      },
    ],
    checklist: [
      "Montar golden set revisado por especialistas do domínio.",
      "Definir limiar mínimo de qualidade aceitável.",
      "Executar regressão automatizada em mudanças de prompt/índice/modelo.",
      "Reportar tendência de qualidade ao longo do tempo.",
    ],
    commonErrors: [
      "Avaliar apenas por percepção subjetiva.",
      "Não separar erro de retrieval de erro de geração.",
      "Atualizar índice sem rerodar suíte de regressão.",
    ],
    keywords: ["RAG evaluation", "retrieval metrics", "hallucination", "test harness"],
  },
];
