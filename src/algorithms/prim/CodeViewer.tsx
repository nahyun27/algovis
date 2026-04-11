import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { PRIM_CODE } from './types';

interface Props {
  codeLine: number;
}

const HIGHLIGHT_MAP: Record<number, number[]> = {
  9:  [9, 10],
  14: [14],
  16: [16, 17],
  19: [19, 20],
  22: [22, 23, 24, 25, 26],
  28: [28],
};

export default function PrimCodeViewer({ codeLine }: Props) {
  const [copied, setCopied] = useState(false);
  const lines = PRIM_CODE.split('\n');

  const copy = () => {
    navigator.clipboard.writeText(PRIM_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="border rounded-xl bg-card shadow-sm overflow-hidden flex flex-col">
      <div className="p-3 border-b bg-muted/30 flex items-center justify-between shrink-0">
        <h3 className="font-semibold text-sm">소스코드 (Python)</h3>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
        >
          {copied
            ? <Check className="w-3.5 h-3.5 text-emerald-500" />
            : <Copy className="w-3.5 h-3.5" />
          }
          {copied ? '복사됨' : '복사'}
        </button>
      </div>
      <div className="overflow-auto p-3 font-mono text-[12px] leading-relaxed bg-muted/5">
        {lines.map((line, idx) => {
          const lineNum = idx + 1;
          const highlighted = codeLine > 0 && (HIGHLIGHT_MAP[codeLine] ?? []).includes(lineNum);
          return (
            <div
              key={lineNum}
              className={`flex gap-2 px-2 py-0.5 rounded transition-colors ${highlighted ? 'bg-yellow-100 dark:bg-yellow-900/40' : ''}`}
            >
              <span className="select-none text-muted-foreground/40 w-5 text-right shrink-0">{lineNum}</span>
              <span className={highlighted ? 'text-yellow-900 dark:text-yellow-100 font-semibold' : 'text-foreground'}>
                {line || '\u00a0'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
