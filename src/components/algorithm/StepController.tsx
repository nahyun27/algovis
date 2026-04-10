import { Play, Pause, SkipForward, SkipBack, FastForward, Rewind } from 'lucide-react';

interface StepControllerProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
}

export default function StepController({
  currentStep,
  totalSteps,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onFirst,
  onLast,
}: StepControllerProps) {
  return (
    <div className="flex flex-col items-center gap-3 p-4 border-t bg-card text-card-foreground">
      <div className="text-sm font-medium text-muted-foreground">
        Step {currentStep + 1} of {totalSteps}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onFirst}
          disabled={currentStep === 0}
          className="p-2 rounded hover:bg-muted disabled:opacity-50 transition-colors"
        >
          <Rewind className="w-5 h-5" />
        </button>
        <button
          onClick={onPrev}
          disabled={currentStep === 0}
          className="p-2 rounded hover:bg-muted disabled:opacity-50 transition-colors"
        >
          <SkipBack className="w-5 h-5" />
        </button>
        <button
          onClick={onPlayPause}
          className="p-3 mx-2 rounded-full hover:bg-primary/90 bg-primary text-primary-foreground shadow flex items-center justify-center transition-all"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button
          onClick={onNext}
          disabled={currentStep === totalSteps - 1}
          className="p-2 rounded hover:bg-muted disabled:opacity-50 transition-colors"
        >
          <SkipForward className="w-5 h-5" />
        </button>
        <button
          onClick={onLast}
          disabled={currentStep === totalSteps - 1}
          className="p-2 rounded hover:bg-muted disabled:opacity-50 transition-colors"
        >
          <FastForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
