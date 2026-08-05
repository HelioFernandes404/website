---
title: "SystemFrame"
description: "Plataforma de observabilidade multi-tenant para 12+ clientes e 390+ endpoints, com deploy GitOps e pipeline de alertas integrado a GLPI e ServiceNow."
tech:
  - "K3s / Helm"
  - "ArgoCD"
  - "Prometheus"
order: 2
category: "02. Operações de dados"
metricLabel: "MTTR"
metricValue: "-60%"
metricCaption: "50MIN -> 20MIN"
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=70&w=640&auto=format&fit=crop&fm=webp"
imageAlt: "Projeto SystemFrame focado em infraestrutura DevOps com Kubernetes"
carl:
  context: "A plataforma monitora infraestrutura heterogênea de 12+ clientes: equipamentos Aruba e Meraki, mais Zabbix e GLPI já instalados no parque de cada um. Não havia telemetria consolidada -- cada cliente era uma ilha, e diagnosticar um incidente podia consumir um dia inteiro. Alerta chegava ao time, mas não virava ticket sozinho."
  action: "Assumi a camada de plataforma com K3s, Helm, ArgoCD e Ansible, sustentando deploy contínuo GitOps. Escrevi 5 exporters customizados para Aruba, Meraki, Zabbix e GLPI, consolidando 390+ endpoints em um formato único. Sobre isso montei o pipeline de alertas ligando Alertmanager a GLPI e ServiceNow, operando 296 regras, e ferramentas de análise sobre as APIs de Prometheus e VictoriaMetrics distribuídas em 2 zonas de disponibilidade."
  result: "MTTR caiu de 50 para 20 minutos (-60%), e o tempo de diagnóstico de incidente saiu de 1 dia para 2 horas. O deploy GitOps acumulou mais de 3.500 execuções de CI/CD, com média de cerca de 8 deploys por dia útil."
  learning: "Exporter customizado é dívida de manutenção: cada um vira código próprio que acompanha mudança de firmware e de API do fornecedor. Valeu porque telemetria em formato único foi o que tornou as 296 regras possíveis -- sem isso cada cliente teria seu próprio conjunto de alertas. E alerta que não vira ticket automaticamente não reduz MTTR: o ganho veio da integração com GLPI e ServiceNow, não de detectar mais rápido."
architecture:
  title: "Arquitetura"
  hint: "Clique em um componente para ver a decisão tomada ali e o que ela custou."
  nodes:
    - id: "parque"
      label: "Parque dos clientes"
      kind: "entry"
      subtitle: "Aruba, Meraki, Zabbix, GLPI"
      x: 0
      y: 60
    - id: "exporters"
      label: "5 exporters customizados"
      kind: "service"
      subtitle: "390+ endpoints"
      x: 280
      y: 60
      decision: "Escrever exporters próprios para cada fonte, em vez de adotar um agente único de mercado ou aceitar os formatos nativos."
      tradeoff: "Cada exporter é código que precisa acompanhar mudança de firmware e de API do fornecedor. Foi o que permitiu telemetria em formato único entre parques heterogêneos -- e sem isso as 296 regras não existiriam."
    - id: "tsdb"
      label: "Prometheus / VictoriaMetrics"
      kind: "data"
      subtitle: "2 AZs"
      x: 580
      y: 60
      decision: "Manter VictoriaMetrics ao lado do Prometheus e distribuir em 2 zonas de disponibilidade."
      tradeoff: "Dois sistemas de métrica para operar e entender em vez de um. Compra retenção mais longa e sobrevivência à queda de uma zona."
    - id: "alertmanager"
      label: "Alertmanager"
      kind: "service"
      subtitle: "296 regras"
      x: 880
      y: -40
      decision: "Concentrar as 296 regras no Alertmanager e tratar deduplicação ali, antes de qualquer integração externa."
      tradeoff: "As regras viram um artefato grande e centralizado, que exige disciplina para não virar bolo. Evita que cada integração reimplemente sua própria lógica de silenciamento."
    - id: "glpi"
      label: "GLPI"
      kind: "external"
      x: 1180
      y: -110
    - id: "servicenow"
      label: "ServiceNow"
      kind: "external"
      x: 1180
      y: 20
    - id: "analise"
      label: "Ferramentas de análise"
      kind: "service"
      subtitle: "diagnóstico 1 dia -> 2h"
      x: 880
      y: 180
      decision: "Construir ferramentas de consulta sobre as APIs de Prometheus e VictoriaMetrics em vez de depender só de dashboard visual."
      tradeoff: "Mais código interno para manter, fora do caminho do produto. Encurtou o diagnóstico de incidente de um dia para duas horas, porque investigar deixou de depender de montar painel na hora."
    - id: "argocd"
      label: "ArgoCD"
      kind: "service"
      subtitle: "GitOps"
      x: 280
      y: 320
      decision: "Deploy por GitOps com ArgoCD e Helm, com o estado desejado versionado em vez de aplicado à mão."
      tradeoff: "Toda mudança passa a exigir commit e sincronização, o que é mais lento para um hotfix pontual. Em troca, onboarding de cliente novo virou values de Helm, e o estado do cluster deixou de depender de quem aplicou o que."
    - id: "k3s"
      label: "K3s + Helm"
      kind: "service"
      subtitle: "12+ clientes"
      x: 580
      y: 320
      decision: "K3s em vez de Kubernetes completo para sustentar o parque multi-tenant."
      tradeoff: "Menos componentes de fábrica, então parte do que um cluster gerenciado entrega pronto precisou ser montada. Compensou pelo consumo de recurso menor por cliente e operação mais simples de manter."
  edges:
    - from: "parque"
      to: "exporters"
      label: "scrape"
    - from: "exporters"
      to: "tsdb"
    - from: "tsdb"
      to: "alertmanager"
    - from: "alertmanager"
      to: "glpi"
      label: "ticket"
      async: true
    - from: "alertmanager"
      to: "servicenow"
      label: "ticket"
      async: true
    - from: "tsdb"
      to: "analise"
    - from: "argocd"
      to: "k3s"
      label: "sync"
    - from: "k3s"
      to: "exporters"
      label: "hospeda"
---

Plataforma de observabilidade multi-tenant operada desde dezembro de 2024, consolidando telemetria de infraestrutura heterogênea em 12+ clientes.
