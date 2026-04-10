import { useEffect, useRef } from 'react';

interface WeightPopupProps {
  /** SVG container div의 bounding rect 기준 px 좌표 */
  x: number;
  y: number;
  defaultValue?: number;
  onConfirm: (weight: number) => void;
  onCancel: () => void;
}

export default function WeightPopup({ x, y, defaultValue = 1, onConfirm, onCancel }: WeightPopupProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const v = parseInt(inputRef.current?.value ?? '1', 10);
      onConfirm(isNaN(v) || v <= 0 ? 1 : v);
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div
      className="absolute z-50 bg-card border border-border rounded-lg shadow-xl p-3 flex flex-col gap-2 min-w-[160px]"
      style={{ left: x, top: y, transform: 'translate(-50%, -110%)' }}
    >
      <p className="text-xs font-semibold text-muted-foreground">간선 가중치 입력</p>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="number"
          min={1}
          defaultValue={defaultValue}
          onKeyDown={handleKeyDown}
          className="w-20 text-sm font-mono border border-border rounded px-2 py-1 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={() => {
            const v = parseInt(inputRef.current?.value ?? '1', 10);
            onConfirm(isNaN(v) || v <= 0 ? 1 : v);
          }}
          className="px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          확인
        </button>
        <button
          onClick={onCancel}
          className="px-2 py-1 text-xs font-semibold bg-muted text-muted-foreground rounded hover:bg-muted/80 transition-colors"
        >
          취소
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground">Enter로 확인 · Esc로 취소</p>
    </div>
  );
}
