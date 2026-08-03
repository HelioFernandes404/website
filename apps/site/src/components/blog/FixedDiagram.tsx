import { useEffect, useMemo, useRef, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Handle,
  Position,
  ReactFlow,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { validateScenario } from "../../data/blog-scenarios/validate.js";

type Locale = "pt" | "en";

type ScenarioNode = { id: string; x: number; y: number; kind: string };
type ScenarioEdge = { id: string; source: string; target: string; label?: string };
type Copy = {
  title: string;
  summary: string;
  nodes: Record<string, { label: string; detail?: string }>;
  steps: Array<{ title: string; body: string }>;
};
type Scenario = {
  id: string;
  nodes: ScenarioNode[];
  edges: ScenarioEdge[];
  steps: Array<{ id: string }>;
  copy: Record<Locale, Copy>;
};

interface Props { scenario: Scenario; locale: Locale }

type FlowData = {
  label: string;
  detail?: string;
};

type FlowNode = Node<FlowData, "fixed">;

function ScenarioNode({ data }: NodeProps<FlowNode>) {
  const tone = "var(--color-brand-lime, #ccff00)";

  return (
    <div
      style={{
        width: 176,
        border: `1px solid ${tone}`,
        borderRadius: 12,
        padding: "12px 14px",
        background: "var(--diagram-node, #0a0a0a)",
        color: "var(--diagram-node-text, #fff)",
        boxShadow: "0 0 0 1px color-mix(in srgb, var(--color-brand-lime, #ccff00) 16%, transparent)",
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: tone }} />
      <strong style={{ display: "block", fontSize: 14, color: "var(--diagram-node-text, #fff)" }}>{data.label}</strong>
      {data.detail && <span style={{ display: "block", marginTop: 4, color: "var(--diagram-muted, #9ca3af)", fontSize: 12 }}>{data.detail}</span>}
      <Handle type="source" position={Position.Right} style={{ background: tone }} />
    </div>
  );
}

const nodeTypes = { fixed: ScenarioNode };
const fitViewOptions = { padding: 0.14, minZoom: 0.25 };

function FitViewport({ containerRef }: { containerRef: { current: HTMLDivElement | null } }) {
  const { fitView } = useReactFlow<FlowNode>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;

    let frame = 0;
    let fitTimeout = 0;
    const scheduleFit = () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fitTimeout);
      fitTimeout = window.setTimeout(() => {
        frame = window.requestAnimationFrame(() => { void fitView({ ...fitViewOptions, duration: 0 }); });
      }, 0);
    };

    scheduleFit();
    const observer = new ResizeObserver(scheduleFit);
    observer.observe(container);
    window.addEventListener("resize", scheduleFit);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fitTimeout);
      observer.disconnect();
      window.removeEventListener("resize", scheduleFit);
    };
  }, [containerRef, fitView]);

  return null;
}

