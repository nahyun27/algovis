import { useMemo } from 'react';
import type { KruskalStep, KruskalNode, Edge } from './types';
import { findRoot } from './types';

interface Props {
  step: KruskalStep;
  nodes: KruskalNode[];
  edges: Edge[];
}

const SVG_W = 660;
const SVG_H = 340;
const R = 26;

// 6 component colors, indexed by root id
const COMP_FILL   = ['#dbeafe','#dcfce7','#fef3c7','#ede9fe','#fee2e2','#fce7f3'];
const COMP_STROKE = ['#3b82f6','#22c55e','#f59e0b','#8b5cf6','#ef4444','#ec4899'];
const COMP_TEXT   = ['#1e40af','#166534','#92400e','#4c1d95','#7f1d1d','#831843'];

function edgeKey(e: Edge) { return `${Math.min(e.u,e.v)}-${Math.max(e.u,e.v)}`; }

export default function KruskalGraphCanvas({ step, nodes, edges }: Props) {
  const mstSet = useMemo(() => new Set(step.mstEdges.map(edgeKey)), [step.mstEdges]);
  const rejectedSet = useMemo(() => new Set(step.rejectedEdges.map(edgeKey)), [step.rejectedEdges]);
  const currentKey = step.currentEdge ? edgeKey(step.currentEdge) : null;

  const edgeElements = useMemo(() => edges.map((e, idx) => {
    const from = nodes[e.u];
    const to   = nodes[e.v];
    if (!from || !to) return null;

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx*dx + dy*dy);
    const nx = dx/len, ny = dy/len;
    const x1 = from.x + nx*R, y1 = from.y + ny*R;
    const x2 = to.x   - nx*R, y2 = to.y   - ny*R;
    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2;

    const key = edgeKey(e);
    const isMST      = mstSet.has(key);
    const isRejected = rejectedSet.has(key);
    const isCurrent  = currentKey === key;

    let stroke = '#d1d5db';
    let strokeWidth = 1.5;
    let strokeDasharray: string | undefined;
    let opacity = 1;

    if (isMST) {
      stroke = '#22c55e'; strokeWidth = 3.5;
    } else if (isCurrent) {
      stroke = '#3b82f6'; strokeWidth = 3;
    } else if (isRejected) {
      stroke = '#ef4444'; strokeWidth = 1.5; strokeDasharray = '5,4'; opacity = 0.7;
    }

    // label offset — perpendicular to edge, small nudge
    const perpX = -ny * 12;
    const perpY =  nx * 12;

    return (
      <g key={idx}>
        <line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={stroke} strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          opacity={opacity}
          className="transition-all duration-300"
        />
        <text
          x={mx + perpX} y={my + perpY}
          textAnchor="middle" dominantBaseline="central"
          fontSize={11} fontWeight="700"
          fill={isMST ? '#166534' : isCurrent ? '#1d4ed8' : isRejected ? '#b91c1c' : '#6b7280'}
          className="transition-all duration-300"
        >
          {e.weight}
        </text>
      </g>
    );
  }), [step, nodes, edges, mstSet, rejectedSet, currentKey]);

  const nodeElements = useMemo(() => nodes.map(node => {
    const root = findRoot(step.parent, node.id);
    const colorIdx = root % COMP_FILL.length;
    const fill   = COMP_FILL[colorIdx];
    const stroke = COMP_STROKE[colorIdx];
    const textColor = COMP_TEXT[colorIdx];

    const isCurrent = step.currentEdge &&
      (step.currentEdge.u === node.id || step.currentEdge.v === node.id);

    return (
      <g key={node.id} className="transition-all duration-300">
        <circle
          cx={node.x} cy={node.y} r={R}
          fill={fill}
          stroke={isCurrent ? '#f97316' : stroke}
          strokeWidth={isCurrent ? 3 : 2}
          className="transition-all duration-300"
        />
        <text
          x={node.x} y={node.y}
          textAnchor="middle" dominantBaseline="central"
          fontSize={13} fontWeight="700"
          fill={textColor}
        >
          {node.id}
        </text>
      </g>
    );
  }), [step, nodes]);

  return (
    <div className="w-full flex-1 flex items-center justify-center bg-muted/5 overflow-hidden">
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-full" style={{ maxHeight: '100%' }}>
        {edgeElements}
        {nodeElements}
      </svg>
    </div>
  );
}
