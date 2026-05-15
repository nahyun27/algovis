import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Maximize2 } from 'lucide-react';
import CodeModal from '../../components/algorithm/CodeModal';
import { ASTAR_GRID_CODE } from './gridTypes';

interface Props {
  codeLine: number;
}

function isHighlighted(lineNum: number, codeLine: number): boolean {
  if (codeLine === 12 && lineNum >= 11 && lineNum <= 14) return true; // INIT
  if (codeLine === 17 && lineNum === 17) return true; // DEQUEUE
  if (codeLine === 19 && lineNum >= 19 && lineNum <= 20) return true; // DONE
  if (codeLine === 22 && lineNum >= 21 && lineNum <= 23) return true; // CLOSE
  if (codeLine === 27 && lineNum >= 25 && lineNum <= 33) return true; // RELAX
  if (codeLine === 32 && lineNum === 35) return true; // NO_PATH
  return false;
}

export default function GridAStarCodeViewer({ codeLine }: Props) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(ASTAR_GRID_CODE); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = ASTAR_GRID_CODE;
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="border rounded-xl bg-card shadow-sm overflow-hidden flex flex-col flex-shrink-0 max-h-[540px]">
      <div className="p-3 border-b bg-muted/30 flex items-center justify-between gap-2">
        <h2 className="font-semibold tracking-tight text-sm truncate">Source Code (A* Grid)</h2>
        <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center justify-center w-7 h-7 rounded-md border bg-card hover:bg-muted/60 text-muted-foreground hover:text-foreground border-border transition-all shrink-0"
          title="코드 확대"
          aria-label="코드 확대"
        >
          <Maximize2 className="w-3 h-3" />
        </button>
        </div>
                <button onClick={handleCopy}
          className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-md border transition-all shrink-0 ${
            copied
              ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
              : 'bg-card hover:bg-muted/60 text-muted-foreground hover:text-foreground border-border'
          }`}
          title="코드 복사"
        >
          {copied ? <><Check className="w-3 h-3" /> 복사됨!</> : <><Copy className="w-3 h-3" /> 복사</>}
        </button>
      </div>
      <div className="dark flex-1 overflow-auto text-[11px] sm:text-[13px] bg-[var(--code-bg)]" style={{ overflowX: 'auto' }}>
        <SyntaxHighlighter
          language="python"
          style={vscDarkPlus}
          showLineNumbers
          wrapLines={true}
          lineProps={(lineNumber) => ({
            style: {
              display: 'block',
              backgroundColor: isHighlighted(lineNumber, codeLine) ? 'var(--code-highlight)' : 'transparent',
              borderLeft: isHighlighted(lineNumber, codeLine) ? '3px solid #6366f1' : '3px solid transparent',
              paddingLeft: '10px',
              whiteSpace: 'pre' as const,
            },
          })}
          customStyle={{ margin: 0, padding: '16px 0', background: 'transparent', minWidth: 'max-content' }}
        >
          {ASTAR_GRID_CODE}
        </SyntaxHighlighter>
      </div>
    </div>
      <CodeModal
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        code={ASTAR_GRID_CODE}
        title="Source Code (A* Grid)"
        isLineHighlighted={(line) => isHighlighted(line, codeLine)}
        highlightColor="#6366f1"
      />
    </>
  );
}
