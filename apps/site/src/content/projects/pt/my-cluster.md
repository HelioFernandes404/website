---
title: "Plataforma GitOps self-hosted (Flux CD + Kubernetes) · 3 apps em produção"
description: "Uma plataforma Kubernetes de nó único conduzida pelo Flux CD a partir de um repositório. 4 repositórios de deploy viraram 1, os deploys não têm downtime e 3 apps rodam nela."
tech:
  - "Flux CD"
  - "Kubernetes (KubeSolo)"
  - "VictoriaMetrics"
order: 1
category: "04. Plataforma"
metricLabel: "REPOS DE DEPLOY"
metricValue: "4 → 1"
metricCaption: "4 REPOS -> 1 REPO"
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=70&w=640&auto=format&fit=crop&fm=webp"
imageAlt: "Infraestrutura de servidores de uma plataforma Kubernetes self-hosted"
statusEndpoint: "https://status.heliosuns404.com/v1"
carl:
  context: "Minha plataforma rodava primeiro com um agente de deploy pull-based que escrevi em Go (giohel-cd) e Docker Compose. O estado estava espalhado por vários repositórios: deployments, o agente, ingress e observabilidade. Toda mudança exigia pular entre eles, e os deploys com Compose geravam downtime. O objetivo era organizar a plataforma para escalar, reduzir essa troca de contexto e fazer deploy sem downtime."
  action: "Migrei a plataforma para o Flux CD sobre o KubeSolo, uma distribuição Kubernetes de nó único, com um repositório (fleet) como fonte da verdade. Os segredos vêm do Doppler Kubernetes Operator, o Postgres 18 é um StatefulSet compartilhado, os backups são CronJobs com teste de restore automatizado, e o tráfego entra por um Cloudflare Tunnel com o Traefik atrás. A observabilidade usa VictoriaMetrics, VictoriaLogs e VictoriaTraces com OpenTelemetry Collector, vmalert e Alertmanager. O Renovate atualiza as tags de imagem, e um cluster dev ensaiou a migração antes da produção."
  result: "Um repositório passou a ser a fonte da verdade, no lugar de 4 repositórios de deploy. Os deploys não têm downtime e 3 apps rodam no mesmo cluster. Os requests de memória somam 1,6 GB num VPS de 3,8 GB. A disponibilidade tem meta de 99,5% em 30 dias com alertas de burn rate em múltiplas janelas, e é uma meta: ainda não há histórico para dizer que foi cumprida."
  learning: "Nó único é uma troca consciente: sem alta disponibilidade, em troca de uma plataforma pequena o bastante para entender e caber na memória. A restrição que moldou a maioria das decisões foi memória, não funcionalidade, então um orçamento de memória escrito, com requests e limits para cada componente, valeu mais que qualquer ferramenta isolada. Ensaiar a migração num cluster dev fez a janela de produção não ser a primeira execução."
