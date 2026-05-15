import { ExternalLink } from 'lucide-react';

const PROBLEMS = [
  { id: 1261, title: '알고스팟',         tier: 'Gold IV',  nLimit: 'N,M ≤ 100',     note: '0-1 BFS (벽 부수기)' },
  { id: 3055, title: '탈출',             tier: 'Gold IV',  nLimit: 'R,C ≤ 50',      note: 'BFS 격자 탐색' },
  { id: 1600, title: '말이 되고픈 원숭이', tier: 'Gold III', nLimit: 'W,H ≤ 200',     note: '상태 확장 BFS' },
  { id: 1753, title: '최단경로',         tier: 'Gold IV',  nLimit: 'V ≤ 20,000',    note: 'A* 적용 가능' },
];

export default function GridAStarProblemList() {
  return (
    <div className="border rounded-xl bg-card shadow-sm overflow-hidden flex flex-col min-h-64">
      <div className="p-3 border-b bg-muted/30 flex-shrink-0">
        <h2 className="font-semibold tracking-tight text-sm">Related Problems (BOJ)</h2>
      </div>
      <div className="p-0 overflow-y-auto">
        <ul className="divide-y divide-border">
          {PROBLEMS.map(prob => (
            <li key={prob.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm bg-muted/50 px-1 rounded">{prob.id}</span>
                  <span className="font-semibold text-sm">{prob.title}</span>
                  <a href={`https://acmicpc.net/problem/${prob.id}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-bold tracking-wide border bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
                  {prob.tier}
                </span>
              </div>
              <div className="flex gap-2 mt-2 text-xs font-medium text-muted-foreground">
                <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded shadow-sm">{prob.nLimit}</span>
                <span className="bg-muted px-1.5 py-0.5 rounded shadow-sm">{prob.note}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
