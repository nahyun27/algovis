const PROBLEMS = [
  { num: '1197', title: '최소 스패닝 트리', difficulty: 'Gold IV', url: 'https://www.acmicpc.net/problem/1197', desc: '기본 크루스칼 / 프림' },
  { num: '1922', title: '네트워크 연결',     difficulty: 'Gold IV', url: 'https://www.acmicpc.net/problem/1922', desc: '크루스칼 + Union-Find' },
  { num: '4386', title: '별자리 만들기',     difficulty: 'Gold III', url: 'https://www.acmicpc.net/problem/4386', desc: '좌표 MST' },
  { num: '1647', title: '도시 분할 계획',   difficulty: 'Gold II',  url: 'https://www.acmicpc.net/problem/1647', desc: 'MST 변형 (두 마을 분리)' },
];

const diffColor: Record<string, string> = {
  'Gold II':  'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'Gold III': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'Gold IV':  'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
};

export default function KruskalProblemList() {
  return (
    <div className="border rounded-xl bg-card shadow-sm overflow-hidden flex flex-col flex-shrink-0">
      <div className="p-3 border-b bg-muted/30">
        <h2 className="font-semibold tracking-tight text-sm">관련 백준 문제</h2>
      </div>
      <div className="divide-y">
        {PROBLEMS.map(p => (
          <a key={p.num} href={p.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors group">
            <span className="text-xs font-mono text-muted-foreground w-10 shrink-0">#{p.num}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">{p.title}</p>
              <p className="text-[11px] text-muted-foreground">{p.desc}</p>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${diffColor[p.difficulty] ?? 'bg-muted text-muted-foreground'}`}>
              {p.difficulty}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
