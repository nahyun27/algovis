import { ExternalLink } from 'lucide-react';

const PROBLEMS = [
  { id: 1197, title: '최소 스패닝 트리', tier: 'Gold IV',  nLimit: 'V,E ≤ 10,000', note: '크루스칼 / 프림 둘 다 가능' },
  { id: 1922, title: '네트워크 연결',     tier: 'Gold IV',  nLimit: 'N ≤ 1,000',     note: '프림 또는 크루스칼' },
  { id: 9372, title: '상근이의 여행',     tier: 'Gold V',   nLimit: 'T,N ≤ 1,000',   note: 'MST 간선 수 = N-1' },
  { id: 4386, title: '별자리 만들기',     tier: 'Gold III', nLimit: 'N ≤ 100',        note: '좌표 MST' },
];

export default function PrimProblemList() {
  return (
    <div className="flex flex-col min-h-[320px]">
      <div className="p-4 flex-shrink-0">
        <h2 className="font-bold tracking-tight text-sm flex items-center gap-2 text-foreground/90">
          <span className="w-1 h-4 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          Related Problems (BOJ)
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <ul className="">
          {PROBLEMS.map(prob => (
            <li key={prob.id} className="p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-all group cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold bg-muted/60 text-muted-foreground px-1.5 py-0.5 rounded uppercase tracking-wider">#{prob.id}</span>
                  <span className="font-bold text-sm tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{prob.title}</span>
                </div>
                <a href={`https://acmicpc.net/problem/${prob.id}`} target="_blank" rel="noreferrer" className="text-muted-foreground/40 hover:text-amber-600 dark:hover:text-amber-400 transition-colors p-1 rounded-md hover:bg-amber-500/10">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold border shadow-sm ${
                  prob.tier.startsWith('Gold')
                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20'
                    : 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20'
                }`}>
                  {prob.tier}
                </span>
                <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md font-bold border border-amber-500/10">
                  {prob.nLimit}
                </span>
                <span className="text-[10px] bg-muted/40 text-muted-foreground px-2 py-0.5 rounded-md font-medium border border-border/10">
                  {prob.note}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
