import type { FloydWarshallStep } from './types';
import { INF, FW_N } from './types';

interface Props {
  step: FloydWarshallStep;
}

const iStr = (v: number) => (v >= INF ? '∞' : String(v));

export default function FWDistMatrix({ step }: Props) {
  const { distMatrix, currentK, currentI, currentJ, isUpdate, prevVal, newVal, type } = step;
  const N = FW_N;
  const isDone = type === 'DONE';
  const isNegCycle = type === 'NEGATIVE_CYCLE';
  const isRoundStart = type === 'ROUND_START';

  // Build formula string for current step
  const formula = (() => {
    if (currentK === null || currentI === null || currentJ === null) return null;
    const d_ik = distMatrix[currentI]?.[currentK];
    const d_kj = distMatrix[currentK]?.[currentJ];
    if (d_ik === undefined || d_kj === undefined) return null;
    if (isUpdate && prevVal !== null && newVal !== null) {
      return `경유 노드 k=${currentK}: dist[${currentI}][${currentJ}] = min(${iStr(prevVal)}, ${d_ik}+${d_kj}) = ${newVal} 로 갱신`;
    }
    if (!isUpdate && prevVal !== null && newVal !== null) {
      return `경유 노드 k=${currentK}: dist[${currentI}][${currentJ}] = min(${iStr(prevVal)}, ${d_ik}+${d_kj}) = ${iStr(prevVal)}, 변화 없음`;
    }
    return null;
  })();

  return (
    <div className="flex flex-col gap-3">
      {/* Formula / status banner */}
      {formula && (
        <div className={`text-xs font-mono font-semibold px-4 py-2 rounded-lg border text-center transition-colors ${
          isUpdate
            ? 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300'
            : 'bg-muted/40 border-border text-muted-foreground'
        }`}>
          {formula}
        </div>
      )}
      {isRoundStart && currentK !== null && (
        <div className="text-xs font-mono font-semibold px-4 py-2 rounded-lg border text-center bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-800 text-violet-800 dark:text-violet-300">
          경유 노드 k = {currentK} 라운드 시작 — 보라색 행/열이 경유 노드에 해당합니다
        </div>
      )}

      {/* Matrix table */}
      <div className="border rounded-xl overflow-hidden shadow-sm">
        <div className="p-2.5 border-b bg-muted/30 flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-semibold text-sm">거리 행렬 dist[i][j]</h3>
          <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
            <span className="px-1.5 py-0.5 rounded bg-muted/50">O(V³) 시간</span>
            <span className="px-1.5 py-0.5 rounded bg-muted/50">O(V²) 공간</span>
            {currentK !== null && (
              <span className={`px-2 py-0.5 rounded-full font-bold border ${
                isDone
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                  : isNegCycle
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-300 dark:border-red-700'
                    : 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 border-violet-300 dark:border-violet-700'
              }`}>
                {isNegCycle ? '음수 사이클!' : isDone ? '완료' : `k = ${currentK}`}
              </span>
            )}
            {isDone && (
              <span className="px-2 py-0.5 rounded-full font-bold border bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700">완료</span>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="text-sm w-full">
            <thead>
              <tr className="bg-muted/20 border-b">
                {/* Top-left corner */}
                <th className="px-3 py-2 text-xs font-semibold text-muted-foreground text-center min-w-[44px]">
                  <span className="text-blue-500 dark:text-blue-400">i</span>
                  <span className="text-muted-foreground/50">╲</span>
                  <span className="text-orange-500 dark:text-orange-400">j</span>
                </th>
                {Array.from({ length: N }, (_, j) => {
                  const isKCol = j === currentK;
                  return (
                    <th key={j} className={`px-3 py-2 text-center text-xs font-semibold min-w-[52px] transition-colors ${
                      isKCol
                        ? 'text-violet-600 dark:text-violet-400 bg-violet-50/60 dark:bg-violet-900/20'
                        : 'text-muted-foreground'
                    }`}>
                      {j}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {distMatrix.map((row, i) => {
                const isKRow = i === currentK;
                return (
                  <tr key={i} className={isKRow ? 'bg-violet-50/40 dark:bg-violet-900/10' : ''}>
                    {/* Row header */}
                    <td className={`px-3 py-2.5 text-center text-xs font-semibold border-r transition-colors ${
                      isKRow
                        ? 'text-violet-600 dark:text-violet-400 bg-violet-50/60 dark:bg-violet-900/20'
                        : 'text-muted-foreground'
                    }`}>
                      {i}
                    </td>
                    {row.map((val, j) => {
                      const isDiag = i === j;
                      const isActiveCell = i === currentI && j === currentJ;
                      const isKCol = j === currentK;

                      let cellClass = '';
                      let textClass = 'font-mono font-bold text-sm';

                      if (isDiag) {
                        cellClass = 'bg-zinc-100/80 dark:bg-zinc-800/50';
                        textClass += ' text-zinc-400 dark:text-zinc-600';
                      } else if (isActiveCell && isUpdate) {
                        cellClass = 'bg-yellow-100 dark:bg-yellow-900/40 ring-2 ring-inset ring-yellow-400 dark:ring-yellow-600';
                        textClass += ' text-yellow-800 dark:text-yellow-200';
                      } else if (isActiveCell) {
                        cellClass = 'ring-2 ring-inset ring-blue-400 dark:ring-blue-600';
                        textClass += ' text-blue-700 dark:text-blue-300';
                      } else if (isDone && val < INF) {
                        cellClass = 'bg-emerald-50 dark:bg-emerald-900/20';
                        textClass += ' text-emerald-700 dark:text-emerald-300';
                      } else if (isNegCycle) {
                        cellClass = 'bg-red-50/60 dark:bg-red-900/20';
                        textClass += ' text-red-600 dark:text-red-400';
                      } else if (isKRow || isKCol) {
                        cellClass = 'bg-violet-50/30 dark:bg-violet-900/10';
                        textClass += val >= INF ? ' text-muted-foreground/50' : '';
                      } else {
                        textClass += val >= INF ? ' text-muted-foreground/50' : '';
                      }

                      return (
                        <td key={j}
                          className={`px-3 py-2.5 text-center border-l transition-colors duration-300 ${cellClass}`}>
                          <div className="flex flex-col items-center">
                            <span className={textClass}>{iStr(val)}</span>
                            {/* Show prev value crossed out for updated cell */}
                            {isActiveCell && isUpdate && prevVal !== null && (
                              <span className="text-[10px] text-zinc-400 dark:text-zinc-600 line-through font-mono">
                                {iStr(prevVal)}
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Negative cycle warning */}
      {isNegCycle && (
        <div className="border border-red-300 dark:border-red-700 rounded-xl p-4 bg-red-50 dark:bg-red-900/20 text-sm text-red-700 dark:text-red-300">
          <div className="font-bold mb-1">⚠️ 음수 사이클 감지됨</div>
          <p className="text-[12px] leading-relaxed">
            대각선 dist[i][i] &lt; 0인 노드가 존재합니다. 해당 노드를 포함하는 사이클의 가중치 합이 음수입니다.
            이 경우 최단 경로가 -∞로 수렴하므로 정의되지 않습니다.
          </p>
        </div>
      )}

      {/* Done legend */}
      {isDone && (
        <div className="border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 bg-emerald-50 dark:bg-emerald-900/20 text-[12px] text-emerald-700 dark:text-emerald-300 font-medium text-center">
          모든 쌍 최단거리 계산 완료 — 위 행렬에서 원하는 출발·도착 노드를 골라 최단 경로를 확인하세요
        </div>
      )}
    </div>
  );
}
