import { ExternalLink } from 'lucide-react';

export default function ProblemList() {
  return (
    <div className="bg-card rounded-xl border p-4 shadow-sm">
      <h3 className="font-semibold mb-3 tracking-tight">Related Problems (BOJ)</h3>
      <div className="space-y-2">
        <ProblemItem
          title="특정한 최단 경로"
          id={1504}
          badge="Gold IV"
          badgeColor="text-yellow-700 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400"
          desc="다익스트라/A* 기초 응용"
        />
        <ProblemItem
          title="파티"
          id={1238}
          badge="Gold III"
          badgeColor="text-yellow-700 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400"
          desc="방향 그래프 최단경로"
        />
        <ProblemItem
          title="미확인 도착지"
          id={9370}
          badge="Gold II"
          badgeColor="text-yellow-700 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400"
          desc="최단경로 역추적"
        />
      </div>
    </div>
  );
}

function ProblemItem({ title, id, badge, badgeColor, desc }: any) {
  return (
    <a
      href={`https://www.acmicpc.net/problem/${id}`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/60 transition-colors group"
    >
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-bold text-sm">{id}</span>
          <span className="font-medium text-sm group-hover:text-primary transition-colors">{title}</span>
          <ExternalLink size={12} className="text-muted-foreground" />
        </div>
        <div className="flex gap-2">
          <span className="text-xs text-muted-foreground">{desc}</span>
        </div>
      </div>
      <div className={`text-xs font-bold px-2 py-1 rounded-md ${badgeColor}`}>
        {badge}
      </div>
    </a>
  );
}
