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

  /* ── Keyboard shortcuts ── */
  const handleKey = useCallback((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        onPrev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        onNext();
        break;
      case ' ':
        e.preventDefault();
        onPlayPause();
        break;
      case 'Home':
        e.preventDefault();
        onFirst();
        break;
      case 'End':
        e.preventDefault();
        onLast();
        break;
    }
  }, [onPrev, onNext, onPlayPause, onFirst, onLast]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div className="sticky bottom-0 z-10 flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 border-t bg-card/95 backdrop-blur-md text-card-foreground">
      {/* Step count */}
      <div className="text-xs sm:text-sm font-medium text-muted-foreground">
        Step {currentStep + 1} / {totalSteps}
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
        {/* Playback buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button onClick={onFirst} disabled={currentStep === 0} aria-label="처음으로"
            className="p-2.5 sm:p-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-lg sm:rounded hover:bg-muted disabled:opacity-50 transition-colors flex items-center justify-center">
            <Rewind className="w-5 h-5" />
          </button>
          <button onClick={onPrev} disabled={currentStep === 0} aria-label="이전 (←)"
            className="p-2.5 sm:p-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-lg sm:rounded hover:bg-muted disabled:opacity-50 transition-colors flex items-center justify-center">
            <SkipBack className="w-5 h-5" />
          </button>
          <button onClick={onPlayPause} aria-label={isPlaying ? '일시정지 (Space)' : '재생 (Space)'}
            className="p-3.5 sm:p-3 min-w-[52px] min-h-[52px] sm:min-w-0 sm:min-h-0 mx-1 sm:mx-2 rounded-full hover:bg-primary/90 bg-primary text-primary-foreground shadow flex items-center justify-center transition-all">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button onClick={onNext} disabled={currentStep === totalSteps - 1} aria-label="다음 (→)"
            className="p-2.5 sm:p-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-lg sm:rounded hover:bg-muted disabled:opacity-50 transition-colors flex items-center justify-center">
            <SkipForward className="w-5 h-5" />
          </button>
          <button onClick={onLast} disabled={currentStep === totalSteps - 1} aria-label="마지막으로 (End)"
            className="p-2.5 sm:p-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-lg sm:rounded hover:bg-muted disabled:opacity-50 transition-colors flex items-center justify-center">
            <FastForward className="w-5 h-5" />
          </button>
        </div>

        {/* Speed slider */}
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2">
          <span className="text-[10px] sm:text-xs text-muted-foreground font-medium w-7 sm:w-8 text-right shrink-0">
            {speed}x
          </span>
          <input
            type="range"
            min={0}
            max={SPEEDS.length - 1}
            step={1}
            value={speedIdx >= 0 ? speedIdx : 2}
            onChange={(e) => onSpeedChange(SPEEDS[Number(e.target.value)])}
            className="w-16 sm:w-20 h-1.5 accent-primary cursor-pointer"
            aria-label="재생 속도"
          />
        </div>

        {/* Shortcut info button */}
        <div className="relative">
          <button
            onClick={() => setShowShortcuts(p => !p)}
            aria-label="키보드 단축키"
            className="p-1.5 sm:p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Shortcut tooltip */}
          {showShortcuts && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowShortcuts(false)} />
              <div className="absolute bottom-full right-0 mb-2 z-50 w-52 bg-popover border rounded-lg shadow-xl p-3 text-xs">
                <p className="font-semibold text-foreground mb-2">키보드 단축키</p>
                <div className="space-y-1.5 text-muted-foreground">
                  <div className="flex justify-between">
                    <span><kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">←</kbd> <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">→</kbd></span>
                    <span>이전 / 다음</span>
                  </div>
                  <div className="flex justify-between">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Space</kbd>
                    <span>재생 / 정지</span>
                  </div>
                  <div className="flex justify-between">
                    <span><kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Home</kbd> <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">End</kbd></span>
                    <span>처음 / 끝</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
