import { Moon, Sun, Menu, Code2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLayout } from '../../context/LayoutContext';

export default function Header() {
  const { setSidebarOpen, codeDrawerOpen, setCodeDrawerOpen } = useLayout();
  const location = useLocation();
  const isAlgorithmPage = location.pathname.startsWith('/algorithm/');

  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  );

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(d => !d);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-3 max-w-screen-2xl mx-auto">

        {/* Left: hamburger (narrow) + logo */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="메뉴 열기"
            className="nw:hidden p-2 rounded-md hover:bg-muted transition-colors text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-base">AlgoVis</span>
          </Link>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right: code button (narrow + algorithm page only) + dark mode */}
        <div className="flex items-center gap-1">
          {isAlgorithmPage && (
            <button
              onClick={() => setCodeDrawerOpen(!codeDrawerOpen)}
              aria-label="코드 보기"
              className={`nw:hidden flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                codeDrawerOpen
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:bg-muted text-foreground'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              코드 보기
            </button>
          )}
          <button
            onClick={toggleDark}
            aria-label="다크모드 전환"
            className="inline-flex items-center justify-center rounded-md h-9 w-9 hover:bg-muted transition-colors"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

      </div>
    </header>
  );
}
