export interface Algorithm {
  id: string;
  name: string;
  slug: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Step {
  id: number;
  description: string;
  // More specific types will go here (graph state, array state, etc)
  state?: unknown; 
}
