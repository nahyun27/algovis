import { motion } from 'framer-motion';
import type { SortStep } from './types';

interface Props {
  step: SortStep;
}

function getBarColor(
  idx: number,
  step: SortStep,
): string {
  if (step.sorted.includes(idx)) return '#22c55e';       // green — sorted
  if (step.swapping.includes(idx)) return '#ef4444';      // red — swapping
  if (step.pivot === idx) return '#8b5cf6';               // purple — pivot
  if (step.comparing.length > 0 && step.comparing[0] === idx) return '#3b82f6'; // blue — compare left
  if (step.comparing.includes(idx)) return '#f97316';     // orange — compare right
  return '#94a3b8';                                        // slate — default
}

export default function ArrayCanvas({ step }: Props) {
  const { array } = step;
  const maxVal = Math.max(...array, 1);
  const n = array.length;
  const showValues = n <= 20;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Bars */}
      <div className="flex-1 flex items-end justify-center gap-[2px] sm:gap-1 px-2 sm:px-4 pb-1 min-h-[180px]">
        {array.map((val, idx) => {
          const heightPct = (val / maxVal) * 100;
          const color = getBarColor(idx, step);
          const isActive = step.comparing.includes(idx) || step.swapping.includes(idx) || step.pivot === idx;

          return (
            <motion.div
              key={idx}
              className="flex flex-col items-center flex-1 max-w-[48px]"
              style={{ height: '100%' }}
            >
              {/* Value label */}
              {showValues && (
                <motion.span
                  className="text-[9px] sm:text-[10px] font-bold mb-0.5 tabular-nums"
                  style={{ color }}
                  animate={{ scale: isActive ? 1.15 : 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {val}
                </motion.span>
              )}
              {/* Bar */}
              <div className="flex-1 w-full flex items-end">
                <motion.div
                  className="w-full rounded-t-sm"
                  style={{ backgroundColor: color }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Index labels */}
      {showValues && (
        <div className="flex justify-center gap-[2px] sm:gap-1 px-2 sm:px-4 pt-0.5 pb-1">
          {array.map((_, idx) => (
            <div key={idx} className="flex-1 max-w-[48px] text-center text-[8px] sm:text-[9px] text-muted-foreground tabular-nums">
              {idx}
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="flex justify-center gap-2 sm:gap-3 px-2 py-1.5 text-[9px] sm:text-[10px] text-muted-foreground font-medium flex-wrap border-t bg-muted/10">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: '#3b82f6' }} />비교(i)</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: '#f97316' }} />비교(j)</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: '#ef4444' }} />교환</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: '#8b5cf6' }} />피벗</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: '#22c55e' }} />확정</span>
      </div>
    </div>
  );
}
