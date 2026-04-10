export interface GraphNode {
  id: number;
  x: number;
  y: number;
  label: string;
}

export interface GraphEdge {
  id: string;
  from: number;
  to: number;
  weight: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  directed: boolean;
}

// TSP default graph (4 cities, diamond layout, directed)
export const TSP_DEFAULT_GRAPH: GraphData = {
  directed: true,
  nodes: [
    { id: 0, x: 240, y: 60,  label: '0' },
    { id: 1, x: 400, y: 200, label: '1' },
    { id: 2, x: 240, y: 340, label: '2' },
    { id: 3, x: 80,  y: 200, label: '3' },
  ],
  edges: [
    { id: '0-1', from: 0, to: 1, weight: 10 },
    { id: '0-2', from: 0, to: 2, weight: 15 },
    { id: '0-3', from: 0, to: 3, weight: 20 },
    { id: '1-0', from: 1, to: 0, weight: 5  },
    { id: '1-2', from: 1, to: 2, weight: 9  },
    { id: '1-3', from: 1, to: 3, weight: 10 },
    { id: '2-0', from: 2, to: 0, weight: 6  },
    { id: '2-1', from: 2, to: 1, weight: 13 },
    { id: '2-3', from: 2, to: 3, weight: 12 },
    { id: '3-0', from: 3, to: 0, weight: 8  },
    { id: '3-1', from: 3, to: 1, weight: 8  },
    { id: '3-2', from: 3, to: 2, weight: 9  },
  ],
};

// Dijkstra default graph (5 nodes, directed)
export const DIJKSTRA_DEFAULT_GRAPH: GraphData = {
  directed: true,
  nodes: [
    { id: 0, x: 80,  y: 200, label: '0' },
    { id: 1, x: 240, y: 80,  label: '1' },
    { id: 2, x: 240, y: 320, label: '2' },
    { id: 3, x: 400, y: 80,  label: '3' },
    { id: 4, x: 400, y: 320, label: '4' },
  ],
  edges: [
    { id: '0-1', from: 0, to: 1, weight: 10 },
    { id: '0-2', from: 0, to: 2, weight: 3  },
    { id: '1-3', from: 1, to: 3, weight: 2  },
    { id: '2-1', from: 2, to: 1, weight: 4  },
    { id: '2-3', from: 2, to: 3, weight: 8  },
    { id: '2-4', from: 2, to: 4, weight: 2  },
    { id: '3-4', from: 3, to: 4, weight: 5  },
    { id: '4-3', from: 4, to: 3, weight: 1  },
  ],
};

// A* default graph (6 nodes, directed)
export const ASTAR_DEFAULT_GRAPH: GraphData = {
  directed: true,
  nodes: [
    { id: 0, x: 100, y: 300, label: 'S' },
    { id: 1, x: 300, y: 150, label: '1' },
    { id: 2, x: 300, y: 450, label: '2' },
    { id: 3, x: 550, y: 150, label: '3' },
    { id: 4, x: 550, y: 450, label: '4' },
    { id: 5, x: 750, y: 300, label: 'G' },
  ],
  edges: [
    { id: '0-1', from: 0, to: 1, weight: 7 },
    { id: '0-2', from: 0, to: 2, weight: 3 },
    { id: '1-3', from: 1, to: 3, weight: 4 },
    { id: '1-4', from: 1, to: 4, weight: 8 },
    { id: '2-1', from: 2, to: 1, weight: 2 },
    { id: '2-4', from: 2, to: 4, weight: 6 },
    { id: '3-5', from: 3, to: 5, weight: 3 },
    { id: '4-3', from: 4, to: 3, weight: 2 },
    { id: '4-5', from: 4, to: 5, weight: 5 },
  ],
};
