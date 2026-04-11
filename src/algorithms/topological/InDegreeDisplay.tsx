import type { KahnStep, TopoNode } from './types';

interface Props {
  step: KahnStep;
  nodes: TopoNode[];
}

export default function InDegreeDisplay({ step, nodes }: Props) {
  return (
    <div className="bg-card rounded-xl border p-4 shadow-sm flex flex-col gap-3">
      <h3 className="font-semibold text-sm">진입차수 (In-degree)</h3>

      <div className="flex flex-wrap gap-2">
        {nodes.map(node => {
          const deg = step.inDegree[node.id];
          const isDecreased = step.decreasedNode === node.id;
          const isZero      = deg === 0 && step.result.includes(node.id) === false;
          const isDone      = step.result.includes(node.id);

          let cellCls = 'bg-muted/40 text-muted-foreground';
          if (isDone)       cellCls = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300';
          else if (isDecreased) cellCls = 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 ring-2 ring-amber-400';
          else if (isZero)  cellCls = 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300';

          return (
            <div
              key={node.id}
              className={`flex flex-col items-center rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${cellCls}`}
            >
              <span className="text-[10px] font-normal opacity-70">{node.label}</span>
              <span className="text-lg font-bold leading-tight">{isDone ? '✓' : deg}</span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 text-[10px] text-muted-foreground flex-wrap">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-amber-200 border border-amber-400 inline-block" />
          방금 감소
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-sky-200 inline-block" />
          진입차수=0 (큐 대기)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-emerald-200 inline-block" />
          처리 완료
        </span>
      </div>
    </div>
  );
}
