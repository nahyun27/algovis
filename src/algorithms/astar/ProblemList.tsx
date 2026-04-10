import { ExternalLink } from 'lucide-react';

const PROBLEMS = [
  { id: 1504,  title: '특정한 최단 경로', tier: 'Gold IV',  nLimit: 'N ≤ 800', note: '다익스트라/A* 기초 응용' },
  { id: 1238,  title: '파티',            tier: 'Gold III', nLimit: 'N ≤ 1,000', note: '방향 그래프 최단경로' },
  { id: 9370,  title: '미확인 도착지',    tier: 'Gold II',  nLimit: 'N ≤ 2,000', note: '최단경로 역추적' },
];

export default function ProblemList() {
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
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold tracking-wide border
                  ${prob.tier.startsWith('Platinum')
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                    : prob.tier.startsWith('Gold')
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
                >
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
