import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { SORT_CODES, SORT_LABELS } from './types';
import type { SortAlgorithm } from './types';

interface Props {
  codeLine: number;
  algorithm: SortAlgorithm;
}

export default function SortingCodeViewer({ codeLine, algorithm }: Props) {
  const [copied, setCopied] = useState(false);
  const code = SORT_CODES[algorithm];

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(code); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border rounded-xl bg-card shadow-sm overflow-hidden flex flex-col flex-shrink-0 max-h-[540px]">
      <div className="p-3 border-b bg-muted/30 flex items-center justify-between gap-2">
        <h2 className="font-semibold tracking-tight text-sm truncate">
          Source Code ({SORT_LABELS[algorithm].name})
        </h2>
        <button
          onClick={handleCopy}
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
              backgroundColor: codeLine > 0 && lineNumber === codeLine ? 'var(--code-highlight)' : 'transparent',
              borderLeft: codeLine > 0 && lineNumber === codeLine ? '3px solid #22c55e' : '3px solid transparent',
              paddingLeft: '10px',
              whiteSpace: 'pre' as const,
            },
          })}
          customStyle={{ margin: 0, padding: '16px 0', background: 'transparent', minWidth: 'max-content' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
