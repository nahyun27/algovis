import { useMemo, useState } from 'react';
import type { GridMap, GridStep, GridPos } from './gridTypes';
import { INF } from './gridTypes';

interface Props {
  map: GridMap;
  step: GridStep;
  showScores: boolean;
  onCellMouseDown?: (r: number, c: number, e: React.MouseEvent) => void;
  onCellMouseEnter?: (r: number, c: number, e: React.MouseEvent) => void;
  onCellMouseUp?: () => void;
  editable?: boolean;
}

function posEquals(a: GridPos | null, b: GridPos | null): boolean {
  if (!a || !b) return false;
  return a.r === b.r && a.c === b.c;
}

export default function GridCanvas({ map, step, showScores, onCellMouseDown, onCellMouseEnter, onCellMouseUp, editable }: Props) {
  const { rows, cols, walls, start, goal } = map;
  const [hoverCell, setHoverCell] = useState<GridPos | null>(null);

  const openSet = useMemo(() => new Set(step.openSet.map(p => `${p.r},${p.c}`)), [step.openSet]);
  const closedSet = useMemo(() => new Set(step.closedSet.map(p => `${p.r},${p.c}`)), [step.closedSet]);
  const pathSet = useMemo(() => new Set(step.path.map(p => `${p.r},${p.c}`)), [step.path]);

  const getCellStyle = (r: number, c: number): string => {
    const key = `${r},${c}`;
    const isStart = r === start.r && c === start.c;
    const isGoal = r === goal.r && c === goal.c;
    const isCurrent = posEquals(step.currentCell, { r, c });
    const isNeighbor = posEquals(step.neighborCell, { r, c });
    const inPath = pathSet.has(key);

    if (walls[r][c]) return 'bg-zinc-700 dark:bg-zinc-900 border-zinc-800 dark:border-zinc-950';
    if (inPath) return 'bg-yellow-300 dark:bg-yellow-500/70 border-yellow-500 dark:border-yellow-400 relative z-10';
    if (isStart) return 'bg-emerald-500 border-emerald-700 dark:border-emerald-400';
    if (isGoal) return 'bg-rose-500 border-rose-700 dark:border-rose-400';
    if (isCurrent) return 'bg-blue-400 dark:bg-blue-500 border-blue-600 dark:border-blue-300 ring-2 ring-blue-400 ring-offset-1 relative z-20';
    if (isNeighbor) return 'bg-sky-300 dark:bg-sky-600 border-sky-500 relative z-10';
    if (closedSet.has(key)) return 'bg-orange-200 dark:bg-orange-900/40 border-orange-300 dark:border-orange-700';
    if (openSet.has(key)) return 'bg-sky-100 dark:bg-sky-900/30 border-sky-200 dark:border-sky-800';
    return 'bg-card border-border/40 hover:bg-muted/40';
  };

  const getCellText = (r: number, c: number) => {
    if (walls[r][c]) return null;
    if (r === start.r && c === start.c) return <span className="text-white font-bold text-[10px] sm:text-xs">S</span>;
    if (r === goal.r && c === goal.c) return <span className="text-white font-bold text-[10px] sm:text-xs">G</span>;
    if (!showScores) return null;
    const gv = step.g[r][c];
    const fv = step.f[r][c];
    if (gv >= INF) return null;
    return (
      <div className="text-[7px] sm:text-[8px] leading-[8px] sm:leading-[9px] font-mono text-center pointer-events-none">
        <div className="text-zinc-600 dark:text-zinc-300">g{gv}</div>
        <div className="text-zinc-500 dark:text-zinc-400">f{fv >= INF ? '∞' : fv}</div>
      </div>
    );
  };

  return (
    <div
      className="inline-block select-none"
      onMouseLeave={() => { onCellMouseUp?.(); setHoverCell(null); }}
      onMouseUp={onCellMouseUp}
    >
      <div className="grid gap-px bg-border/40 p-1 rounded-md" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => (
            <div
              key={`${r}-${c}`}
              onMouseDown={(e) => onCellMouseDown?.(r, c, e)}
              onMouseEnter={(e) => { setHoverCell({ r, c }); onCellMouseEnter?.(r, c, e); }}
              className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 border flex items-center justify-center transition-colors duration-150 ${editable ? 'cursor-pointer' : ''} ${getCellStyle(r, c)}`}
            >
              {getCellText(r, c)}
              {hoverCell?.r === r && hoverCell?.c === c && editable && (
                <div className="absolute inset-0 pointer-events-none" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
