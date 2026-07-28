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
  /** Dashed/animated edges read as async rather than a blocking call. */
  async?: boolean;
}

interface Props {
  nodes: ArchNodeInput[];
  edges: ArchEdgeInput[];
  /** Shown before the reader picks a node, so the panel is never empty. */
  hint?: string;
}

const KIND_STYLE: Record<ArchKind, { border: string; badge: string; label: string }> = {
  entry: { border: "#ccff00", badge: "#ccff00", label: "entrada" },
  service: { border: "#374151", badge: "#9ca3af", label: "servico" },
  data: { border: "#4b5563", badge: "#9ca3af", label: "dados" },
  external: { border: "#6b7280", badge: "#6b7280", label: "externo" },
};

// React Flow v12 constrains node data to Record<string, unknown>, so the
// index signature is intersected in. Named properties keep their real types.
type FlowNodeData = ArchNodeInput & {
  isSelected: boolean;
  hasDetail: boolean;
  onPick: (id: string) => void;
} & Record<string, unknown>;

type ArchFlowNode = Node<FlowNodeData, "arch">;

function ArchNode({ data }: NodeProps<ArchFlowNode>) {
  const style = KIND_STYLE[data.kind];
  const interactive = data.hasDetail;

  return (
    <div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? data.isSelected : undefined}
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
        minWidth: 168,
        borderRadius: 12,
        border: `1px solid ${data.isSelected ? "#ccff00" : style.border}`,
        background: data.isSelected ? "#111827" : "#0a0a0a",
        boxShadow: data.isSelected
          ? "0 0 0 3px rgba(204,255,0,0.25)"
          : "0 1px 2px rgba(0,0,0,0.4)",
        padding: "12px 14px",
        cursor: interactive ? "pointer" : "default",
        transition: "border-color 200ms, box-shadow 200ms, background-color 200ms",
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
        {style.label}
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
            color: data.isSelected ? "#ccff00" : "#6b7280",
          }}
        >
          {data.isSelected ? "// lendo" : "// ver decisao"}
        </div>
      )}

      <Handle type="source" position={Position.Right} style={{ background: "#4b5563" }} />
    </div>
  );
}

const nodeTypes = { arch: ArchNode };

export default function ArchitectureFlow({ nodes, edges, hint }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const onPick = useCallback((id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  }, []);

  const flowNodes = useMemo<ArchFlowNode[]>(
    () =>
      nodes.map((node) => ({
        id: node.id,
        type: "arch",
        position: { x: node.x, y: node.y },
        data: {
          ...node,
          isSelected: node.id === selectedId,
          hasDetail: Boolean(node.decision),
          onPick,
        },
      })),
    [nodes, selectedId, onPick],
  );

  const flowEdges = useMemo<Edge[]>(
    () =>
      edges.map((edge) => ({
        id: `${edge.from}-${edge.to}`,
        source: edge.from,
        target: edge.to,
        label: edge.label,
        animated: edge.async,
        style: { stroke: "#4b5563", strokeWidth: 1.5 },
        labelStyle: {
          fill: "#9ca3af",
          fontSize: 11,
          fontFamily: "JetBrains Mono, monospace",
        },
        labelBgStyle: { fill: "#0a0a0a" },
        labelBgPadding: [6, 3] as [number, number],
        labelBgBorderRadius: 4,
      })),
    [edges],
  );

  const selected = nodes.find((node) => node.id === selectedId) ?? null;

  return (
    <div>
      <div
        style={{ height: 420 }}
        className="overflow-hidden rounded-2xl border border-gray-800 bg-brand-black"
      >
        <ReactFlow
          nodes={flowNodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          edgesFocusable={false}
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

      <div
        aria-live="polite"
        className="mt-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        {selected ? (
          <>
            <p className="font-mono text-xs uppercase tracking-wider text-brand-gray">
              {selected.label}
            </p>
            <p className="mt-2 font-semibold">Decisao</p>
            <p className="mt-1 text-gray-600">{selected.decision}</p>
            {selected.tradeoff && (
              <>
                <p className="mt-4 font-semibold">Trade-off</p>
                <p className="mt-1 text-gray-600">{selected.tradeoff}</p>
              </>
            )}
          </>
        ) : (
          <p className="text-gray-500">
            {hint ?? "Clique em um componente do diagrama para ver a decisao por tras dele."}
          </p>
        )}
      </div>
    </div>
  );
}
