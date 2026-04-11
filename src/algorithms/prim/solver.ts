import type { PrimStep, PQItem } from './types';
import { INF } from './types';
import type { Edge, KruskalNode } from '../kruskal/types';
import { KRUSKAL_N, KRUSKAL_NODES, KRUSKAL_EDGES } from '../kruskal/types';

function buildAdj(edges: Edge[], N: number): { node: number; weight: number }[][] {
  const adj: { node: number; weight: number }[][] = Array.from({ length: N }, () => []);
  for (const e of edges) {
    adj[e.u].push({ node: e.v, weight: e.weight });
    adj[e.v].push({ node: e.u, weight: e.weight });
  }
  return adj;
}

export function generatePrimSteps(
  _nodes: KruskalNode[] = KRUSKAL_NODES,
  edges: Edge[]         = KRUSKAL_EDGES,
  N: number             = KRUSKAL_N,
): PrimStep[] {
  const steps: PrimStep[] = [];
  const adj = buildAdj(edges, N);

  const key    = Array<number>(N).fill(INF);
  const parent = Array<number>(N).fill(-1);
  const visited = Array<boolean>(N).fill(false);
  const mstEdges: { u: number; v: number; weight: number }[] = [];
  let totalCost = 0;
  let pq: PQItem[] = [];

  const snap = (
    type: PrimStep['type'],
    description: string,
    currentNode: number | null,
    currentNeighbor: number | null,
    updatedNode: number | null,
    codeLine: number,
  ): PrimStep => ({
    type,
    description,
    key: [...key],
    parent: [...parent],
    visited: [...visited],
    pq: [...pq].sort((a, b) => a.key - b.key),
    mstEdges: mstEdges.map(e => ({ ...e })),
    currentNode,
    currentNeighbor,
    updatedNode,
    totalCost,
    codeLine,
  });

  // INIT
  key[0] = 0;
  pq.push({ node: 0, key: 0 });
  steps.push(snap('INIT', '노드 0에서 시작: key[0] = 0, 나머지 ∞로 초기화', null, null, null, 9));

  while (pq.length > 0) {
    pq.sort((a, b) => a.key - b.key);
    const { node: u, key: k } = pq.shift()!;

    steps.push(snap(
      'EXTRACT_MIN',
      `우선순위 큐에서 key=${k >= INF ? '∞' : k}인 노드 ${u} 꺼냄`,
      u, null, null, 14,
    ));

    if (visited[u]) {
      steps.push(snap(
        'ALREADY_IN_MST',
        `노드 ${u}는 이미 MST에 포함됨 — 스킵`,
        u, null, null, 16,
      ));
      continue;
    }

    visited[u] = true;
    totalCost += k;
    if (parent[u] !== -1) {
      mstEdges.push({ u: parent[u], v: u, weight: k });
    }
    steps.push(snap(
      'ADD_TO_MST',
      parent[u] === -1
        ? `노드 ${u}를 MST에 추가 (시작 노드, 비용 +0)`
        : `노드 ${u}를 MST에 추가 — 간선 ${parent[u]}–${u} (비용 +${k})`,
      u, null, null, 19,
    ));

    if (mstEdges.length === N - 1) break;

    for (const { node: v, weight: w } of adj[u]) {
      if (!visited[v] && w < key[v]) {
        const oldKey = key[v];
        key[v] = w;
        parent[v] = u;
        pq.push({ node: v, key: w });
        steps.push(snap(
          'UPDATE',
          `노드 ${v}의 key 갱신: ${oldKey >= INF ? '∞' : oldKey} → ${w}  (간선 ${u}–${v})`,
          u, v, v, 22,
        ));
      }
    }
  }

  steps.push(snap(
    'DONE',
    `MST 완성! 총 비용 = ${totalCost}  ✓ 크루스칼과 동일한 결과`,
    null, null, null, 28,
  ));

  return steps;
}
