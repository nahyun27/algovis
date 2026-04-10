export type AStarStepType = 'INIT' | 'DEQUEUE' | 'RELAX' | 'CLOSE' | 'DONE';

export interface AStarStep {
  type: AStarStepType;
  description: string;
  
  // Status arrays (index matches node id)
  g: number[];
  h: number[];
  f: number[];
  parent: number[];
  
  // Sets
  openSet: number[]; // can just be an array of ids in priority queue
  closedSet: number[];
  
  // Highlighting
  currentProcessingNode: number | null;
  activeEdge: [number, number] | null; // [from, to] currently evaluating/relaxing
  isImprovement: boolean; // did RELAX lead to a better path?
  
  // Stats
  nodesExplored: number; // to compare with Dijkstra
  
  // Code Highlighting
  codeLine: number;
}
