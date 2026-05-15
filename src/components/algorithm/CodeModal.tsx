import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  title: string;
  language?: string;
  isLineHighlighted?: (lineNum: number) => boolean;
  highlightColor?: string;
}

export default function CodeModal({
  isOpen,
  onClose,
  code,
  title,
  language = 'python',
  isLineHighlighted,
  highlightColor = '#22c55e',
}: Props) {
  const [copied, setCopied] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

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
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[90vh] max-w-6xl bg-card rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col border"
          >
            {/* Header */}
            <div className="px-4 sm:px-5 py-3 border-b bg-muted/30 flex items-center justify-between gap-3 shrink-0">
              <h2 className="font-semibold tracking-tight text-sm sm:text-base truncate">{title}</h2>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border transition-all ${
                    copied
                      ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
                      : 'bg-card hover:bg-muted/60 text-muted-foreground hover:text-foreground border-border'
                  }`}
                  title="코드 복사"
                >
                  {copied ? <><Check className="w-3.5 h-3.5" /> 복사됨!</> : <><Copy className="w-3.5 h-3.5" /> 복사</>}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="닫기 (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Code area */}
            <div className="dark flex-1 overflow-auto text-[14px] sm:text-[15px] bg-[var(--code-bg)]">
              <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                showLineNumbers
                wrapLines={true}
                lineProps={(lineNumber) => {
                  const highlighted = isLineHighlighted?.(lineNumber) ?? false;
                  return {
                    style: {
                      display: 'block',
                      backgroundColor: highlighted ? 'var(--code-highlight)' : 'transparent',
                      borderLeft: highlighted ? `3px solid ${highlightColor}` : '3px solid transparent',
                      paddingLeft: '14px',
                      whiteSpace: 'pre' as const,
                    },
                  };
                }}
                customStyle={{ margin: 0, padding: '20px 0', background: 'transparent', minWidth: 'max-content' }}
              >
                {code}
              </SyntaxHighlighter>
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 border-t bg-muted/20 text-[11px] text-muted-foreground shrink-0">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono border">Esc</kbd> 키로 닫기
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
