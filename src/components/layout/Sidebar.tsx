import { Link, useLocation } from 'react-router-dom';
import { FileCode2, Home } from 'lucide-react';

interface Props {
  onClose?: () => void;
}

const links = [
  { name: 'Home',           path: '/',                      icon: Home      },
  { name: 'TSP',            path: '/algorithm/tsp',         icon: FileCode2 },
  { name: 'Dijkstra',       path: '/algorithm/dijkstra',    icon: FileCode2 },
  { name: 'A* Search',      path: '/algorithm/astar',       icon: FileCode2 },
  { name: 'BFS / DFS',      path: '/algorithm/bfsdfs',      icon: FileCode2 },
  { name: 'Bellman-Ford',   path: '/algorithm/bellmanford', icon: FileCode2 },
  { name: 'Floyd-Warshall', path: '/algorithm/floyd-warshall', icon: FileCode2 },
  { name: 'Kruskal / Prim',   path: '/algorithm/kruskal',     icon: FileCode2 },
  { name: 'Topological Sort', path: '/algorithm/topological', icon: FileCode2 },
];

export default function Sidebar({ onClose }: Props) {
  const location = useLocation();

  return (
    <div className="py-6 px-4 h-full">
      <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Algorithms</h2>
      <div className="space-y-1">
        {links.map(link => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={`block w-full rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors ${
                isActive ? 'bg-muted text-primary' : 'text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0" />
                {link.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
