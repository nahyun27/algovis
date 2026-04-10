import type { AStarStep } from './types';
import { Lock, Eye } from 'lucide-react';

export default function ScoreTable({ step }: { step: AStarStep }) {
  const N = step.f.length;

  return (
    <div className="bg-card rounded-xl border flex flex-col h-full shadow-sm text-sm">
      <div className="p-3 border-b bg-muted/30 font-semibold flex items-center justify-between">
        <span>A* Score Table (f = g + h)</span>
        <div className="flex gap-4 text-xs font-normal">
          <span className="flex items-center gap-1"><Eye size={14} className="text-blue-500" /> Open Set</span>
          <span className="flex items-center gap-1"><Lock size={14} className="text-zinc-500" /> Closed Set</span>
        </div>
      </div>
      
      <div className="p-4 overflow-x-auto custom-scrollbar flex-1">
        <table className="w-full text-center border-collapse min-w-[400px]">
          <thead>
            <tr>
              <th className="p-2 font-medium text-muted-foreground border-b border-r w-24">Node</th>
              {Array.from({ length: N }).map((_, i) => (
                <th key={i} className={`p-2 font-bold border-b ${
                  step.currentProcessingNode === i ? 'bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : ''
                }`}>
                  <div className="flex items-center justify-center gap-1">
                    {i}
                    {step.closedSet.includes(i) ? (
                      <Lock size={12} className="text-zinc-400" />
                    ) : step.openSet.includes(i) ? (
                      <Eye size={12} className="text-blue-500" />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* g(x) row */}
            <tr>
              <td className="p-2 font-medium text-blue-600 dark:text-blue-400 border-r border-b">g(x)</td>
              {step.g.map((val, i) => (
                <td key={i} className={`p-2 border-b ${
                  step.currentProcessingNode === i ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                } ${
                  step.isImprovement && step.activeEdge && step.activeEdge[1] === i
                    ? 'text-green-600 font-bold dark:text-green-400'
                    : 'text-muted-foreground'
                }`}>
                  {val === Infinity ? '∞' : val}
                </td>
              ))}
            </tr>
            {/* h(x) row */}
            <tr>
              <td className="p-2 font-medium text-orange-600 dark:text-orange-400 border-r border-b">h(x)</td>
              {step.h.map((val, i) => (
                <td key={i} className={`p-2 border-b ${
                  step.currentProcessingNode === i ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                } text-muted-foreground`}>
                  {val === Infinity ? '∞' : val}
                </td>
              ))}
            </tr>
            {/* f(x) row */}
            <tr>
              <td className="p-2 font-bold text-purple-600 dark:text-purple-400 border-r">f(x)</td>
              {step.f.map((val, i) => (
                <td key={i} className={`p-2 font-semibold ${
                  step.currentProcessingNode === i ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                } ${
                  step.isImprovement && step.activeEdge && step.activeEdge[1] === i
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-foreground'
                }`}>
                  {val === Infinity ? '∞' : val}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Legend / Status */}
      <div className="p-3 border-t bg-muted/10 text-xs text-muted-foreground">
        • <strong className="text-blue-600 dark:text-blue-400">g(x)</strong>: 출발점에서 노드까지의 실 탐색 비용<br/>
        • <strong className="text-orange-600 dark:text-orange-400">h(x)</strong>: 노드에서 도착점까지의 예상 비용 (휴리스틱)<br/>
        • <strong className="text-purple-600 dark:text-purple-400">f(x)</strong>: 총 예상 비용 (g + h)
      </div>
    </div>
  );
}
