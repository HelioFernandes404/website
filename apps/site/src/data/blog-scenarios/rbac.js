import { validateScenario } from "./validate.js";

const centralized = {
  id: "rbac-centralized",
  nodes: [
    { id: "apps", x: 0, y: 120, kind: "application" },
    { id: "core", x: 260, y: 120, kind: "control" },
    { id: "openfga", x: 520, y: 120, kind: "data" },
    { id: "decision", x: 770, y: 120, kind: "outcome" },
  ],
  edges: [
    { id: "apps-core", source: "apps", target: "core" },
    { id: "core-openfga", source: "core", target: "openfga" },
    { id: "openfga-decision", source: "openfga", target: "decision" },
  ],
  steps: [
    { id: "request", activeNodes: ["apps", "core"], activeEdges: ["apps-core"] },
    { id: "decision", activeNodes: ["core", "openfga", "decision"], activeEdges: ["core-openfga", "openfga-decision"] },
    { id: "risk", activeNodes: ["core"], activeEdges: [] },
  ],
  copy: {
    pt: {
      title: "O caminho centralizado", summary: "Toda decisão passa pelo RBAC Core.", explore: "Explorar arquitetura",
      nodes: { apps: { label: "Aplicações", detail: "App A, B e C", decision: "Consultar um ponto comum antes de cada ação.", tradeoff: "Interface uniforme em troca de dependência operacional." }, core: { label: "RBAC Core", detail: "caminho crítico", decision: "Centralizar a coordenação das decisões.", tradeoff: "Governança simples, porém maior acoplamento e risco de indisponibilidade." }, openfga: { label: "OpenFGA", detail: "relações e checagem", decision: "Resolver relações no mecanismo especializado.", tradeoff: "Modelo expressivo exige operação e versionamento disciplinados." }, decision: { label: "Decisão", detail: "permitir ou negar", decision: "Devolver uma resposta síncrona à aplicação.", tradeoff: "Consistência imediata depende de todo o caminho responder." } },
      steps: [
        { title: "Todas as apps consultam um ponto", body: "Cada requisição chega ao RBAC Core antes da ação ser permitida." },
        { title: "Core coordena cada decisão", body: "O Core consulta o OpenFGA e devolve permitir ou negar para a aplicação." },
        { title: "Concentração cria dependência", body: "Indisponibilidade e regras de negócio de todos sistemas acumulam no mesmo serviço." },
      ],
    },
    en: {
      title: "The centralized path", summary: "Every decision passes through RBAC Core.", explore: "Explore architecture",
      nodes: { apps: { label: "Applications", detail: "App A, B, and C", decision: "Query one common point before every action.", tradeoff: "A uniform interface adds an operational dependency." }, core: { label: "RBAC Core", detail: "critical path", decision: "Centralize decision coordination.", tradeoff: "Simple governance increases coupling and availability risk." }, openfga: { label: "OpenFGA", detail: "relations and checks", decision: "Resolve relations in the specialized engine.", tradeoff: "An expressive model requires disciplined operations and versioning." }, decision: { label: "Decision", detail: "allow or deny", decision: "Return a synchronous answer to the application.", tradeoff: "Immediate consistency depends on the entire path responding." } },
      steps: [
        { title: "Every app calls one point", body: "Each request reaches RBAC Core before an action is allowed." },
        { title: "Core coordinates every decision", body: "Core queries OpenFGA and returns allow or deny to the application." },
        { title: "Concentration creates dependency", body: "Availability and business rules from every system accumulate in one service." },
      ],
    },
  },
};

const federated = {
  id: "rbac-federated",
  nodes: [
    { id: "apps", x: 0, y: 140, kind: "application" },
    { id: "sdk", x: 250, y: 140, kind: "application" },
    { id: "openfga", x: 510, y: 140, kind: "data" },
    { id: "governance", x: 510, y: 330, kind: "control" },
  ],
  edges: [
    { id: "apps-sdk", source: "apps", target: "sdk" },
    { id: "sdk-openfga", source: "sdk", target: "openfga" },
    { id: "governance-openfga", source: "governance", target: "openfga" },
  ],
  steps: [
    { id: "ownership", activeNodes: ["apps", "sdk"], activeEdges: ["apps-sdk"] },
    { id: "checks", activeNodes: ["sdk", "openfga"], activeEdges: ["sdk-openfga"] },
    { id: "governance", activeNodes: ["governance", "openfga"], activeEdges: ["governance-openfga"] },
  ],
  copy: {
    pt: {
      title: "O caminho federado", summary: "Responsabilidade local; governança fora da requisição.", explore: "Explorar arquitetura",
      nodes: { apps: { label: "Aplicações", detail: "donas das regras", decision: "Manter políticas próximas do domínio protegido.", tradeoff: "Mais autonomia exige padrões e revisão distribuídos." }, sdk: { label: "SDK de autorização", detail: "integração local", decision: "Padronizar a integração sem intermediar a requisição.", tradeoff: "Menos acoplamento operacional, mais responsabilidade nas aplicações." }, openfga: { label: "OpenFGA", detail: "checagem direta", decision: "Receber consultas diretamente dos sistemas.", tradeoff: "Remove um salto, mas exige resiliência e cache bem definidos." }, governance: { label: "Governança central", detail: "auditoria e modelos", decision: "Centralizar auditoria fora do caminho crítico.", tradeoff: "Visibilidade global deixa de controlar cada decisão em runtime." } },
      steps: [
        { title: "Cada app possui seu modelo", body: "Relações e políticas vivem perto do domínio que elas protegem." },
        { title: "SDK fala direto com OpenFGA", body: "O caminho crítico elimina o Core intermediário e suporta cache curto de decisões." },
        { title: "Centralizar governança, não runtime", body: "Modelos versionados, auditoria e visualização seguem centrais, fora da requisição." },
      ],
    },
    en: {
      title: "The federated path", summary: "Local ownership; governance outside requests.", explore: "Explore architecture",
      nodes: { apps: { label: "Applications", detail: "own their rules", decision: "Keep policies close to the protected domain.", tradeoff: "More autonomy requires distributed standards and review." }, sdk: { label: "Authorization SDK", detail: "local integration", decision: "Standardize integration without mediating requests.", tradeoff: "Less operational coupling adds responsibility to applications." }, openfga: { label: "OpenFGA", detail: "direct check", decision: "Receive checks directly from systems.", tradeoff: "One less hop requires well-defined resilience and caching." }, governance: { label: "Central governance", detail: "audit and models", decision: "Centralize audit outside the critical path.", tradeoff: "Global visibility no longer controls every runtime decision." } },
      steps: [
        { title: "Each app owns its model", body: "Relations and policies live near the domain they protect." },
        { title: "SDK talks directly to OpenFGA", body: "The critical path removes the intermediary Core and supports short decision caching." },
        { title: "Centralize governance, not runtime", body: "Versioned models, audit, and visualization remain central but outside requests." },
      ],
    },
  },
};

export const rbacCentralizedScenario = validateScenario(centralized);
export const rbacFederatedScenario = validateScenario(federated);
