import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { canExplore, normalizeStepIndex, selectActiveStep } from "../../utils/scrolly-flow.js";
import { validateScenario } from "../../data/blog-scenarios/validate.js";

type Locale = "pt" | "en";

type ScenarioNode = { id: string; x: number; y: number; kind: string };
type ScenarioEdge = { id: string; source: string; target: string; label?: string };
type ScenarioStep = { id: string; activeNodes: string[]; activeEdges: string[] };
type Copy = {
  title: string;
  summary: string;
  explore: string;
  nodes: Record<string, { label: string; detail?: string; decision?: string; tradeoff?: string }>;
  steps: Array<{ title: string; body: string }>;
};
type Scenario = {
  id: string;
  nodes: ScenarioNode[];
  edges: ScenarioEdge[];
  steps: ScenarioStep[];
  copy: Record<Locale, Copy>;
};

interface Props { scenario: Scenario; locale: Locale }

type FlowData = {
  label: string;
  detail?: string;
  active: boolean;
  dimmed: boolean;
  selected: boolean;
  interactive: boolean;
  onSelect: (id: string) => void;
} & Record<string, unknown>;

type FlowNode = Node<FlowData, "scrolly">;

function ScenarioNode({ data, id }: NodeProps<FlowNode>) {
  const tone = data.active || data.selected ? "var(--color-brand-lime, #ccff00)" : "var(--scrolly-muted, #9ca3af)";
  return (
    <div
      role={data.interactive ? "button" : undefined}
      tabIndex={data.interactive ? 0 : undefined}
      aria-pressed={data.interactive ? data.selected : undefined}
      onClick={data.interactive ? () => data.onSelect(id) : undefined}
      onKeyDown={data.interactive ? (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); data.onSelect(id); }
      } : undefined}
      style={{
        width: 176, border: `1px solid ${tone}`, borderRadius: 12, padding: "12px 14px",
        background: "var(--scrolly-node, #0a0a0a)", color: "var(--scrolly-node-text, #fff)",
        cursor: data.interactive ? "pointer" : "default", opacity: data.dimmed ? 0.28 : 1,
        boxShadow: data.selected ? "0 0 0 3px color-mix(in srgb, var(--color-brand-lime, #ccff00) 25%, transparent)" : "none",
        transition: "opacity 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: tone }} />
      <strong style={{ display: "block", fontSize: 14 }}>{data.label}</strong>
      {data.detail && <span style={{ display: "block", marginTop: 4, color: "var(--scrolly-muted, #9ca3af)", fontSize: 12 }}>{data.detail}</span>}
      <Handle type="source" position={Position.Right} style={{ background: tone }} />
    </div>
  );
}

const nodeTypes = { scrolly: ScenarioNode };

