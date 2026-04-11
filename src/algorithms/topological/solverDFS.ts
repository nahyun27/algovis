import type { DFSTopoStep, TopoNode } from './types';

export function generateDFSTopoSteps(
  nodes: TopoNode[],
  edges: [number, number][],
  N: number,
): DFSTopoStep[] {
  const steps: DFSTopoStep[] = [];

  const adj: number[][] = Array.from({ length: N }, () => []);
  for (const [u, v] of edges) adj[u].push(v);

  const visited  = Array(N).fill(false);
  const inStack  = Array(N).fill(false);
  const finished = Array(N).fill(false);
  const stack: number[] = [];
  let hasCycle = false;

  const snapV  = () => [...visited];
  const snapIS = () => [...inStack];
  const snapF  = () => [...finished];
  const snapS  = () => [...stack];

  function dfs(u: number) {
    if (hasCycle) return;

    visited[u] = true;
    inStack[u] = true;

    steps.push({
      type: 'VISIT',
      description: `"${nodes[u].label}" 방문 시작`,
      visited: snapV(), inStack: snapIS(), finished: snapF(), stack: snapS(),
      result: [], currentNode: u, activeEdge: null,
      hasCycle: false, codeLine: 7,
    });

    for (const v of adj[u]) {
      if (hasCycle) return;

      if (!visited[v]) {
        steps.push({
          type: 'VISIT',
          description: `간선 ${nodes[u].label}→${nodes[v].label} 탐색`,
          visited: snapV(), inStack: snapIS(), finished: snapF(), stack: snapS(),
          result: [], currentNode: u, activeEdge: [u, v],
          hasCycle: false, codeLine: 11,
        });
        dfs(v);
      } else if (inStack[v]) {
        hasCycle = true;
        steps.push({
          type: 'CYCLE_DETECTED',
          description: `⚠️ 역방향 간선 ${nodes[u].label}→${nodes[v].label} 발견! 사이클 존재.`,
          visited: snapV(), inStack: snapIS(), finished: snapF(), stack: snapS(),
          result: [], currentNode: u, activeEdge: [u, v],
          hasCycle: true, codeLine: 13,
        });
        return;
      }
    }

    if (!hasCycle) {
      inStack[u] = false;
      finished[u] = true;
      stack.push(u);

      steps.push({
        type: 'FINISH',
        description: `"${nodes[u].label}" DFS 완료 → 스택 push. 스택: [${stack.map(n => nodes[n].label).join(', ')}]`,
        visited: snapV(), inStack: snapIS(), finished: snapF(), stack: snapS(),
        result: [], currentNode: u, activeEdge: null,
        hasCycle: false, codeLine: 16,
      });
    }
  }

  for (let i = 0; i < N; i++) {
    if (!visited[i] && !hasCycle) dfs(i);
  }

  const result = [...stack].reverse();

  steps.push({
    type: hasCycle ? 'CYCLE_DETECTED' : 'DONE',
    description: hasCycle
      ? '⚠️ 사이클이 감지되어 위상정렬 불가능합니다.'
      : `[완료] 스택 역순 = 위상정렬: ${result.map(n => nodes[n].label).join(' → ')}`,
    visited: snapV(), inStack: snapIS(), finished: snapF(), stack: snapS(),
    result: hasCycle ? [] : result,
    currentNode: null, activeEdge: null,
    hasCycle, codeLine: hasCycle ? 0 : 22,
  });

  return steps;
}
