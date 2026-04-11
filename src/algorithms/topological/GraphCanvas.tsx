import { useMemo } from 'react';
import type { KahnStep, DFSTopoStep, TopoNode } from './types';

interface Props {
  step: KahnStep | DFSTopoStep;
  mode: 'Kahn' | 'DFS';
  nodes: TopoNode[];
  edges: [number, number][];
}

const SVG_W = 660;
const SVG_H = 380;
const R = 28;

function getKahnNodeStyle(
  id: number,
  step: KahnStep,
): { fill: string; stroke: string; textColor: string } {
  if (step.result.includes(id))
    return { fill: '#dcfce7', stroke: '#22c55e', textColor: '#166534' };   // green
  if (id === step.currentNode)
    return { fill: '#dbeafe', stroke: '#3b82f6', textColor: '#1e3a8a' };   // blue
  if (step.queue.includes(id))
    return { fill: '#e0f2fe', stroke: '#0ea5e9', textColor: '#075985' };   // sky
  if (step.hasCycle)
    return { fill: '#fee2e2', stroke: '#ef4444', textColor: '#7f1d1d' };   // red
  return { fill: '#f4f4f5', stroke: '#a1a1aa', textColor: '#3f3f46' };     // gray
}

function getDFSNodeStyle(
  id: number,
  step: DFSTopoStep,
): { fill: string; stroke: string; textColor: string } {
  if (step.result.includes(id))
    return { fill: '#dcfce7', stroke: '#22c55e', textColor: '#166534' };   // green (done)
  if (step.finished[id])
    return { fill: '#d1fae5', stroke: '#10b981', textColor: '#065f46' };   // emerald
  if (id === step.currentNode && step.inStack[id])
    return { fill: '#dbeafe', stroke: '#3b82f6', textColor: '#1e3a8a' };   // blue (active)
  if (step.inStack[id])
    return { fill: '#ede9fe', stroke: '#8b5cf6', textColor: '#4c1d95' };   // violet (in call stack)
  if (step.visited[id])
    return { fill: '#fef9c3', stroke: '#eab308', textColor: '#713f12' };   // yellow (visited)
  if (step.hasCycle)
    return { fill: '#fee2e2', stroke: '#ef4444', textColor: '#7f1d1d' };
  return { fill: '#f4f4f5', stroke: '#a1a1aa', textColor: '#3f3f46' };
}

export default function TopoGraphCanvas({ step, mode, nodes, edges }: Props) {
  const edgeElements = useMemo(() => {
    return edges.map(([fromId, toId], idx) => {
      const from = nodes[fromId];
      const to   = nodes[toId];
      if (!from || !to) return null;

      const dx  = to.x - from.x;
      const dy  = to.y - from.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len === 0) return null;

      const nx = dx / len;
      const ny = dy / len;

      const x1 = from.x + nx * R;
      const y1 = from.y + ny * R;
      const x2 = to.x   - nx * (R + 6); // 6 = arrowhead offset
      const y2 = to.y   - ny * (R + 6);

      const isActive =
        step.activeEdge?.[0] === fromId && step.activeEdge?.[1] === toId;
      const isCycleEdge =
        step.hasCycle &&
        step.activeEdge?.[0] === fromId &&
        step.activeEdge?.[1] === toId;

      // Slight curve for back-edges
      const isBack = mode === 'DFS' && isCycleEdge;
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const perpX = -ny * 40;
      const perpY =  nx * 40;

      const strokeColor = isCycleEdge
        ? '#ef4444'
        : isActive
          ? '#f97316'
          : '#d1d5db';
      const strokeW = isActive || isCycleEdge ? 3 : 1.5;

      return (
        <g key={idx}>
          {isBack ? (
            <path
              d={`M${x1},${y1} Q${mx + perpX},${my + perpY} ${x2},${y2}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeW}
              markerEnd={isCycleEdge ? 'url(#arrow-red)' : isActive ? 'url(#arrow-orange)' : 'url(#arrow)'}
              className="transition-all duration-300"
            />
          ) : (
            <line
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={strokeColor}
              strokeWidth={strokeW}
              markerEnd={isCycleEdge ? 'url(#arrow-red)' : isActive ? 'url(#arrow-orange)' : 'url(#arrow)'}
              className="transition-all duration-300"
            />
          )}
        </g>
      );
    });
  }, [step, mode, nodes, edges]);

  const nodeElements = useMemo(() => {
    return nodes.map(node => {
      const style = mode === 'Kahn'
        ? getKahnNodeStyle(node.id, step as KahnStep)
        : getDFSNodeStyle(node.id, step as DFSTopoStep);

      const kahnStep = step as KahnStep;
      const showInDeg = mode === 'Kahn' && kahnStep.inDegree !== undefined;
      const inDeg = showInDeg ? kahnStep.inDegree[node.id] : null;
      const isDecreased = mode === 'Kahn' && (step as KahnStep).decreasedNode === node.id;

      const dfsStep = step as DFSTopoStep;
      const stackPos = mode === 'DFS' && dfsStep.stack.indexOf(node.id);

      const bx = node.x + R * 0.7;
      const by = node.y - R * 0.7;

      return (
        <g key={node.id} className="transition-all duration-300">
          {/* Main node circle */}
          <circle
            cx={node.x}
            cy={node.y}
            r={R}
            fill={style.fill}
            stroke={style.stroke}
            strokeWidth={2}
            className="transition-all duration-300"
          />

          {/* Label */}
          <text
            x={node.x}
            y={node.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={11}
            fontWeight="600"
            fill={style.textColor}
          >
            {node.label}
          </text>

          {/* In-degree badge (Kahn only) — drawn after node so it appears on top */}
          {showInDeg && inDeg !== null && (
            <>
              <circle
                cx={bx}
                cy={by}
                r={10}
                fill={isDecreased ? '#fbbf24' : inDeg === 0 ? '#22c55e' : '#6b7280'}
                className="transition-all duration-300"
              />
              <text
                x={bx}
                y={by}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={10}
                fontWeight="bold"
                fill="white"
              >
                {inDeg}
              </text>
            </>
          )}

          {/* DFS stack position badge — drawn after node so it appears on top */}
          {mode === 'DFS' && typeof stackPos === 'number' && stackPos >= 0 && (
            <>
              <circle
                cx={bx}
                cy={by}
                r={10}
                fill="#10b981"
              />
              <text
                x={bx}
                y={by}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={10}
                fontWeight="bold"
                fill="white"
              >
                {(step as DFSTopoStep).stack.length - stackPos}
              </text>
            </>
          )}
        </g>
      );
    });
  }, [step, mode, nodes]);

  return (
    <div className="w-full flex-1 flex items-center justify-center bg-muted/5 overflow-hidden">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-full"
        style={{ maxHeight: '100%' }}
      >
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#d1d5db" />
          </marker>
          <marker id="arrow-orange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#f97316" />
          </marker>
          <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#ef4444" />
          </marker>
        </defs>

        {edgeElements}
        {nodeElements}
      </svg>
    </div>
  );
}
