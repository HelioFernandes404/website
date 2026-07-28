---
title: "SystemFrame"
description: "Plataforma de observabilidade multi-tenant para 12+ clientes e 390+ endpoints, com deploy GitOps e pipeline de alertas integrado a GLPI e ServiceNow."
tech:
  - "K3s / Helm"
  - "ArgoCD"
  - "Prometheus"
order: 2
category: "02. Data Ops"
metricLabel: "MTTR"
metricValue: "-60%"
metricCaption: "50MIN -> 20MIN"
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
imageAlt: "Projeto SystemFrame focado em infraestrutura DevOps com Kubernetes"
carl:
  context: "A plataforma monitora infraestrutura heterogenea de 12+ clientes: equipamentos Aruba e Meraki, mais Zabbix e GLPI ja instalados no parque de cada um. Nao havia telemetria consolidada -- cada cliente era uma ilha, e diagnosticar um incidente podia consumir um dia inteiro. Alerta chegava ao time, mas nao virava ticket sozinho."
  action: "Assumi a camada de plataforma com K3s, Helm, ArgoCD e Ansible, sustentando deploy continuo GitOps. Escrevi 5 exporters customizados para Aruba, Meraki, Zabbix e GLPI, consolidando 390+ endpoints em um formato unico. Sobre isso montei o pipeline de alertas ligando Alertmanager a GLPI e ServiceNow, operando 296 regras, e ferramentas de analise sobre as APIs de Prometheus e VictoriaMetrics distribuidas em 2 zonas de disponibilidade."
  result: "MTTR caiu de 50 para 20 minutos (-60%), e o tempo de diagnostico de incidente saiu de 1 dia para 2 horas. O deploy GitOps acumulou mais de 3.500 execucoes de CI/CD, com media de cerca de 8 deploys por dia util."
  learning: "Exporter customizado e divida de manutencao: cada um vira codigo proprio que acompanha mudanca de firmware e de API do fornecedor. Valeu porque telemetria em formato unico foi o que tornou as 296 regras possiveis -- sem isso cada cliente teria seu proprio conjunto de alertas. E alerta que nao vira ticket automaticamente nao reduz MTTR: o ganho veio da integracao com GLPI e ServiceNow, nao de detectar mais rapido."
architecture:
  title: "Arquitetura"
  hint: "Clique em um componente para ver a decisao tomada ali e o que ela custou."
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
      decision: "Escrever exporters proprios para cada fonte, em vez de adotar um agente unico de mercado ou aceitar os formatos nativos."
      tradeoff: "Cada exporter e codigo que precisa acompanhar mudanca de firmware e de API do fornecedor. Foi o que permitiu telemetria em formato unico entre parques heterogeneos -- e sem isso as 296 regras nao existiriam."
    - id: "tsdb"
      label: "Prometheus / VictoriaMetrics"
      kind: "data"
      subtitle: "2 AZs"
      x: 580
      y: 60
      decision: "Manter VictoriaMetrics ao lado do Prometheus e distribuir em 2 zonas de disponibilidade."
      tradeoff: "Dois sistemas de metrica para operar e entender em vez de um. Compra retencao mais longa e sobrevivencia a queda de uma zona."
    - id: "alertmanager"
      label: "Alertmanager"
      kind: "service"
      subtitle: "296 regras"
      x: 880
      y: -40
      decision: "Concentrar as 296 regras no Alertmanager e tratar deduplicacao ali, antes de qualquer integracao externa."
      tradeoff: "As regras viram um artefato grande e centralizado, que exige disciplina para nao virar bolo. Evita que cada integracao reimplemente sua propria logica de silenciamento."
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
      label: "Ferramentas de analise"
      kind: "service"
      subtitle: "diagnostico 1 dia -> 2h"
      x: 880
      y: 180
      decision: "Construir ferramentas de consulta sobre as APIs de Prometheus e VictoriaMetrics em vez de depender so de dashboard visual."
      tradeoff: "Mais codigo interno para manter, fora do caminho do produto. Encurtou o diagnostico de incidente de um dia para duas horas, porque investigar deixou de depender de montar painel na hora."
    - id: "argocd"
      label: "ArgoCD"
      kind: "service"
      subtitle: "GitOps"
      x: 280
      y: 320
      decision: "Deploy por GitOps com ArgoCD e Helm, com o estado desejado versionado em vez de aplicado a mao."
      tradeoff: "Toda mudanca passa a exigir commit e sincronizacao, o que e mais lento para um hotfix pontual. Em troca, onboarding de cliente novo virou values de Helm, e o estado do cluster deixou de depender de quem aplicou o que."
    - id: "k3s"
      label: "K3s + Helm"
      kind: "service"
      subtitle: "12+ clientes"
      x: 580
      y: 320
      decision: "K3s em vez de Kubernetes completo para sustentar o parque multi-tenant."
      tradeoff: "Menos componentes de fabrica, entao parte do que um cluster gerenciado entrega pronto precisou ser montada. Compensou pelo consumo de recurso menor por cliente e operacao mais simples de manter."
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

Plataforma de observabilidade multi-tenant operada desde dezembro de 2024, consolidando telemetria de infraestrutura heterogenea em 12+ clientes.
