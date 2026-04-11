export type FWStepType =
  | 'INIT'
  | 'ROUND_START'
  | 'UPDATE'
  | 'NO_UPDATE'
  | 'NEGATIVE_CYCLE'
  | 'DONE';

export interface FloydWarshallStep {
  type: FWStepType;
  description: string;
  distMatrix: number[][];
  nextMatrix: (number | null)[][];
  currentK: number | null;
  currentI: number | null;
  currentJ: number | null;
  isUpdate: boolean;
  prevVal: number | null;   // old dist[i][j] before update
  newVal: number | null;    // dist[i][k] + dist[k][j]
  hasNegCycle: boolean;
  codeLine: number;
}

export const INF = 1e9;
export const FW_N = 5;

export const FW_NODES: { id: number; x: number; y: number }[] = [
  { id: 0, x: 80,  y: 190 },
  { id: 1, x: 220, y: 60  },
  { id: 2, x: 390, y: 100 },
  { id: 3, x: 190, y: 310 },
  { id: 4, x: 390, y: 280 },
];

// directed edges: [from, to, weight]
export const FW_EDGES: [number, number, number][] = [
  [0, 1, 3], [0, 3, 7],
  [1, 0, 8], [1, 2, 2],
  [2, 0, 5], [2, 3, 1],
  [3, 0, 2], [3, 4, 3],
  [4, 2, 4], [4, 3, 6],
];

export const FW_CODE = `import math

def floyd_warshall(n, edges):
    # 거리 행렬 초기화
    dist = [[math.inf] * n for _ in range(n)]
    for i in range(n):
        dist[i][i] = 0
    next_node = [[None] * n for _ in range(n)]
    for u, v, w in edges:
        dist[u][v] = w
        next_node[u][v] = v

    # 경유 노드 k를 하나씩 추가하며 갱신
    for k in range(n):
        for i in range(n):
            for j in range(n):
                new_d = dist[i][k] + dist[k][j]
                if new_d < dist[i][j]:
                    dist[i][j] = new_d
                    next_node[i][j] = next_node[i][k]

    # 음수 사이클 감지: 대각선 확인
    for i in range(n):
        if dist[i][i] < 0:
            return None  # 음수 사이클 존재

    return dist, next_node


def get_path(next_node, u, v):
    if next_node[u][v] is None:
        return []  # 경로 없음
    path = [u]
    while u != v:
        u = next_node[u][v]
        path.append(u)
    return path`;
