import { Link } from "react-router-dom";
import type { Algorithm } from "../types";

const ALGORITHMS: Algorithm[] = [
  {
    id: "tsp",
    name: "Traveling Salesperson Problem",
    slug: "tsp",
    description: "Find the shortest possible route that visits every city exactly once and returns to the origin city.",
    difficulty: "Hard",
  }
];

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Algorithms</h1>
        <p className="text-muted-foreground mt-2">
          Explore and visualize classic computer science algorithms.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ALGORITHMS.map((algo) => (
          <Link
            key={algo.id}
            to={`/algorithm/${algo.slug}`}
            className="flex flex-col gap-2 rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50"
          >
            <div className="flex flex-col space-y-1.5">
              <h3 className="font-semibold leading-none tracking-tight">{algo.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-2 flex-grow">
                {algo.description}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                ${algo.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  algo.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }
              `}>
                {algo.difficulty}
              </span>
              <span className="text-sm font-medium text-primary">Visualize &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
