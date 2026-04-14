import type { ReactNode } from 'react';

interface AlgorithmLayoutProps {
  /** The fixed top header bar (title, buttons) */
  header: ReactNode;
  /** Everything that scrolls as one unit: banner + graph + table etc. */
  scrollable?: ReactNode;
  /** The fixed bottom playback controller */
  stepController?: ReactNode;
  /** The right side code/problem panel */
  rightPanel?: ReactNode;
  /** Editor mode replaces scrollable + stepController */
  editor?: ReactNode;
  isEditorMode?: boolean;
}

/**
 * Strict 100vh layout for all algorithm pages.
 *
 * Structure of center panel:
 *   ┌────────────────────────────────┐ ← shrink-0 (header)
 *   │  scrollable content area       │ ← flex-1 overflow-y-auto
 *   │  (banner + graph + table …)    │
 *   └────────────────────────────────┘
 *   │  StepController                │ ← shrink-0 (footer)
 *   └────────────────────────────────┘
 *
 * When the window gets shorter, only the scrollable area shrinks and
 * gains a scrollbar — the header and step controller always stay visible.
 */
export default function AlgorithmLayout({
  header,
  scrollable,
  stepController,
  rightPanel,
  editor,
  isEditorMode = false,
}: AlgorithmLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 p-4 sm:p-5 md:p-6 pt-4 lg:pt-5 h-full min-h-0 overflow-hidden">

      {/* ── Center Panel ── */}
      <div className="flex-1 flex flex-col lg:min-w-[600px] rounded-2xl overflow-hidden bg-card/90 backdrop-blur-md text-card-foreground shadow-lg dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-white/10 dark:border-white/5 min-h-0 h-full">

        {isEditorMode && editor ? (
          /* Editor mode – header fixed, editor fills the rest */
          <>
            {/* ① Fixed Header */}
            <div className="shrink-0">
              {header}
            </div>
            {/* subtle separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent shrink-0" />
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
              {editor}
            </div>
          </>
        ) : (
          <>
            {/* ① Fixed Header */}
            <div className="shrink-0">
              {header}
            </div>
            {/* subtle separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent shrink-0" />

            {/* ② Scrollable body (banner + graph + table) – ONE scroll context */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {scrollable}
            </div>

            {/* ③ Fixed Step Controller — no extra border wrapper, StepController owns its top edge */}
            {stepController && (
              <div className="shrink-0">
                {stepController}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Right Panel (code + problems) ── */}
      {rightPanel}
    </div>
  );
}
