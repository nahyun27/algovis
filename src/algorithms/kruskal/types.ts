export type KruskalStepType = 'INIT' | 'CONSIDER' | 'FIND' | 'ACCEPT' | 'REJECT' | 'DONE';

export interface Edge {
  u: number;
  v: number;
  weight: number;
}

export interface KruskalStep {
  type: KruskalStepType;
  description: string;
  parent: number[];
  rank: number[];
  mstEdges: Edge[];
  sortedEdges: Edge[];
  currentEdge: Edge | null;
  rejectedEdges: Edge[];
  codeLine: number;
  totalCost: number;
  findResult?: { ru: number; rv: number };
}

export interface KruskalNode {
  id: number;
  x: number;
  y: number;
}

export const KRUSKAL_N = 6;

export const KRUSKAL_NODES: KruskalNode[] = [
  { id: 0, x: 110, y: 190 },
  { id: 1, x: 270, y: 90 },
  { id: 2, x: 270, y: 290 },
  { id: 3, x: 430, y: 90 },
  { id: 4, x: 430, y: 290 },
  { id: 5, x: 590, y: 190 },
];

export const KRUSKAL_EDGES: Edge[] = [
  { u: 0, v: 1, weight: 4 },
  { u: 0, v: 2, weight: 3 },
  { u: 1, v: 2, weight: 1 },
  { u: 1, v: 3, weight: 2 },
  { u: 2, v: 4, weight: 4 },
  { u: 3, v: 4, weight: 2 },
  { u: 3, v: 5, weight: 3 },
  { u: 4, v: 5, weight: 5 },
];

// Non-mutating root finder for display
export function findRoot(parent: number[], x: number): number {
  let cur = x;
  while (parent[cur] !== cur) cur = parent[cur];
  return cur;
}

export const KRUSKAL_CODE = `def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])  # 경로 압축
    return parent[x]

def union(parent, rank, x, y):
    rx = find(parent, x)
    ry = find(parent, y)
    if rx == ry:
        return False        # 사이클 발생
    if rank[rx] < rank[ry]:
        rx, ry = ry, rx     # 랭크 높은 쪽이 루트
    parent[ry] = rx         # Union
    if rank[rx] == rank[ry]:
        rank[rx] += 1
    return True

def kruskal(n, edges):
    edges.sort(key=lambda e: e[2])  # 가중치 오름차순
    parent = list(range(n))
    rank   = [0] * n
    mst, cost = [], 0

    for u, v, w in edges:
        if union(parent, rank, u, v):
            mst.append((u, v, w))
            cost += w
        if len(mst) == n - 1:
            break

    return mst, cost`;
