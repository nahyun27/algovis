import { MousePointer2, PlusCircle, ArrowRightCircle, Trash2, RefreshCw, ArrowLeftRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export type EditorMode = 'SELECT' | 'ADD_NODE' | 'ADD_EDGE';

interface Preset {
  label: string;
  onLoad: () => void;
}

interface ToolbarProps {
  mode: EditorMode;
  onModeChange: (m: EditorMode) => void;
  directed: boolean;
  onDirectedToggle: () => void;
  canDelete: boolean;
  onDelete: () => void;
  onReset: () => void;
  presets: Preset[];
  nodeCount: number;
  maxNodes: number;
}

export default function Toolbar({
  mode, onModeChange, directed, onDirectedToggle,
  canDelete, onDelete, onReset, presets, nodeCount, maxNodes,
}: ToolbarProps) {
  const [presetOpen, setPresetOpen] = useState(false);

  const modeButtons: { id: EditorMode; icon: React.ReactNode; label: string }[] = [
    { id: 'SELECT',   icon: <MousePointer2 size={15} />, label: '선택  / 이동' },
    { id: 'ADD_NODE', icon: <PlusCircle size={15} />,    label: '노드 추가' },
    { id: 'ADD_EDGE', icon: <ArrowRightCircle size={15} />, label: '간선 추가' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-b bg-muted/20 text-sm">
      {/* Mode buttons */}
      <div className="flex bg-card rounded-lg border shadow-sm p-0.5 gap-0.5">
        {modeButtons.map(({ id, icon, label }) => (
          <button
            key={id}
            title={label}
            onClick={() => onModeChange(id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              mode === id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            }`}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-border" />

      {/* Directed toggle */}
      <button
        onClick={onDirectedToggle}
        title="방향 그래프 / 무방향 그래프 전환"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold border transition-all ${
          directed
            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
            : 'bg-card border-border text-muted-foreground hover:bg-muted/60'
        }`}
      >
        <ArrowLeftRight size={13} />
        <span>{directed ? '방향 그래프' : '무방향 그래프'}</span>
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-border" />

      {/* Delete */}
      <button
        onClick={onDelete}
        disabled={!canDelete}
        title="선택된 노드/간선 삭제 (Delete)"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold border transition-all ${
          canDelete
            ? 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50'
            : 'bg-card border-border text-muted-foreground/40 cursor-not-allowed'
        }`}
      >
        <Trash2 size={13} />
        <span className="hidden sm:inline">삭제</span>
      </button>

      {/* Reset */}
      <button
        onClick={onReset}
        title="캔버스 초기화"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold border bg-card border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
      >
        <RefreshCw size={13} />
        <span className="hidden sm:inline">초기화</span>
      </button>

      {/* Presets */}
      {presets.length > 0 && (
        <div className="relative ml-auto">
          <button
            onClick={() => setPresetOpen(p => !p)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold border bg-card border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
          >
            프리셋
            <ChevronDown size={12} className={`transition-transform ${presetOpen ? 'rotate-180' : ''}`} />
          </button>
          {presetOpen && (
            <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[160px] overflow-hidden">
              {presets.map(p => (
                <button
                  key={p.label}
                  onClick={() => { p.onLoad(); setPresetOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-muted/60 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Node count badge */}
      <div className={`ml-2 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
        nodeCount >= maxNodes
          ? 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400'
          : 'bg-muted/50 border-border text-muted-foreground'
      }`}>
        노드 {nodeCount} / {maxNodes}
      </div>
    </div>
  );
}
