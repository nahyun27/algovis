import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

type Paradigm    = "DP" | "Greedy" | "탐색";
type ProblemType = "최단경로" | "그래프 탐색" | "최적화";

interface AlgoCard {
  id: string;
  name: string;
  korName: string;
  slug: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  paradigm: Paradigm;
  problemType: ProblemType;
  timeComplexity: string;
  spaceComplexity: string;
  comingSoon?: boolean;
}

const ALGORITHMS: AlgoCard[] = [
  {
    id: "tsp",
    name: "Traveling Salesperson",
    korName: "외판원 순회 (TSP)",
    slug: "tsp",
    description: "모든 도시를 한 번씩 방문하고 출발지로 돌아오는 최단 경로를 비트마스크 DP로 탐색합니다.",
    difficulty: "Hard",
    paradigm: "DP",
    problemType: "최적화",
    timeComplexity: "O(N² · 2ᴺ)",
    spaceComplexity: "O(N · 2ᴺ)",
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    korName: "다익스트라",
    slug: "dijkstra",
    description: "음수 가중치가 없는 그래프에서 단일 시작점 최단 경로를 우선순위 큐로 구합니다.",
    difficulty: "Medium",
    paradigm: "Greedy",
    problemType: "최단경로",
    timeComplexity: "O((V+E) log V)",
    spaceComplexity: "O(V)",
  },
  {
    id: "astar",
    name: "A* Search",
    korName: "A* 탐색",
    slug: "astar",
    description: "휴리스틱 함수를 이용해 목표 노드까지의 최단 경로를 효율적으로 탐색합니다.",
    difficulty: "Medium",
    paradigm: "Greedy",
    problemType: "최단경로",
    timeComplexity: "O(E log V)",
    spaceComplexity: "O(V)",
  },
  {
    id: "bfsdfs",
    name: "BFS / DFS",
    korName: "너비/깊이 우선 탐색",
    slug: "bfsdfs",
    description: "그래프를 층별(BFS) 또는 경로별(DFS)로 탐색하는 가장 기본적인 알고리즘입니다.",
    difficulty: "Easy",
    paradigm: "탐색",
    problemType: "그래프 탐색",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
  },
  {
    id: "bellmanford",
    name: "Bellman-Ford",
    korName: "벨만-포드",
    slug: "bellmanford",
    description: "음수 간선이 있는 그래프의 단일 출발점 최단 경로를 구하고 음수 사이클을 감지합니다.",
    difficulty: "Medium",
    paradigm: "DP",
    problemType: "최단경로",
    timeComplexity: "O(V·E)",
    spaceComplexity: "O(V)",
  },
  {
    id: "floydwarshall",
    name: "Floyd-Warshall",
    korName: "플로이드-워셜",
    slug: "floyd-warshall",
    description: "모든 노드 쌍의 최단거리를 3중 반복문 DP로 구합니다. 음수 간선 처리 및 음수 사이클 감지 가능.",
    difficulty: "Medium",
    paradigm: "DP",
    problemType: "최단경로",
    timeComplexity: "O(V³)",
    spaceComplexity: "O(V²)",
  },
];

const PARADIGMS: Paradigm[]    = ["DP", "Greedy", "탐색"];
const PROBLEM_TYPES: ProblemType[] = ["최단경로", "그래프 탐색", "최적화"];

const difficultyStyles = {
  Easy:   "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300",
  Medium: "bg-amber-100  text-amber-800  dark:bg-amber-900/50  dark:text-amber-300",
  Hard:   "bg-rose-100   text-rose-800   dark:bg-rose-900/50   dark:text-rose-300",
};

const paradigmTagStyles: Record<Paradigm, string> = {
  DP:     "bg-sky-100    text-sky-700    dark:bg-sky-900/40    dark:text-sky-300",
  Greedy: "bg-amber-100  text-amber-700  dark:bg-amber-900/40  dark:text-amber-300",
  탐색:   "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
};

const paradigmBtnActive: Record<Paradigm, string> = {
  DP:     "bg-sky-500    text-white border-sky-500",
  Greedy: "bg-amber-500  text-white border-amber-500",
  탐색:   "bg-violet-500 text-white border-violet-500",
};

const problemTypeTagStyles: Record<ProblemType, string> = {
  최단경로:    "bg-blue-50   text-blue-600   dark:bg-blue-900/20   dark:text-blue-400",
  "그래프 탐색": "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  최적화:     "bg-orange-50  text-orange-600  dark:bg-orange-900/20  dark:text-orange-400",
};

const problemTypeBtnActive: Record<ProblemType, string> = {
  최단경로:    "bg-blue-500   text-white border-blue-500",
  "그래프 탐색": "bg-purple-500 text-white border-purple-500",
  최적화:     "bg-orange-500  text-white border-orange-500",
};

