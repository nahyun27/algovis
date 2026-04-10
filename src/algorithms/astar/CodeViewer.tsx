import { useEffect, useRef } from 'react';

const ASTAR_CODE = `import heapq
import math

def heuristic(u, v, pos):
    # 유클리드 거리 (직선 거리) 계산
    x1, y1 = pos[u]
    x2, y2 = pos[v]
    return math.hypot(x1 - x2, y1 - y2)

def astar(graph, start, goal, pos):
    n = len(graph)
    g_score = {i: float('inf') for i in range(n)}
    f_score = {i: float('inf') for i in range(n)}
    
    g_score[start] = 0
    f_score[start] = heuristic(start, goal, pos)
    
    # 우선순위 큐: (f_score, 노드)
    open_set = [(f_score[start], start)]
    closed_set = set()
    parent = {start: None}

    while open_set:
        current_f, u = heapq.heappop(open_set)

        if u == goal:
            return reconstruct_path(parent, goal)
            
        if u in closed_set: continue
        closed_set.add(u)

        for v, weight in graph[u]:
            tentative_g = g_score[u] + weight

            # 더 나은 경로를 발견한 경우
            if tentative_g < g_score[v]:
                parent[v] = u
                g_score[v] = tentative_g
                f_score[v] = g_score[v] + heuristic(v, goal, pos)
                
                # open_set에 업데이트된 정보 추가
                heapq.heappush(open_set, (f_score[v], v))

    return None # 목표 도달 불가
`;

export default function CodeViewer({ codeLine }: { codeLine: number }) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!codeRef.current || codeLine === 0) return;
    const lines = codeRef.current.querySelectorAll('.line');
    const target = lines[codeLine - 1] as HTMLElement;
    if (target) {
      target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [codeLine]);

  // highlight specific lines based on solver state
  const isHighlighted = (lineIndex: number) => {
    const lineNum = lineIndex + 1;
    // Map codeLine from solver to range of lines in python
    if (codeLine === 8 && lineNum >= 11 && lineNum <= 20) return true; // INIT
    if (codeLine === 13 && lineNum >= 23 && lineNum <= 24) return true; // DEQUEUE
    if (codeLine === 15 && lineNum >= 26 && lineNum <= 27) return true; // DONE
    if (codeLine === 18 && lineNum >= 32 && lineNum <= 36) return true; // RELAX
    return false;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ASTAR_CODE);
    // Provide some minimal visual feedback
    const btn = document.getElementById('astar-copy-btn');
    if (btn) {
      const originalText = btn.innerText;
      btn.innerText = '복사됨!';
      setTimeout(() => { btn.innerText = originalText; }, 2000);
    }
  };

  return (
    <div className="bg-[#1E1E1E] text-[#D4D4D4] rounded-xl overflow-hidden border shadow-sm flex flex-col h-[400px]">
      <div className="flex justify-between items-center px-4 py-2 bg-[#2D2D2D] border-b border-[#404040]">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          Source Code (Python A*)
        </h3>
        <button
          id="astar-copy-btn"
          onClick={handleCopy}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors bg-card hover:bg-muted px-2 py-1 border rounded-md"
        >
          복사
        </button>
      </div>
      <div className="overflow-auto flex-1 font-mono text-sm p-4 text-xs leading-relaxed">
        <pre className="m-0">
          <code ref={codeRef} className="block w-full">
             {ASTAR_CODE.split('\n').map((line, i) => (
               <div
                 key={i}
                 className={`line px-2 py-0.5 rounded transition-colors w-full inline-block ${
                   isHighlighted(i)
                    ? 'bg-blue-500/20 border-l-2 border-blue-500 text-blue-100'
                    : 'border-l-2 border-transparent hover:bg-white/5'
                 }`}
               >
                 <span className="inline-block w-6 text-right mr-4 text-[#858585] select-none">
                   {i + 1}
                 </span>
                 {line || ' '}
               </div>
             ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
