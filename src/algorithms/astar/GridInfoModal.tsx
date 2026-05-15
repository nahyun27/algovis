import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartVisualization: () => void;
}

export default function GridAStarInfoModal({ isOpen, onClose, onStartVisualization }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[85vh]"
          >
            <div className="p-6 text-white shrink-0 bg-gradient-to-r from-indigo-500 to-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-1">A* (격자 기반)</h2>
                  <p className="text-indigo-100 text-sm font-medium">맨해튼 휴리스틱으로 격자에서 최단 경로 탐색</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors"><X size={20} /></button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-sm text-zinc-700 dark:text-zinc-300">
              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">A* 핵심 공식</h3>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 border rounded-xl p-4 text-center font-mono text-base">
                  f(n) = g(n) + h(n)
                </div>
                <div className="mt-2 space-y-1 text-[13px]">
                  <p><strong>g(n)</strong> — 시작점에서 n까지 실제 비용</p>
                  <p><strong>h(n)</strong> — n에서 목표까지 예상 비용 (휴리스틱)</p>
                  <p><strong>f(n)</strong> — 총 추정 비용 (최소 f를 가진 셀을 우선 탐색)</p>
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">맨해튼 거리 (Manhattan)</h3>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 text-[13px] leading-relaxed">
                  <p className="font-mono text-center mb-2">h(r, c) = |r − goal.r| + |c − goal.c|</p>
                  격자에서 대각선 이동 없이 상하좌우만 가능할 때, <strong>관문 수의 최솟값</strong>입니다. 실제 거리보다 절대 크지 않으므로 (admissible) A*가 최단 경로를 보장합니다.
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">다익스트라와의 차이</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl p-4">
                    <p className="font-bold text-violet-700 dark:text-violet-300 text-[13px] mb-1">다익스트라</p>
                    <p className="text-[12px] leading-relaxed">h = 0 → 모든 방향으로 균등 확산. 셀을 골고루 많이 탐색.</p>
                  </div>
                  <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-xl p-4">
                    <p className="font-bold text-sky-700 dark:text-sky-300 text-[13px] mb-1">A* (Manhattan)</p>
                    <p className="text-[12px] leading-relaxed">h &gt; 0 → 목표 방향으로 집중 탐색. 같은 결과를 더 적은 셀로.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">Admissible 조건</h3>
                <p className="text-[13px] leading-relaxed">
                  h(n) ≤ 실제 남은 거리 — 즉 휴리스틱이 <strong>실제 비용을 과대평가하지 않아야</strong> 최적해 보장. 맨해튼 거리는 항상 이를 만족합니다 (대각선 없으므로 실제 최단).
                </p>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">시간 복잡도</h3>
                <p className="text-[13px] leading-relaxed">
                  최악 O(b<sup>d</sup>) (b=분기, d=깊이). 격자에서는 보통 다익스트라보다 훨씬 적은 셀만 탐색합니다.
                </p>
              </section>
            </div>

            <div className="p-4 border-t bg-zinc-50 dark:bg-zinc-900/50 shrink-0 flex justify-between">
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors text-zinc-700 dark:text-zinc-300">닫기</button>
              <button onClick={() => { onClose(); onStartVisualization(); }} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors">
                시각화 시작 →
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
