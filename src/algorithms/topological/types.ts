// ── Step types ────────────────────────────────────────────────────────────────

export type KahnStepType =
  | 'INIT'
  | 'ENQUEUE'
  | 'DEQUEUE'
  | 'DECREASE'
  | 'CYCLE_DETECTED'
  | 'DONE';

export type DFSTopoStepType =
  | 'VISIT'
  | 'FINISH'
  | 'CYCLE_DETECTED'
  | 'DONE';

export interface KahnStep {
  type: KahnStepType;
  description: string;
  inDegree: number[];
  queue: number[];
  result: number[];
  currentNode: number | null;
  activeEdge: [number, number] | null;
  decreasedNode: number | null;
  newlyEnqueued: number | null;
  hasCycle: boolean;
  codeLine: number;
}

export interface DFSTopoStep {
  type: DFSTopoStepType;
  description: string;
  visited: boolean[];
  inStack: boolean[];
  finished: boolean[];
  stack: number[];     // push order
  result: number[];    // reverse of stack (final answer, only set on DONE)
  currentNode: number | null;
  activeEdge: [number, number] | null;
  hasCycle: boolean;
  codeLine: number;
}

// ── Graph data ────────────────────────────────────────────────────────────────

export interface TopoNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

export const TOPO_N = 7;

export const TOPO_NODES: TopoNode[] = [
  { id: 0, label: '수학',     x: 70,  y: 190 },
  { id: 1, label: '물리',     x: 200, y: 90  },
  { id: 2, label: '알고리즘', x: 200, y: 290 },
  { id: 3, label: '자료구조', x: 335, y: 190 },
  { id: 4, label: '운영체제', x: 465, y: 90  },
  { id: 5, label: '컴파일러', x: 465, y: 290 },
  { id: 6, label: '졸업',     x: 590, y: 190 },
];

export const TOPO_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3],
  [1, 4],
  [2, 3],
  [3, 4], [3, 5],
  [4, 6],
  [5, 6],
];

// Cycle example
export const CYCLE_N = 3;

export const CYCLE_NODES: TopoNode[] = [
  { id: 0, label: 'A', x: 150, y: 190 },
  { id: 1, label: 'B', x: 370, y: 90  },
  { id: 2, label: 'C', x: 370, y: 290 },
];

export const CYCLE_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 0],
];

// ── Source code ────────────────────────────────────────────────────────────────

export const KAHN_CODE = `from collections import deque

def topological_kahn(graph, n):
    in_degree = [0] * n
    for u in range(n):
        for v in graph[u]:
            in_degree[v] += 1

    queue = deque()
    for i in range(n):
        if in_degree[i] == 0:
            queue.append(i)

    result = []
    while queue:
        u = queue.popleft()
        result.append(u)

        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    if len(result) != n:
        return None  # 사이클 감지
    return result`;

export const DFS_TOPO_CODE = `def topological_dfs(graph, n):
    visited  = [False] * n
    in_stack = [False] * n
    stack    = []

    def dfs(u):
        visited[u]  = True
        in_stack[u] = True

        for v in graph[u]:
            if not visited[v]:
                dfs(v)
            elif in_stack[v]:   # back edge → 사이클
                return

        in_stack[u] = False
        stack.append(u)

    for i in range(n):
        if not visited[i]:
            dfs(i)

    return stack[::-1]`;
