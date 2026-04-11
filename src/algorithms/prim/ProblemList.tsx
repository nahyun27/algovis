import { ExternalLink } from 'lucide-react';

const PROBLEMS = [
  { id: 1197, title: '최소 스패닝 트리', tier: 'Gold IV',  nLimit: 'V,E ≤ 10,000', note: '크루스칼 / 프림 둘 다 가능' },
  { id: 1922, title: '네트워크 연결',     tier: 'Gold IV',  nLimit: 'N ≤ 1,000',     note: '프림 또는 크루스칼' },
  { id: 9372, title: '상근이의 여행',     tier: 'Gold V',   nLimit: 'T,N ≤ 1,000',   note: 'MST 간선 수 = N-1' },
  { id: 4386, title: '별자리 만들기',     tier: 'Gold III', nLimit: 'N ≤ 100',        note: '좌표 MST' },
];

export default function PrimProblemList() {
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
                  <a
                    href={`https://acmicpc.net/problem/${prob.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold tracking-wide border ${
                  prob.tier.startsWith('Gold')
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}>
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
