import { useMemo } from 'react';
import type { PrimStep } from './types';
import { INF } from './types';
import type { KruskalNode, Edge } from '../kruskal/types';

interface Props {
  step: PrimStep;
  nodes: KruskalNode[];
  edges: Edge[];
}

const SVG_W = 660;
const SVG_H = 340;
const R = 26;

function edgeKey(u: number, v: number) {
  return `${Math.min(u, v)}-${Math.max(u, v)}`;
}

export default function PrimGraphCanvas({ step, nodes, edges }: Props) {
  const mstSet = useMemo(
    () => new Set(step.mstEdges.map(e => edgeKey(e.u, e.v))),
    [step.mstEdges],
  );
  const pqSet = useMemo(
    () => new Set(step.pq.map(item => item.node)),
    [step.pq],
  );
  const currentEdgeKey =
    step.currentNode !== null && step.currentNeighbor !== null
      ? edgeKey(step.currentNode, step.currentNeighbor)
      : null;

  const edgeEls = useMemo(() => edges.map((e, idx) => {
    const from = nodes[e.u];
    const to   = nodes[e.v];
    if (!from || !to) return null;

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / len, ny = dy / len;
    const x1 = from.x + nx * R, y1 = from.y + ny * R;
    const x2 = to.x   - nx * R, y2 = to.y   - ny * R;
    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2;

    const key  = edgeKey(e.u, e.v);
    const isMST     = mstSet.has(key);
    const isCurrent = currentEdgeKey === key;

    const stroke      = isMST ? '#22c55e' : isCurrent ? '#f97316' : '#d1d5db';
    const strokeWidth = isMST ? 3.5       : isCurrent ? 3         : 1.5;
    const perpX = -ny * 12;
    const perpY =  nx * 12;

    return (
      <g key={idx}>
        <line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={stroke} strokeWidth={strokeWidth}
          className="transition-all duration-300"
        />
        <text
          x={mx + perpX} y={my + perpY}
          textAnchor="middle" dominantBaseline="central"
          fontSize={11} fontWeight="700"
          fill={isMST ? '#166534' : isCurrent ? '#ea580c' : '#6b7280'}
          className="transition-all duration-300"
        >
          {e.weight}
        </text>
      </g>
    );
  }), [edges, nodes, mstSet, currentEdgeKey]);

  const nodeEls = useMemo(() => nodes.map(node => {
    const { id, x, y } = node;
    const isVisited  = step.visited[id];
    const isCurrent  = step.currentNode === id;
    const isInPQ     = pqSet.has(id);
    const isNeighbor = step.currentNeighbor === id;
    const keyVal     = step.key[id];

    let fill   = '#f3f4f6';
    let stroke = '#9ca3af';
    let textFill = '#374151';

    if (isVisited) {
      fill = '#dcfce7'; stroke = '#22c55e'; textFill = '#166534';
    } else if (isCurrent) {
      fill = '#dbeafe'; stroke = '#3b82f6'; textFill = '#1e40af';
    } else if (isInPQ) {
      fill = '#e0f2fe'; stroke = '#0ea5e9'; textFill = '#0369a1';
    }

    const strokeWidth = isNeighbor ? 3.5 : (isCurrent || isVisited) ? 2.5 : 1.5;
    const strokeColor = isNeighbor ? '#f97316' : stroke;

    return (
      <g key={id} className="transition-all duration-300">
        <circle
          cx={x} cy={y} r={R}
          fill={fill} stroke={strokeColor} strokeWidth={strokeWidth}
          className="transition-all duration-300"
        />
        <text
          x={x} y={y}
          textAnchor="middle" dominantBaseline="central"
          fontSize={13} fontWeight="700" fill={textFill}
        >
          {id}
        </text>
        <text
          x={x} y={y + R + 13}
          textAnchor="middle"
          fontSize={10} fontWeight="600"
          fill={isVisited ? '#22c55e' : isCurrent ? '#3b82f6' : isInPQ ? '#0ea5e9' : '#9ca3af'}
        >
          {keyVal >= INF ? '∞' : keyVal}
        </text>
      </g>
    );
  }), [step, nodes, pqSet]);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center bg-muted/5 overflow-hidden">
      {/* Legend */}
      <div className="flex gap-3 text-[10px] font-medium shrink-0 pt-2 flex-wrap px-4">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-emerald-200 border border-emerald-500 inline-block" />MST 확정
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-200 border border-blue-500 inline-block" />현재 처리 (curr)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-sky-200 border border-sky-400 inline-block" />큐 대기 중
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-gray-100 border border-gray-400 inline-block" />미방문
        </span>
        <span className="text-[9px] text-muted-foreground ml-1">노드 아래: key값</span>
      </div>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full flex-1"
        style={{ maxHeight: '100%' }}
      >
        {edgeEls}
        {nodeEls}
      </svg>
    </div>
  );
}
