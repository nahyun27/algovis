import { ExternalLink } from 'lucide-react';

const PROBLEMS = [
  { id: 10971, title: '외판원 순회 2', tier: 'Silver II', nLimit: 'N ≤ 10', note: 'O(N!) 완전탐색 가능' },
  { id: 2098, title: '외판원 순회', tier: 'Gold I', nLimit: 'N ≤ 16', note: 'O(N² 2^N) DP 필수' },
  { id: 16991, title: '외판원 순회 3', tier: 'Gold I', nLimit: 'N ≤ 16', note: 'O(N² 2^N) 좌표 거리 DP' },
];

export default function TSPProblemList() {
  return (
    <div className="flex flex-col min-h-[320px]">
      <div className="p-4 flex-shrink-0">
        <h2 className="font-bold tracking-tight text-sm flex items-center gap-2 text-foreground/90">
          <span className="w-1 h-4 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
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
                  <span className="font-bold text-sm tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{prob.title}</span>
                </div>
                <a href={`https://acmicpc.net/problem/${prob.id}`} target="_blank" rel="noreferrer" className="text-muted-foreground/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1 rounded-md hover:bg-indigo-500/10">
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
                <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md font-bold border border-indigo-500/10">
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
