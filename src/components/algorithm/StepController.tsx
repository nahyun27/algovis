import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, FastForward, Rewind, Keyboard } from 'lucide-react';

const SPEEDS = [0.25, 0.5, 1, 2, 4];

interface StepControllerProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function StepController({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onPlayPause,
  onNext,
  onPrev,
  onFirst,
  onLast,
  onSpeedChange,
}: StepControllerProps) {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const speedIdx = SPEEDS.indexOf(speed);
  const progress = totalSteps > 1 ? currentStep / (totalSteps - 1) : 0;

  /* ── Keyboard shortcuts ── */
  const handleKey = useCallback((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    switch (e.key) {
      case 'ArrowLeft':  e.preventDefault(); onPrev(); break;
      case 'ArrowRight': e.preventDefault(); onNext(); break;
      case ' ':          e.preventDefault(); onPlayPause(); break;
      case 'Home':       e.preventDefault(); onFirst(); break;
      case 'End':        e.preventDefault(); onLast(); break;
    }
  }, [onPrev, onNext, onPlayPause, onFirst, onLast]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div className="w-full bg-card/95 backdrop-blur-xl text-card-foreground shrink-0">
      {/* Progress bar — subtle, at the very top edge */}
      <div className="h-[2px] w-full bg-border/20 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-primary/60 transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="w-full px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2">

        {/* Left: step count */}
        <div className="text-[11px] sm:text-xs font-semibold text-muted-foreground/70 whitespace-nowrap shrink-0 tabular-nums">
          {currentStep + 1} <span className="text-muted-foreground/30">/</span> {totalSteps}
        </div>

        {/* Center: playback buttons */}
        <div className="flex-1 flex items-center justify-center gap-0.5 sm:gap-1">
          <button onClick={onFirst} disabled={currentStep === 0} aria-label="처음으로"
            className="p-2 rounded-lg hover:bg-muted/60 disabled:opacity-30 transition-all flex items-center justify-center text-muted-foreground hover:text-foreground">
            <Rewind className="w-[15px] h-[15px] sm:w-[16px] sm:h-[16px]" />
          </button>
          <button onClick={onPrev} disabled={currentStep === 0} aria-label="이전 (←)"
            className="p-2 rounded-lg hover:bg-muted/60 disabled:opacity-30 transition-all flex items-center justify-center text-muted-foreground hover:text-foreground">
            <SkipBack className="w-[15px] h-[15px] sm:w-[16px] sm:h-[16px]" />
          </button>

          {/* Play/Pause — primary accent button */}
          <button onClick={onPlayPause} aria-label={isPlaying ? '일시정지 (Space)' : '재생 (Space)'}
            className="mx-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-150">
            {isPlaying
              ? <Pause className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px]" />
              : <Play className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] translate-x-px" />}
          </button>

          <button onClick={onNext} disabled={currentStep === totalSteps - 1} aria-label="다음 (→)"
            className="p-2 rounded-lg hover:bg-muted/60 disabled:opacity-30 transition-all flex items-center justify-center text-muted-foreground hover:text-foreground">
            <SkipForward className="w-[15px] h-[15px] sm:w-[16px] sm:h-[16px]" />
          </button>
          <button onClick={onLast} disabled={currentStep === totalSteps - 1} aria-label="마지막으로 (End)"
            className="p-2 rounded-lg hover:bg-muted/60 disabled:opacity-30 transition-all flex items-center justify-center text-muted-foreground hover:text-foreground">
            <FastForward className="w-[15px] h-[15px] sm:w-[16px] sm:h-[16px]" />
          </button>
        </div>

        {/* Right: speed + shortcut */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Speed control */}
          <div className="flex items-center gap-1.5 bg-muted/40 rounded-lg px-2 py-1">
            <span className="text-[10px] sm:text-[11px] text-muted-foreground font-semibold tabular-nums w-6 text-right">
              {speed}x
            </span>
            <input
              type="range"
              min={0}
              max={SPEEDS.length - 1}
              step={1}
              value={speedIdx >= 0 ? speedIdx : 2}
              onChange={(e) => onSpeedChange(SPEEDS[Number(e.target.value)])}
              className="w-12 sm:w-16 h-1 accent-primary cursor-pointer"
              aria-label="재생 속도"
            />
          </div>

          {/* Keyboard shortcut info */}
          <div className="relative">
            <button
              onClick={() => setShowShortcuts(p => !p)}
              aria-label="키보드 단축키"
              className="p-1.5 rounded-md hover:bg-muted/60 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              <Keyboard className="w-3.5 h-3.5" />
            </button>

            {showShortcuts && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowShortcuts(false)} />
                <div className="absolute bottom-full right-0 mb-2 z-50 w-48 bg-popover/95 backdrop-blur-lg border border-border/50 rounded-xl shadow-2xl p-3 text-[11px]">
                  <p className="font-semibold text-foreground mb-2">키보드 단축키</p>
                  <div className="space-y-1.5 text-muted-foreground">
                    <div className="flex justify-between items-center">
                      <span className="flex gap-1">
                        <kbd className="px-1.5 py-0.5 bg-muted/70 rounded text-[9px] font-mono border border-border/50">←</kbd>
                        <kbd className="px-1.5 py-0.5 bg-muted/70 rounded text-[9px] font-mono border border-border/50">→</kbd>
                      </span>
                      <span>이전 / 다음</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <kbd className="px-1.5 py-0.5 bg-muted/70 rounded text-[9px] font-mono border border-border/50">Space</kbd>
                      <span>재생 / 정지</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex gap-1">
                        <kbd className="px-1.5 py-0.5 bg-muted/70 rounded text-[9px] font-mono border border-border/50">Home</kbd>
                        <kbd className="px-1.5 py-0.5 bg-muted/70 rounded text-[9px] font-mono border border-border/50">End</kbd>
                      </span>
                      <span>처음 / 끝</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
