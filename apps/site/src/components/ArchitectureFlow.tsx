import { useCallback, useMemo, useState } from "react";
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

export type ArchKind = "entry" | "service" | "data" | "external";

export interface ArchNodeInput {
  id: string;
  label: string;
  kind: ArchKind;
  subtitle?: string;
  x: number;
  y: number;
  /** The call made here. This is the part that carries the seniority signal. */
  decision?: string;
  /** What it cost. A decision with no stated cost reads as a slogan. */
  tradeoff?: string;
}

export interface ArchEdgeInput {
  from: string;
  to: string;
  label?: string;
  /** Animated edges read as async rather than a blocking call. */
  async?: boolean;
}

export type FlowLanguage = "en" | "pt";

interface Props {
  nodes: ArchNodeInput[];
  edges: ArchEdgeInput[];
  /** Shown before the reader picks a node, so the panel is never empty. */
  hint?: string;
  lang?: FlowLanguage;
}

const LIME = "#ccff00";

const KIND_STYLE: Record<ArchKind, { border: string; badge: string }> = {
  entry: { border: LIME, badge: LIME },
  service: { border: "#374151", badge: "#9ca3af" },
  data: { border: "#4b5563", badge: "#9ca3af" },
  external: { border: "#6b7280", badge: "#6b7280" },
};

const FLOW_COPY = {
  en: {
    kinds: { entry: "entry", service: "service", data: "data", external: "external" },
    mobileHint: "Drag to explore the diagram.",
    defaultHint: "Click a component to see the decision behind it.",
    decision: "Decision",
    tradeoff: "Trade-off",
    reading: "// reading",
    viewDecision: "// view decision",
  },
  pt: {
    kinds: { entry: "entrada", service: "serviço", data: "dados", external: "externo" },
    mobileHint: "Arraste para explorar o diagrama.",
    defaultHint: "Clique em um componente para ver a decisão por trás dele.",
    decision: "Decisão",
    tradeoff: "Trade-off",
    reading: "// lendo",
    viewDecision: "// ver decisão",
  },
} as const;

const KIND_ORDER: ArchKind[] = ["entry", "service", "data", "external"];

// React Flow v12 constrains node data to Record<string, unknown>, so the
// index signature is intersected in. Named properties keep their real types.
type FlowNodeData = ArchNodeInput & {
  isSelected: boolean;
  isDimmed: boolean;
  hasDetail: boolean;
  onPick: (id: string) => void;
  copy: (typeof FLOW_COPY)[FlowLanguage];
} & Record<string, unknown>;

type ArchFlowNode = Node<FlowNodeData, "arch">;

function ArchNode({ data }: NodeProps<ArchFlowNode>) {
  const style = KIND_STYLE[data.kind];
  const interactive = data.hasDetail;
  const copy = data.copy;

  return (
    <div
      className="architecture-flow-node"
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? data.isSelected : undefined}
      aria-label={interactive ? `${data.label}: ${copy.viewDecision.replace("// ", "")}` : data.label}
      onClick={interactive ? () => data.onPick(data.id) : undefined}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                data.onPick(data.id);
              }
            }
          : undefined
      }
      style={{
        minWidth: 176,
        borderRadius: 12,
        border: `1px solid ${data.isSelected ? LIME : style.border}`,
        background: data.isSelected ? "#161b22" : "#0a0a0a",
        boxShadow: data.isSelected
          ? `0 0 0 3px rgba(204,255,0,0.25), 0 8px 24px rgba(0,0,0,0.5)`
          : "0 1px 2px rgba(0,0,0,0.4)",
        padding: "12px 14px",
        cursor: interactive ? "pointer" : "default",
        opacity: data.isDimmed ? 0.25 : 1,
        transition:
          "border-color 200ms, box-shadow 200ms, background-color 200ms, opacity 200ms",
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: "#4b5563" }} />

      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: style.badge,
        }}
      >
        {copy.kinds[data.kind]}
      </div>
      <div style={{ marginTop: 4, fontWeight: 600, fontSize: 14, color: "#ffffff" }}>
        {data.label}
      </div>
      {data.subtitle && (
        <div style={{ marginTop: 2, fontSize: 12, color: "#9ca3af" }}>{data.subtitle}</div>
      )}
      {interactive && (
        <div
          style={{
            marginTop: 8,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: data.isSelected ? LIME : "#6b7280",
          }}
        >
          {data.isSelected ? copy.reading : copy.viewDecision}
        </div>
      )}

      <Handle type="source" position={Position.Right} style={{ background: "#4b5563" }} />
    </div>
  );
}

const nodeTypes = { arch: ArchNode };

