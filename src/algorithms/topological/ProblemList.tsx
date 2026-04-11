const PROBLEMS = [
  {
    num: '2252',
    title: '줄 세우기',
    difficulty: 'Gold III',
    url: 'https://www.acmicpc.net/problem/2252',
    desc: '기본 위상정렬',
  },
  {
    num: '1005',
    title: 'ACM Craft',
    difficulty: 'Gold III',
    url: 'https://www.acmicpc.net/problem/1005',
    desc: '위상정렬 + DP',
  },
  {
    num: '1516',
    title: '게임 개발',
    difficulty: 'Gold III',
    url: 'https://www.acmicpc.net/problem/1516',
    desc: '위상정렬 + DP',
  },
  {
    num: '2623',
    title: '음악프로그램',
    difficulty: 'Gold III',
    url: 'https://www.acmicpc.net/problem/2623',
    desc: '위상정렬 응용',
  },
];

const diffColor: Record<string, string> = {
  'Gold III':   'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'Gold IV':    'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
};

export default function TopoProblemList() {
  return (
    <div className="border rounded-xl bg-card shadow-sm overflow-hidden flex flex-col flex-shrink-0">
      <div className="p-3 border-b bg-muted/30">
        <h2 className="font-semibold tracking-tight text-sm">관련 백준 문제</h2>
      </div>
      <div className="divide-y">
        {PROBLEMS.map(p => (
          <a
            key={p.num}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors group"
          >
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