export default function FixedDiagram({ scenario: inputScenario, locale }: Props) {
  const scenario = useMemo(() => validateScenario(inputScenario) as Scenario, [inputScenario]);
  const copy = scenario.copy[locale];
  const [hydrated, setHydrated] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setHydrated(true), []);

  const nodes = useMemo<FlowNode[]>(() => scenario.nodes.map((node) => {
    const nodeCopy = copy.nodes[node.id];
    return {
      id: node.id,
      type: "fixed",
      position: { x: node.x, y: node.y },
      data: { label: nodeCopy.label, detail: nodeCopy.detail },
    };
  }), [scenario.nodes, copy.nodes]);

  const edges = useMemo<Edge[]>(() => scenario.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    style: { stroke: "var(--color-brand-lime, #ccff00)", strokeWidth: 2, opacity: 0.78 },
    labelStyle: { fill: "var(--diagram-text, #111)", fontSize: 11 },
    labelBgStyle: { fill: "var(--diagram-surface, #fff)", fillOpacity: 0.9 },
  })), [scenario.edges]);

  const isPortuguese = locale === "pt";

  return (
    <section className="fixed-diagram" aria-labelledby={`${scenario.id}-title`} style={{ margin: "3rem auto", maxWidth: 1152 }}>
      <header style={{ maxWidth: 720, marginBottom: 24 }}>
        <p style={{ color: "var(--diagram-muted, #4b5563)", fontFamily: "var(--font-family-mono, monospace)", fontSize: 12, margin: 0 }}>
          {isPortuguese ? "Diagrama de arquitetura" : "Architecture diagram"}
        </p>
        <h2 id={`${scenario.id}-title`} style={{ margin: "8px 0", fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>{copy.title}</h2>
        <p style={{ margin: 0, color: "var(--diagram-text, #374151)" }}>{copy.summary}</p>
      </header>

      <div className="fixed-diagram-layout" style={{ display: "grid", gridTemplateColumns: "minmax(280px, 1.1fr) minmax(0, 0.9fr)", alignItems: "start", gap: 32 }}>
        <div
          ref={canvasRef}
          className="fixed-diagram-canvas"
          aria-label={isPortuguese ? "Diagrama fixo da arquitetura" : "Fixed architecture diagram"}
          style={{ position: "sticky", zIndex: 1, top: 96, height: "min(640px, calc(100vh - 8rem))", overflow: "hidden", border: "1px solid var(--diagram-border, #d1d5db)", borderRadius: 16, background: "var(--diagram-surface, #fff)" }}
        >
          <div aria-hidden="true" style={{ position: "absolute", zIndex: 2, top: 16, left: 16, border: "1px solid var(--diagram-border, #3f3f46)", borderRadius: 999, padding: "7px 11px", background: "color-mix(in srgb, var(--diagram-surface, #161616) 88%, transparent)", color: "var(--diagram-text, #f3f4f6)", fontFamily: "var(--font-family-mono, monospace)", fontSize: 11, pointerEvents: "none" }}>
            {isPortuguese ? "Diagrama fixo" : "Fixed diagram"}
          </div>
          {hydrated ? <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView fitViewOptions={fitViewOptions} minZoom={0.25} nodesDraggable={false} nodesConnectable={false} elementsSelectable={false} zoomOnScroll={false} panOnScroll={false} panOnDrag={false} zoomOnPinch={false} preventScrolling={false}>
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--diagram-border, #d1d5db)" />
            <FitViewport containerRef={canvasRef} />
          </ReactFlow> : <div aria-hidden="true" style={{ height: "100%", display: "grid", placeItems: "center", color: "var(--diagram-muted, #6b7280)", fontFamily: "var(--font-family-mono, monospace)", fontSize: 12 }}>{isPortuguese ? "Diagrama de arquitetura" : "Architecture diagram"}</div>}
        </div>

        <div className="fixed-diagram-notes">
          {copy.steps.map((step, index) => (
            <article key={scenario.steps[index].id} style={{ minHeight: "min(50vh, 400px)", padding: "24px 0", borderTop: "1px solid var(--diagram-border, #e5e7eb)" }}>
              <p aria-hidden="true" style={{ color: "var(--diagram-muted, #6b7280)", fontFamily: "var(--font-family-mono, monospace)", fontSize: 12, margin: 0 }}>{String(index + 1).padStart(2, "0")}</p>
              <h3 style={{ margin: "8px 0 12px", fontSize: "1.25rem" }}>{step.title}</h3>
              <p style={{ margin: 0, lineHeight: 1.7 }}>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
      <style>{`.fixed-diagram { box-sizing: border-box; width: min(72rem, calc(100vw - 3rem)); margin-left: 50% !important; transform: translateX(-50%); } .fixed-diagram-layout > * { min-width: 0; } html[data-reading-theme-active="light"] .fixed-diagram { --diagram-surface: #fff; --diagram-text: #111; --diagram-node: #0a0a0a; --diagram-node-text: #fff; --diagram-muted: #6b7280; --diagram-border: #d1d5db; } html[data-reading-theme-active="dark"] .fixed-diagram { --diagram-surface: #161616; --diagram-text: #f3f4f6; --diagram-node: #242424; --diagram-node-text: #fff; --diagram-muted: #9ca3af; --diagram-border: #3f3f46; } @media (max-width: 960px) { .fixed-diagram-layout { grid-template-columns: minmax(0, 1fr) !important; } .fixed-diagram-canvas { position: relative !important; top: auto !important; height: clamp(280px, 52vw, 380px) !important; } } @media (max-width: 720px) { .fixed-diagram-canvas { height: 280px !important; } } @media (prefers-reduced-motion: reduce) { .react-flow *, .react-flow__edge-path { transition: none !important; animation: none !important; } }`}</style>
    </section>
  );
}