export default function ScrollyFlow({ scenario: inputScenario, locale }: Props) {
  const scenario = useMemo(() => validateScenario(inputScenario) as Scenario, [inputScenario]);
  const copy = scenario.copy[locale];
  const [activeStep, setActiveStep] = useState(0);
  const [exploring, setExploring] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const focusedBeforeExplore = useRef<HTMLElement | null>(null);
  const closeExplore = useCallback(() => {
    setExploring(false);
    setSelectedNode(null);
    window.setTimeout(() => focusedBeforeExplore.current?.focus(), 0);
  }, []);

  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setActiveStep((current) => normalizeStepIndex(selectActiveStep(entries, current), scenario.steps.length));
    }, { threshold: [0.25, 0.55, 0.8], rootMargin: "-18% 0px -42% 0px" });
    stepRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, [scenario.steps.length]);
  useEffect(() => {
    if (!exploring) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeExplore();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [exploring, closeExplore]);
  useEffect(() => {
    if (!exploring) return;
    closeButton.current?.focus();
    if (!isMobile) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [exploring, isMobile]);

  const selectNode = useCallback((id: string) => {
    setSelectedNode((current) => current === id ? null : id);
  }, []);

  const active = scenario.steps[activeStep] ?? scenario.steps[0];
  const focusIds = selectedNode ? new Set([selectedNode, ...scenario.edges.flatMap((edge) =>
    edge.source === selectedNode ? [edge.target] : edge.target === selectedNode ? [edge.source] : [],
  )]) : null;
  const nodes = useMemo<FlowNode[]>(() => scenario.nodes.map((node) => ({
    id: node.id, type: "scrolly", position: { x: node.x, y: node.y },
    data: {
      ...copy.nodes[node.id], active: active.activeNodes.includes(node.id),
      dimmed: Boolean(focusIds) && !focusIds?.has(node.id), selected: node.id === selectedNode,
      interactive: exploring, onSelect: selectNode,
    },
  })), [scenario.nodes, copy.nodes, active, focusIds, selectedNode, exploring, selectNode]);
  const edges = useMemo<Edge[]>(() => scenario.edges.map((edge) => {
    const isActive = active.activeEdges.includes(edge.id);
    const dimmed = Boolean(focusIds) && !focusIds?.has(edge.source) && !focusIds?.has(edge.target);
    return { id: edge.id, source: edge.source, target: edge.target, label: edge.label, animated: isActive,
      style: { stroke: isActive ? "var(--color-brand-lime, #ccff00)" : "var(--color-gray-400, #9ca3af)", strokeWidth: isActive ? 2.5 : 1.5, opacity: dimmed ? 0.2 : 0.55, transition: "opacity 180ms ease, stroke 180ms ease" },
      labelStyle: { fill: "var(--color-brand-black, #111)", fontSize: 11 }, labelBgStyle: { fill: "var(--color-white, #fff)", fillOpacity: 0.9 },
    };
  }), [scenario.edges, active, focusIds]);

  const openExplore = () => {
    focusedBeforeExplore.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setExploring(true);
  };
  const stepNumber = activeStep + 1;
  const exploreReady = canExplore(activeStep, scenario.steps.length);
  const isPortuguese = locale === "pt";
  const mobileExploring = exploring && isMobile;
  const selectedCopy = selectedNode ? copy.nodes[selectedNode] : null;

  return (
    <section className="scrolly-flow" aria-labelledby={`${scenario.id}-title`} style={{ margin: "3rem auto", maxWidth: 1152 }}>
      <header style={{ maxWidth: 720, marginBottom: 24 }}>
        <p style={{ color: "var(--scrolly-muted, #4b5563)", fontFamily: "var(--font-family-mono, monospace)", fontSize: 12, margin: 0 }}>
          {isPortuguese ? "Cenário" : "Scenario"} · {stepNumber}/{scenario.steps.length}
        </p>
        <h2 id={`${scenario.id}-title`} style={{ margin: "8px 0", fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>{copy.title}</h2>
        <p style={{ margin: 0, color: "var(--scrolly-text, #374151)" }}>{copy.summary}</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(280px, 1.1fr)", alignItems: "start", gap: 32 }} className="scrolly-flow-layout">
        <div>
          {copy.steps.map((step, index) => (
            <article key={scenario.steps[index].id} ref={(element) => { stepRefs.current[index] = element; }} data-scrolly-step={index} tabIndex={-1}
              style={{ minHeight: "min(50vh, 400px)", padding: "24px 0", borderTop: "1px solid var(--scrolly-border, #e5e7eb)" }}>
              <p aria-hidden="true" style={{ color: "var(--scrolly-muted, #6b7280)", fontFamily: "var(--font-family-mono, monospace)", fontSize: 12, margin: 0 }}>{String(index + 1).padStart(2, "0")}</p>
              <h3 style={{ margin: "8px 0 12px", fontSize: "1.25rem" }}>{step.title}</h3>
              <p style={{ margin: 0, lineHeight: 1.7 }}>{step.body}</p>
            </article>
          ))}
          <div style={{ borderTop: "1px solid var(--scrolly-border, #e5e7eb)", paddingTop: 24 }}>
            <button type="button" onClick={openExplore} disabled={!exploreReady}
              aria-describedby={!exploreReady ? `${scenario.id}-explore-hint` : undefined}
              style={{ border: 0, borderRadius: 8, padding: "10px 14px", fontWeight: 700, cursor: exploreReady ? "pointer" : "not-allowed", background: "var(--color-brand-lime, #ccff00)", color: "var(--color-brand-black, #111)", opacity: exploreReady ? 1 : 0.45 }}>
              {copy.explore}
            </button>
            {!exploreReady && <p id={`${scenario.id}-explore-hint`} style={{ margin: "10px 0 0", fontSize: 13, color: "var(--scrolly-muted, #4b5563)" }}>{isPortuguese ? "Disponível após a última etapa." : "Available after the final step."}</p>}
          </div>
        </div>

        <div className={`scrolly-flow-canvas${exploring ? " is-exploring" : ""}${mobileExploring ? " is-mobile-exploring" : ""}`} role={mobileExploring ? "dialog" : undefined} aria-modal={mobileExploring || undefined} aria-label={mobileExploring ? copy.title : undefined} style={{ position: mobileExploring ? "fixed" : "sticky", zIndex: mobileExploring ? 50 : 1, top: mobileExploring ? 0 : 96, right: mobileExploring ? 0 : undefined, bottom: mobileExploring ? 0 : undefined, left: mobileExploring ? 0 : undefined, height: mobileExploring ? "100dvh" : exploring ? 640 : 430, overflow: "hidden", border: "1px solid var(--scrolly-border, #d1d5db)", borderRadius: mobileExploring ? 0 : 16, background: "var(--scrolly-surface, #fff)" }}>
          {exploring && <button ref={closeButton} type="button" onClick={closeExplore} style={{ position: "absolute", zIndex: 5, top: 16, right: 16, border: "1px solid var(--scrolly-border, #d1d5db)", borderRadius: 8, padding: "8px 10px", background: "var(--scrolly-surface, #fff)", color: "var(--scrolly-text, #111)" }}>{isPortuguese ? "Fechar" : "Close"}</button>}
          {hydrated ? <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.18 }} nodesDraggable={exploring} nodesConnectable={false} elementsSelectable={exploring} zoomOnScroll={exploring} panOnScroll={exploring} panOnDrag={exploring} zoomOnPinch={exploring} preventScrolling={exploring} onPaneClick={() => setSelectedNode(null)}>
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--scrolly-border, #d1d5db)" />
            {exploring && <Controls showInteractive={false} />}
          </ReactFlow> : <div aria-hidden="true" style={{ height: "100%", display: "grid", placeItems: "center", color: "var(--color-gray-500, #6b7280)", fontFamily: "var(--font-family-mono, monospace)", fontSize: 12 }}>{isPortuguese ? "Diagrama interativo" : "Interactive diagram"}</div>}
          {exploring && selectedCopy && <aside style={{ position: "absolute", zIndex: 4, right: 16, bottom: 16, left: 16, maxWidth: 520, border: "1px solid var(--scrolly-border, #d1d5db)", borderRadius: 12, padding: 16, background: "color-mix(in srgb, var(--scrolly-surface, #fff) 94%, transparent)", color: "var(--scrolly-text, #111)", boxShadow: "0 12px 30px rgba(0,0,0,.18)" }}>
            <strong>{selectedCopy.label}</strong>
            {selectedCopy.decision && <p style={{ margin: "8px 0 0" }}><b>{isPortuguese ? "Decisão: " : "Decision: "}</b>{selectedCopy.decision}</p>}
            {selectedCopy.tradeoff && <p style={{ margin: "8px 0 0" }}><b>Trade-off: </b>{selectedCopy.tradeoff}</p>}
          </aside>}
          <p aria-live="polite" style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>{copy.steps[activeStep].title}</p>
        </div>
      </div>
      <style>{`.scrolly-flow { width: min(72rem, calc(100vw - 3rem)); margin-left: 50% !important; transform: translateX(-50%); } html[data-reading-theme-active="light"] .scrolly-flow { --scrolly-surface: #fff; --scrolly-text: #111; --scrolly-node: #0a0a0a; --scrolly-node-text: #fff; --scrolly-muted: #6b7280; --scrolly-border: #d1d5db; } html[data-reading-theme-active="dark"] .scrolly-flow { --scrolly-surface: #161616; --scrolly-text: #f3f4f6; --scrolly-node: #242424; --scrolly-node-text: #fff; --scrolly-muted: #9ca3af; --scrolly-border: #3f3f46; } @media (max-width: 720px) { .scrolly-flow-layout { grid-template-columns: minmax(0, 1fr) !important; } .scrolly-flow-canvas:not(.is-mobile-exploring) { position: sticky !important; top: 6rem !important; height: 280px !important; order: -1; } } @media (prefers-reduced-motion: reduce) { .react-flow *, .react-flow__edge-path { transition: none !important; animation: none !important; } }`}</style>
    </section>
  );
}
