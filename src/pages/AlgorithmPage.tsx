import { useState } from 'react';
import { useParams } from 'react-router-dom';
import StepController from '../components/algorithm/StepController';

export default function AlgorithmPage() {
  const { slug } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fake steps limit for mock UI
  const totalSteps = 10;

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] lg:flex-row gap-6">
      {/* Left side: Graph / Visualization */}
      <div className="flex-1 border rounded-xl overflow-hidden bg-card text-card-foreground shadow-sm flex flex-col min-h-[500px]">
        <div className="p-4 border-b flex justify-between items-center bg-muted/30">
          <h2 className="font-semibold text-lg tracking-tight">Visualization area ({slug})</h2>
        </div>
        <div className="flex-1 p-4 flex items-center justify-center relative bg-muted/10">
          <div className="text-center">
            <span className="text-muted-foreground inline-block mb-2">Graph/Canvas goes here</span>
            <div className="bg-primary/10 border border-primary/20 rounded-md p-8 animate-pulse text-primary font-mono text-xs">
              Waiting for logic implementation...
            </div>
          </div>
        </div>
        <StepController
          currentStep={currentStep}
          totalSteps={totalSteps}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={() => setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1))}
          onPrev={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          onFirst={() => setCurrentStep(0)}
          onLast={() => setCurrentStep(totalSteps - 1)}
        />
      </div>

      {/* Right side: Code viewer and problem list */}
      <div className="w-full lg:w-96 flex flex-col gap-6">
        <div className="border rounded-xl bg-card shadow-sm overflow-hidden flex flex-col h-72">
          <div className="p-4 border-b bg-muted/30">
            <h2 className="font-semibold tracking-tight">Source Code</h2>
          </div>
          <div className="p-4 bg-muted/50 text-[13px] font-mono whitespace-pre overflow-auto flex-1">
{`function solve() {
  // TSP pseudo-code
  // Current Step: ${currentStep + 1}
  
  if (path.length === N) {
    calculateTotalDistance();
  }
}`}
          </div>
        </div>

        <div className="border rounded-xl bg-card shadow-sm overflow-hidden flex-1">
          <div className="p-4 border-b bg-muted/30">
            <h2 className="font-semibold tracking-tight">Problem Configuration</h2>
          </div>
          <div className="p-4 text-sm text-muted-foreground space-y-4">
            <p>Settings for the current graph structure, nodes generation speed, and metrics will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
