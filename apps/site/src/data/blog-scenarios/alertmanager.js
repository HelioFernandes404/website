import { validateScenario } from "./validate.js";

const nodes = [
  { id: "prometheus", x: 0, y: 140, kind: "source" },
  { id: "am-virginia", x: 300, y: 40, kind: "control" },
  { id: "am-ohio", x: 300, y: 240, kind: "control" },
  { id: "slack", x: 620, y: 140, kind: "sink" },
];

const baseEdges = [
  { id: "prom-va", source: "prometheus", target: "am-virginia", label: "scrape" },
  { id: "prom-oh", source: "prometheus", target: "am-ohio", label: "scrape" },
  { id: "gossip", source: "am-virginia", target: "am-ohio" },
  { id: "va-slack", source: "am-virginia", target: "slack", label: "notify" },
  { id: "oh-slack", source: "am-ohio", target: "slack", label: "notify" },
];

const nodeCopy = {
  pt: {
    prometheus: { label: "Prometheus", detail: "global, scrape único" },
    "am-virginia": { label: "Alertmanager", detail: "us-east-1 (Virginia)" },
    "am-ohio": { label: "Alertmanager", detail: "us-east-2 (Ohio)" },
    slack: { label: "Slack", detail: "receptor único" },
  },
  en: {
    prometheus: { label: "Prometheus", detail: "global, single scrape" },
    "am-virginia": { label: "Alertmanager", detail: "us-east-1 (Virginia)" },
    "am-ohio": { label: "Alertmanager", detail: "us-east-2 (Ohio)" },
    slack: { label: "Slack", detail: "single receiver" },
  },
};

function withEdgeState(overrides) {
  return baseEdges.map((edge) => ({ ...edge, ...(overrides[edge.id] ?? {}) }));
}

const healthy = {
  id: "am-healthy",
  nodes,
  edges: withEdgeState({
    gossip: { label: "push/pull 60s", tone: "ok", animated: true },
    "va-slack": { tone: "ok", active: true },
    "oh-slack": { tone: "muted", active: false },
  }),
  steps: [{ id: "topology" }, { id: "gossip" }, { id: "outcome" }],
  copy: {
    pt: {
      title: "Cluster saudável", summary: "Os dois peers reconciliam estado dentro da janela de deduplicação.",
      nodes: nodeCopy.pt,
      steps: [
        { title: "Dois Alertmanagers, um Prometheus", body: "Um único Prometheus faz scrape e envia alertas para os dois Alertmanagers, um em cada região (Virginia e Ohio)." },
        { title: "Gossip reconcilia a tempo", body: "Com push/pull a cada 60s e sem perda de broadcast, os dois peers convergem para o mesmo estado antes da janela de dedup fechar." },
        { title: "Slack recebe uma notificação", body: "O Alertmanager de Virginia assume a notificação; Ohio reconhece o mesmo alerta via gossip e suprime o próprio envio." },
      ],
    },
    en: {
      title: "Healthy cluster", summary: "Both peers reconcile state inside the deduplication window.",
      nodes: nodeCopy.en,
      steps: [
        { title: "Two Alertmanagers, one Prometheus", body: "A single Prometheus scrapes and sends alerts to both Alertmanagers, one per region (Virginia and Ohio)." },
        { title: "Gossip reconciles in time", body: "With push/pull every 60s and no lost broadcast, both peers converge on the same state before the dedup window closes." },
        { title: "Slack gets one notification", body: "Virginia's Alertmanager owns the notification; Ohio recognizes the same alert via gossip and suppresses its own send." },
      ],
    },
  },
};

const degraded = {
  id: "am-degraded",
  nodes,
  edges: withEdgeState({
    gossip: { label: "broadcast perdido", tone: "danger", animated: false },
    "va-slack": { tone: "danger", active: true },
    "oh-slack": { tone: "danger", active: true },
  }),
  steps: [{ id: "topology" }, { id: "gossip" }, { id: "outcome" }],
  copy: {
    pt: {
      title: "Peer degradado", summary: "Um broadcast Gossip incremental se perde e o estado não reconcilia a tempo.",
      nodes: nodeCopy.pt,
      steps: [
        { title: "Mesma topologia, peer degradado", body: "Nada mudou na topologia. O que muda é a confiabilidade da rede entre as duas regiões." },
        { title: "push/pull 60s, peer timeout 15s", body: "Quando um broadcast Gossip incremental se perde, o peer timeout de 15s expira antes do próximo ciclo de push/pull completo (60s) reconciliar o estado." },
        { title: "Slack recebe dois avisos", body: "Cada Alertmanager decide reenviar a notificação de resolved sem conhecer o estado atualizado do outro peer — duplicação, cerca de 400 alertas por dia." },
      ],
    },
    en: {
      title: "Degraded peer", summary: "An incremental Gossip broadcast is lost and state doesn't reconcile in time.",
      nodes: nodeCopy.en,
      steps: [
        { title: "Same topology, degraded peer", body: "The topology hasn't changed. What changes is network reliability between the two regions." },
        { title: "60s push/pull, 15s peer timeout", body: "When an incremental Gossip broadcast is lost, the 15s peer timeout expires before the next full push/pull cycle (60s) can reconcile state." },
        { title: "Slack gets two notices", body: "Each Alertmanager decides to resend the resolved notification without knowing the other peer's updated state — duplication, around 400 alerts a day." },
      ],
    },
  },
};

const fixed = {
  id: "am-fixed",
  nodes,
  edges: withEdgeState({
    gossip: { label: "push/pull 10s", tone: "ok", animated: true },
    "va-slack": { tone: "ok", active: true },
    "oh-slack": { tone: "muted", active: false },
  }),
  steps: [{ id: "topology" }, { id: "gossip" }, { id: "outcome" }],
  copy: {
    pt: {
      title: "Pós-fix", summary: "push/pull cai para 10s; peer timeout permanece em 15s.",
      nodes: nodeCopy.pt,
      steps: [
        { title: "Mesma topologia, novo intervalo", body: "Nenhum nó, região ou receptor mudou. Só o intervalo de sincronização de estado do cluster." },
        { title: "10s de push/pull, 15s de peer timeout", body: "Com push/pull mais frequente que o peer timeout, mesmo um broadcast incremental perdido é coberto pelo próximo ciclo completo antes da janela de dedup fechar." },
        { title: "Slack volta a receber uma notificação", body: "Duplicados caem de ~400/dia para 150–200/dia. O que resta não é mais dedup: é ruído legítimo de variação de rede dos clientes." },
      ],
    },
    en: {
      title: "Post-fix", summary: "push/pull drops to 10s; peer timeout stays at 15s.",
      nodes: nodeCopy.en,
      steps: [
        { title: "Same topology, new interval", body: "No node, region, or receiver changed. Only the cluster's state-sync interval." },
        { title: "10s push/pull, 15s peer timeout", body: "With push/pull more frequent than the peer timeout, even a lost incremental broadcast gets covered by the next full cycle before the dedup window closes." },
        { title: "Slack goes back to one notification", body: "Duplicates drop from ~400/day to 150–200/day. What's left isn't dedup anymore: it's legitimate noise from client-side network variation." },
      ],
    },
  },
};

export const amHealthyScenario = validateScenario(healthy);
export const amDegradedScenario = validateScenario(degraded);
export const amFixedScenario = validateScenario(fixed);