export default function Home() {
  const [query, setQuery]               = useState("");
  const [activeParadigms, setActiveParadigms] = useState<Set<Paradigm>>(new Set());
  const [activeTypes, setActiveTypes]   = useState<Set<ProblemType>>(new Set());

  function toggleParadigm(p: Paradigm) {
    setActiveParadigms(prev => {
      const next = new Set(prev);
      next.has(p) ? next.delete(p) : next.add(p);
      return next;
    });
  }

  function toggleType(t: ProblemType) {
    setActiveTypes(prev => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  }

  function resetFilters() {
    setQuery("");
    setActiveParadigms(new Set());
    setActiveTypes(new Set());
  }

  const hasActiveFilters = query !== "" || activeParadigms.size > 0 || activeTypes.size > 0;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return ALGORITHMS.filter(a => {
      const matchQ        = a.name.toLowerCase().includes(q) || a.korName.toLowerCase().includes(q);
      const matchParadigm = activeParadigms.size === 0 || activeParadigms.has(a.paradigm);
      const matchType     = activeTypes.size === 0    || activeTypes.has(a.problemType);
      return matchQ && matchParadigm && matchType;
    });
  }, [query, activeParadigms, activeTypes]);

  return (
    <div className="space-y-10">
      {/* ── Hero ── */}
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase bg-white/20 rounded-full px-3 py-1">
            Algorithm Visualizer
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">AlgoVis</h1>
          <p className="mt-3 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
            복잡한 알고리즘을 한 단계씩 눈으로 이해하는 인터랙티브 시각화 플랫폼
          </p>
          <div className="mt-5 flex gap-3 flex-wrap text-sm font-medium text-white/70">
            <span>✦ 단계별 재생 제어</span>
            <span>✦ Top-down / Bottom-up 비교</span>
            <span>✦ 실시간 DP 테이블</span>
          </div>
        </div>
      </section>

      {/* ── Search + Filters ── */}
      <div className="flex flex-col gap-3">
        {/* Search + Reset row */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="알고리즘 검색..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-3 py-2 rounded-lg text-xs font-semibold border border-border bg-card text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
            >
              초기화
            </button>
          )}
        </div>

        {/* Paradigm filter row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide w-16 shrink-0">패러다임</span>
          <button
            onClick={() => setActiveParadigms(new Set())}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              activeParadigms.size === 0
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-border hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            All
          </button>
          {PARADIGMS.map(p => (
            <button
              key={p}
              onClick={() => toggleParadigm(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                activeParadigms.has(p)
                  ? paradigmBtnActive[p]
                  : "bg-card text-muted-foreground border-border hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Problem type filter row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide w-16 shrink-0">문제 유형</span>
          <button
            onClick={() => setActiveTypes(new Set())}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              activeTypes.size === 0
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-border hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            All
          </button>
          {PROBLEM_TYPES.map(t => (
            <button
              key={t}
              onClick={() => toggleType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                activeTypes.has(t)
                  ? problemTypeBtnActive[t]
                  : "bg-card text-muted-foreground border-border hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map(algo => {
          const card = (
            <div
              className={`group flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm p-5 transition-all duration-200 ${
                algo.comingSoon
                  ? "opacity-50 cursor-not-allowed select-none"
                  : "hover:-translate-y-1 hover:shadow-md hover:border-primary/40 cursor-pointer"
              }`}
            >
              {/* Top row: paradigm tag + problem type tag + coming soon */}
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${paradigmTagStyles[algo.paradigm]}`}>
                  {algo.paradigm}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${problemTypeTagStyles[algo.problemType]}`}>
                  {algo.problemType}
                </span>
                {algo.comingSoon && (
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 dark:bg-accent dark:text-muted-foreground">
                    Coming Soon
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="font-bold text-base leading-tight">{algo.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 mb-3">{algo.korName}</p>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-3">
                {algo.description}
              </p>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t flex items-center justify-between gap-2 flex-wrap">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Time: <span className="text-foreground font-semibold">{algo.timeComplexity}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Space: <span className="text-foreground font-semibold">{algo.spaceComplexity}</span>
                  </span>
                </div>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${difficultyStyles[algo.difficulty]}`}>
                  {algo.difficulty}
                </span>
              </div>

              {!algo.comingSoon && (
                <div className="mt-3 text-xs font-semibold text-primary group-hover:gap-2 flex items-center gap-1 transition-all">
                  시각화 보기 <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              )}
            </div>
          );

          return algo.comingSoon ? (
            <div key={algo.id}>{card}</div>
          ) : (
            <Link key={algo.id} to={`/algorithm/${algo.slug}`} className="block">
              {card}
            </Link>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-muted-foreground text-sm">
            <p className="text-3xl mb-3">🔍</p>
            <p>조건에 맞는 알고리즘이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
