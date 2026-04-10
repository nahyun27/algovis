export interface TSPStep {
  mask: number;
  currentCity: number;
  nextCity: number | null;
  edgeWeight: number | null;
  dpTable: number[][];
  activeEdge: [number, number] | null;
  description: string;
  isImprovement: boolean;
  codeLine: number;
}

export const INF = 1e9;
export const CITIES = 4;

export const W = [
  [0, 10, 15, 20],
  [5,  0,  9, 10],
  [6, 13,  0, 12],
  [8,  8,  9,  0]
];
