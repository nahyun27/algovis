import { motion } from 'framer-motion';
import type { PrimStep } from './types';
import { INF } from './types';

interface Props {
  step: PrimStep;
  N: number;
}

export default function PrimKeyTable({ step, N }: Props) {
  const { key, parent, visited, type, updatedNode, currentNode } = step;
  const nodes = Array.from({ length: N }, (_, i) => i);

  return (
    <div className="h-full overflow-auto p-1">

      {/* Key / Parent table */}
      <div className="border rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
        <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
          <h3 className="font-semibold text-sm">Key / Parent 배열</h3>
          <span className="text-[10px] text-muted-foreground font-mono">시작 노드: 0</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate [border-spacing:0]">
            <thead>
              <tr className="bg-muted/20 border-b">
                <th className="px-3 py-2 text-left text-xs text-muted-foreground font-semibold">노드</th>
                {nodes.map(i => (
                  <th key={i} className="px-4 py-2 text-center text-xs font-semibold text-muted-foreground min-w-[56px]">{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* key[] row */}
              <tr>
                <td className="px-3 py-3 text-xs font-semibold text-muted-foreground">key</td>
                {nodes.map(i => {
                  const isUpdated   = type === 'UPDATE' && updatedNode === i;
                  const isConfirmed = visited[i];
                  const isCurr      = currentNode === i && !isConfirmed;
                  let cellClass = '';
                  if (isConfirmed)     cellClass = 'bg-emerald-100 dark:bg-emerald-900/30';
                  else if (isUpdated)  cellClass = 'bg-yellow-100 dark:bg-yellow-900/40';
                  else if (isCurr)     cellClass = 'bg-blue-50 dark:bg-blue-900/20';

                  return (
                    <td key={i} className={`px-4 py-3 text-center font-mono font-bold text-sm border-l transition-colors duration-300 ${cellClass}`}>
                      <motion.span
                        key={`k-${i}-${key[i]}`}
                        initial={isUpdated ? { scale: 1.35 } : { scale: 1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={
                          isConfirmed ? 'text-emerald-700 dark:text-emerald-300' :
                          isUpdated   ? 'text-yellow-700 dark:text-yellow-300' :
                          isCurr      ? 'text-blue-700 dark:text-blue-300' : ''
                        }
                      >
                        {key[i] >= INF ? '∞' : key[i]}
                      </motion.span>
                    </td>
                  );
                })}
              </tr>

              {/* parent[] row */}
              <tr className="border-t">
                <td className="px-3 py-2 text-xs font-semibold text-muted-foreground">parent</td>
                {nodes.map(i => (
                  <td key={i} className="px-4 py-2 text-center text-xs border-l font-mono">
                    <span className={visited[i] ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-muted-foreground'}>
                      {parent[i] === -1 ? '—' : parent[i]}
                    </span>
                  </td>
                ))}
              </tr>

              {/* MST confirmed row */}
              <tr className="border-t">
                <td className="px-3 py-2 text-xs font-semibold text-muted-foreground">MST</td>
                {nodes.map(i => (
                  <td key={i} className="px-4 py-2 text-center text-xs border-l">
                    {visited[i]
                      ? <span className="inline-block w-4 h-4 rounded-full bg-emerald-500 mx-auto" title="MST 확정" />
                      : <span className="inline-block w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-700 mx-auto" title="미확정" />
                    }
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        {/* Legend */}
        <div className="px-3 pb-2 pt-1 flex gap-3 text-[10px] text-muted-foreground flex-wrap mt-auto">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-200 dark:bg-emerald-800 inline-block" />MST 확정</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-yellow-200 dark:bg-yellow-800 inline-block" />방금 갱신</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-blue-100 dark:bg-blue-900 inline-block" />현재 처리 중</span>
        </div>
      </div>
    </div>
  );
}
