export type PrimStepType =
  | 'INIT'
  | 'EXTRACT_MIN'
  | 'ALREADY_IN_MST'
  | 'ADD_TO_MST'
  | 'UPDATE'
  | 'DONE';

export const INF = 1e9;

export interface PQItem {
  node: number;
  key: number;
}

// Reuse shared graph from kruskal
export type { Edge, KruskalNode } from '../kruskal/types';
export {
  KRUSKAL_N   as PRIM_N,
  KRUSKAL_NODES as PRIM_NODES,
  KRUSKAL_EDGES as PRIM_EDGES,
} from '../kruskal/types';

export interface PrimStep {
  type: PrimStepType;
  description: string;
  key: number[];
  parent: number[];
  visited: boolean[];
  pq: PQItem[];
  mstEdges: { u: number; v: number; weight: number }[];
  currentNode: number | null;
  currentNeighbor: number | null;
  updatedNode: number | null;
  totalCost: number;
  codeLine: number;
}

export const PRIM_CODE = `import heapq

def prim(n, adj):
    INF = float('inf')
    key    = [INF] * n
    parent = [-1]  * n
    in_mst = [False] * n

    key[0] = 0
    pq = [(0, 0)]        # (key, node)
    mst_cost = 0

    while pq:
        k, u = heapq.heappop(pq)

        if in_mst[u]:    # 이미 MST에 포함
            continue

        in_mst[u] = True
        mst_cost += k

        for v, w in adj[u]:
            if not in_mst[v] and w < key[v]:
                key[v] = w
                parent[v] = u
                heapq.heappush(pq, (w, v))

    return mst_cost, parent`;
