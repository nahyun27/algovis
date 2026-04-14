import { ExternalLink } from 'lucide-react';

const PROBLEMS = [
  { id: 1260, title: 'DFS와 BFS',       tier: 'Silver II', nLimit: 'N ≤ 1,000', note: '가장 기본적인 구현' },
  { id: 2178, title: '미로 탐색',       tier: 'Silver I',  nLimit: 'N,M ≤ 100', note: 'BFS(최단경로)' },
  { id: 1012, title: '유기농 배추',     tier: 'Silver II', nLimit: 'T, N ≤ 50', note: 'DFS/BFS 연결요소 탐색' },
  { id: 2667, title: '단지번호붙이기',  tier: 'Silver I',  nLimit: 'N ≤ 25',    note: '방문 영역 넓이 구하기' },
];

export default function BFSDFSProblemList() {
  return (
    <div className="flex flex-col min-h-[320px]">
      <div className="p-4 flex-shrink-0">
        <h2 className="font-bold tracking-tight text-sm flex items-center gap-2 text-foreground/90">
          <span className="w-1 h-4 bg-sky-500 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
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
                  <span className="font-bold text-sm tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{prob.title}</span>
                </div>
                <a href={`https://acmicpc.net/problem/${prob.id}`} target="_blank" rel="noreferrer" className="text-muted-foreground/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors p-1 rounded-md hover:bg-sky-500/10">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold border shadow-sm ${
                  prob.tier.startsWith('Gold')
                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20'
                    : prob.tier.startsWith('Silver')
                    ? 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                }`}>
                  {prob.tier}
                </span>
                <span className="text-[10px] bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-md font-bold border border-sky-500/10">
                  {prob.nLimit}
                </span>
                {prob.note && (
                  <span className="text-[10px] bg-muted/40 text-muted-foreground px-2 py-0.5 rounded-md font-medium border border-border/10">
                    {prob.note}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
