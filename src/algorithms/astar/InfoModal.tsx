import { motion, AnimatePresence } from 'framer-motion';
import { X, Map, Zap, Clock } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartVisualization: () => void;
}

export default function InfoModal({ isOpen, onClose, onStartVisualization }: InfoModalProps) {
  const handleStart = () => { onClose(); onStartVisualization(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-2xl bg-card text-card-foreground rounded-2xl shadow-2xl border pointer-events-auto overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />

              <button onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto space-y-6">
                {/* Title */}
                <div className="pr-8">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                      <Map className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-xl font-extrabold tracking-tight">A* (A-Star) 알고리즘</h2>
                  </div>
                  <p className="text-sm text-muted-foreground ml-12">
                    A* Search Algorithm — 휴리스틱을 이용한 최단 경로 탐색
                  </p>
                </div>

                <hr className="border-border" />

                {/* 문제 정의 */}
                <section className="space-y-3">
                  <h3 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-[10px] flex items-center justify-center font-black">1</span>
                    문제 정의
                  </h3>
                  <p className="text-sm leading-relaxed">
                    다익스트라 알고리즘에 <strong>목표 지점까지의 예상 거리(휴리스틱)</strong> 개념을 추가한 경로 탐색 알고리즘입니다. 목적지를 향해 똑똑하게 탐색 범위를 줄여 효율성을 극대화합니다.
                  </p>
                  <div className="bg-muted/50 rounded-xl p-4 text-sm border flex flex-col gap-2">
                    <div className="p-2.5 bg-card rounded-lg border border-border flex items-center justify-between shadow-sm">
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-xs">g(x)</span>
                      <span className="text-muted-foreground text-xs text-right">출발점에서 노드까지의 실제 누적 비용</span>
                    </div>
                    <div className="p-2.5 bg-card rounded-lg border border-border flex items-center justify-between shadow-sm">
                      <span className="font-bold text-orange-600 dark:text-orange-400 text-xs">h(x)</span>
                      <span className="text-muted-foreground text-xs text-right">노드에서 목표점까지의 예상(휴리스틱) 비용</span>
                    </div>
                    <div className="p-2.5 bg-card rounded-lg border border-purple-200 dark:border-purple-800/50 flex items-center justify-between shadow-sm">
                      <span className="font-bold text-purple-600 dark:text-purple-400 text-xs">f(x) = g(x) + h(x)</span>
                      <span className="text-muted-foreground text-xs text-right">최단 경로를 찾기 위해 우선순위 큐에 담는 기준 값</span>
                    </div>
                  </div>
                </section>

                <hr className="border-border" />

                {/* 핵심 아이디어 */}
                <section className="space-y-3">
                  <h3 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center font-black">2</span>
                    <Zap className="w-3.5 h-3.5 text-pink-500" />
                    핵심 아이디어
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                      <p className="font-bold text-purple-700 dark:text-purple-300 text-sm mb-1">🧭 목적지 지향적</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        다익스트라는 원형으로 퍼져나가며 모든 방향을 탐색하지만, A*는 목적지 방향으로 나아가도록 휴리스틱이 유도합니다.
                      </p>
                    </div>
                    <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-xl p-4">
                      <p className="font-bold text-pink-700 dark:text-pink-300 text-sm mb-1">⭐ 허용성 (Admissibility)</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        최단 경로를 보장하기 위한 조건입니다. h(x)가 실제 남은 거리보다 과대평가되지 않아야만 완벽한 답을 찾아냅니다.
                      </p>
                    </div>
                  </div>
                </section>

                <hr className="border-border" />

                {/* 복잡도 */}
                <section className="space-y-3">
                  <h3 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-black">3</span>
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    평균 기대 복잡도
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
                      <span className="text-xs text-muted-foreground font-semibold">휴리스틱 시간</span>
                      <code className="text-sm font-bold font-mono text-amber-700 dark:text-amber-300">O(E)</code>
                    </div>
                    <div className="flex items-center gap-2 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-xl px-4 py-3">
                      <span className="text-xs text-muted-foreground font-semibold">공간</span>
                      <code className="text-sm font-bold font-mono text-sky-700 dark:text-sky-300">O(V)</code>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    💡 <strong>완벽한 휴리스틱 (h(x) = 실제거리)</strong> 을 안다면 무조건 최단 경로 노드만 방문하며 즉시 발견합니다! (O(V))
                  </p>
                </section>
              </div>

              <div className="border-t px-6 md:px-8 py-4 flex justify-end gap-3 bg-muted/20">
                <button onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-muted/60 transition-colors">
                  닫기
                </button>
                <button onClick={handleStart}
                  className="px-5 py-2 rounded-lg text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all shadow-sm">
                  ▶ 시각화 시작하기
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