export default function ArchitectureFlow({ nodes, edges, hint, lang = "en" }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const copy = FLOW_COPY[lang];

  const onPick = useCallback((id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  }, []);

  // Selecting a node focuses its immediate neighbourhood: everything else fades
  // back so the reader sees what this component actually touches.
  const focused = useMemo(() => {
    if (!selectedId) return null;
    const ids = new Set<string>([selectedId]);
    for (const edge of edges) {
      if (edge.from === selectedId) ids.add(edge.to);
      if (edge.to === selectedId) ids.add(edge.from);
    }
    return ids;
  }, [selectedId, edges]);

  const flowNodes = useMemo<ArchFlowNode[]>(
    () =>
      nodes.map((node) => ({
        id: node.id,
        type: "arch",
        position: { x: node.x, y: node.y },
        data: {
          ...node,
          isSelected: node.id === selectedId,
          isDimmed: Boolean(focused) && !focused?.has(node.id),
          hasDetail: Boolean(node.decision),
          onPick,
          copy,
        },
      })),
    [nodes, selectedId, focused, onPick, copy],
  );

  const flowEdges = useMemo<Edge[]>(
    () =>
      edges.map((edge) => {
        const touchesSelection =
          Boolean(selectedId) && (edge.from === selectedId || edge.to === selectedId);
        const dimmed = Boolean(selectedId) && !touchesSelection;

        return {
          id: `${edge.from}-${edge.to}`,
          source: edge.from,
          target: edge.to,
          label: edge.label,
          animated: edge.async || touchesSelection,
          style: {
            stroke: touchesSelection ? LIME : "#4b5563",
            strokeWidth: touchesSelection ? 2 : 1.5,
            opacity: dimmed ? 0.2 : 1,
            transition: "stroke 200ms, opacity 200ms",
          },
          labelStyle: {
            fill: touchesSelection ? LIME : "#9ca3af",
            fontSize: 11,
            fontFamily: "JetBrains Mono, monospace",
            opacity: dimmed ? 0.2 : 1,
          },
          labelBgStyle: { fill: "#0a0a0a", fillOpacity: dimmed ? 0.2 : 1 },
          labelBgPadding: [6, 3] as [number, number],
          labelBgBorderRadius: 4,
        };
      }),
    [edges, selectedId],
  );

  const selected = nodes.find((node) => node.id === selectedId) ?? null;
  const usedKinds = KIND_ORDER.filter((kind) => nodes.some((node) => node.kind === kind));

  return (
    <div
      role="group"
      aria-label={lang === "pt" ? "Diagrama de arquitetura interativo" : "Interactive architecture diagram"}
    >
      <div
        style={{ height: 460 }}
        className="overflow-hidden rounded-2xl border border-gray-800 bg-brand-black"
      >
        <ReactFlow
          nodes={flowNodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          nodesDraggable={false}
          nodesConnectable={false}
          edgesFocusable={false}
          onPaneClick={() => setSelectedId(null)}
          // The diagram sits mid-article: capturing the wheel would trap the
          // reader's page scroll. Zoom stays available through Controls.
          zoomOnScroll={false}
          preventScrolling={false}
          panOnScroll={false}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#262626" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      {/* A wide graph cannot fit a phone without going illegible: fitView is
          clamped by minZoom, so on small screens it overflows by design and the
          reader pans instead. Say so, rather than letting it look clipped. */}
      <p className="mt-3 font-mono text-xs text-gray-500 md:hidden">
        {copy.mobileHint}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-xs text-gray-500">
        {usedKinds.map((kind) => (
          <span key={kind} className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-sm border"
              style={{ borderColor: KIND_STYLE[kind].border, background: "#0a0a0a" }}
            />
            {copy.kinds[kind]}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block w-5 border-t border-dashed border-gray-500" />
          {lang === "pt" ? "assíncrono" : "async"}
        </span>
      </div>

      <div
        aria-live="polite"
        className="mt-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        {selected ? (
          <>
            <p className="font-mono text-xs uppercase tracking-wider text-brand-gray">
              {selected.label}
            </p>
            <p className="mt-3 font-semibold">{copy.decision}</p>
            <p className="mt-1 text-gray-600">{selected.decision}</p>
            {selected.tradeoff && (
              <>
                <p className="mt-4 font-semibold">{copy.tradeoff}</p>
                <p className="mt-1 text-gray-600">{selected.tradeoff}</p>
              </>
            )}
          </>
        ) : (
          <p className="text-gray-500">
            {hint ?? copy.defaultHint}
          </p>
        )}
      </div>
    </div>
  );
}