architecture:
  title: "Arquitetura"
  hint: "Clique em um componente para ver a decisão tomada ali e o que ela custou."
  nodes:
    - id: "renovate"
      label: "Renovate"
      kind: "external"
      subtitle: "tags de imagem"
      x: 0
      y: 0
      decision: "O Renovate abre pull requests que atualizam as tags de imagem no repositório fleet. O automerge vale só para as minhas imagens, e os charts ficam manuais."
      tradeoff: "Até cerca de 1 hora entre a release da imagem e o deploy, e upgrade de chart exige uma pessoa."
    - id: "fleet"
      label: "fleet repo"
      kind: "entry"
      subtitle: "fonte da verdade"
      x: 0
      y: 150
      decision: "Um repositório guarda o estado desejado do cluster inteiro e substitui 4 repositórios de deploy. O CI dos apps abre pull requests aqui, então os repositórios dos apps não guardam credenciais do cluster."
      tradeoff: "Toda mudança passa por revisão em um só lugar. O preço é que o repositório é a única porta: se ele estiver errado, o cluster converge para o errado."
    - id: "flux"
      label: "Flux CD"
      kind: "service"
      subtitle: "instalação mínima"
      x: 260
      y: 150
      decision: "Flux só com os controllers de source, kustomize, helm e notification. As camadas aplicam em cadeia de dependências com prune e wait, então o deploy só avança quando a camada anterior está saudável."
      tradeoff: "O Flux reserva cerca de 150 MiB de memória num VPS pequeno. Em troca, os deploys são reproduzíveis e graduais, sem downtime, o que o Compose não entregava."
    - id: "kubesolo"
      label: "KubeSolo"
      kind: "service"
      subtitle: "nó único"
      x: 520
      y: 150
      decision: "Rodar Kubernetes no KubeSolo, uma distribuição de binário único, num VPS de 3,8 GB onde antes rodava Docker Compose. Custa cerca de 200 MB de overhead."
      tradeoff: "Um nó significa sem alta disponibilidade e sem drain de nó, o que aceitei. A memória é a restrição real, então toda carga tem requests e limits."
    - id: "tunnel"
      label: "Cloudflare Tunnel + Traefik"
      kind: "entry"
      subtitle: "só conexão de saída"
      x: 260
      y: 330
      decision: "O Cloudflare Tunnel conecta de dentro para fora até o Traefik, que fica atrás dele. O TLS termina na Cloudflare e as portas web do servidor ficam fechadas. O Traefik continua para rate limit, circuit breaker e redirects canônicos."
      tradeoff: "A Cloudflare fica no caminho de toda requisição, e o tráfego é HTTP puro dentro do nó."
    - id: "apps"
      label: "3 apps"
      kind: "service"
      subtitle: "scout, estudiomadame, english-notes"
      x: 800
      y: 60
      decision: "Três apps dividem um cluster: Estúdio Madame (galeria de seleção de fotos de um cliente real), Scout (API em Go com MCP) e english-notes. Cada um tem seu namespace."
      tradeoff: "Eles disputam a mesma máquina pequena. Os requests somam 1,6 GB dos 3,8 GB, com limits propositalmente acima disso, então a pressão de memória é monitorada em vez de ignorada."
    - id: "doppler"
      label: "Doppler Operator"
      kind: "external"
      subtitle: "segredos"
      x: 520
      y: 330
      decision: "O Doppler Kubernetes Operator sincroniza os segredos para o cluster e os apps leem como variáveis de ambiente. Se o Doppler cair, os pods seguem com o último segredo sincronizado."
      tradeoff: "O operator é um ponto único para a atualização dos segredos, e precisou de um contorno para entregar o secret de pull do registry."
    - id: "postgres"
      label: "Postgres 18"
      kind: "data"
      subtitle: "StatefulSet compartilhado"
      x: 800
      y: 260
      decision: "Um StatefulSet de Postgres 18 compartilhado, com um banco e um role por app, em vez de uma instância por app. Cada role tem limite de conexões e statement timeout."
      tradeoff: "Destino compartilhado e upgrades acoplados. Três instâncias não caberiam na memória deste VPS."
    - id: "backups"
      label: "Backup CronJobs"
      kind: "service"
      subtitle: "restore testado"
      x: 1080
      y: 260
      decision: "Os backups são CronJobs: dumps de hora em hora mantidos por 48 horas, dumps diários mantidos por 14 dias e um teste de restore automatizado toda semana num Postgres descartável."
      tradeoff: "Os backups ficam no mesmo disco do banco e ainda não há cópia fora do servidor. Aceitei esse risco por enquanto."
    - id: "obs"
      label: "Victoria stack + OTel"
      kind: "service"
      subtitle: "métricas, logs, traces"
      x: 1080
      y: 60
      decision: "VictoriaMetrics, VictoriaLogs e VictoriaTraces, alimentadas por um OpenTelemetry Collector, com vmalert e Alertmanager. Os alertas são de burn rate em múltiplas janelas contra uma meta de 99,5% de disponibilidade em 30 dias. Alertas críticos vão para o chat e avisos para o e-mail."
      tradeoff: "A stack inteira tem custo real de memória num nó pequeno, então todo componente tem requests e limits, e os traces são a primeira coisa a cortar sob pressão."
  edges:
    - from: "renovate"
      to: "fleet"
      label: "PR de tag"
    - from: "fleet"
      to: "flux"
      label: "reconcilia"
    - from: "flux"
      to: "kubesolo"
      label: "aplica"
    - from: "kubesolo"
      to: "apps"
    - from: "tunnel"
      to: "apps"
      label: "requisições"
    - from: "doppler"
      to: "apps"
      label: "segredos"
      async: true
    - from: "apps"
      to: "postgres"
    - from: "postgres"
      to: "backups"
      label: "dump"
      async: true
    - from: "apps"
      to: "obs"
      label: "métricas / logs"
      async: true
---

Uma plataforma GitOps self-hosted que roda 3 apps num cluster Kubernetes de nó único, com o Flux CD reconciliando tudo a partir de um repositório. O status ao vivo abaixo vem do próprio cluster.
