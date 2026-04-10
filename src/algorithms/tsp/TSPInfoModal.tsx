import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, AlertTriangle, Lightbulb, Clock } from 'lucide-react';

interface TSPInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartVisualization: () => void;
}

export default function TSPInfoModal({ isOpen, onClose, onStartVisualization }: TSPInfoModalProps) {
  const handleStart = () => {
    onClose();
    onStartVisualization();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
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
              {/* Header gradient bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable content */}
              <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto space-y-6">
                {/* Title */}
                <div className="pr-8">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h2 className="text-xl font-extrabold tracking-tight">
                      외판원 순회 문제 (TSP)
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground ml-12">
                    Traveling Salesperson Problem — 조합 최적화의 대표 NP-hard 문제
                  </p>
                </div>

                <hr className="border-border" />

                {/* 문제 정의 */}
                <section className="space-y-3">
                  <h3 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] flex items-center justify-center font-black">1</span>
                    문제 정의
                  </h3>
                  <p className="text-sm leading-relaxed">
                    <strong>N개 도시</strong>를 모두 한 번씩만 방문하고 출발 도시로 돌아오는 경로 중
                    총 이동 비용(거리)이 최소인 경로를 구하는 문제입니다.
                  </p>
                  <div className="bg-muted/50 rounded-xl p-4 text-sm font-mono border">
                    <p className="text-muted-foreground mb-1 text-xs font-sans font-semibold">예시 — 도시 4개</p>
                    <p>가능한 경로 수 = <span className="text-indigo-600 dark:text-indigo-400 font-bold">(4-1)! = 6</span>가지</p>
                    <p className="text-muted-foreground text-xs mt-2">
                      0→1→2→3→0 &nbsp;|&nbsp; 0→1→3→2→0 &nbsp;|&nbsp; 0→2→1→3→0<br/>
                      0→2→3→1→0 &nbsp;|&nbsp; 0→3→1→2→0 &nbsp;|&nbsp; 0→3→2→1→0
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* 왜 어려운가 */}
                <section className="space-y-3">
                  <h3 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-black">2</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    왜 어려운가?
                  </h3>
                  <p className="text-sm leading-relaxed">
                    완전 탐색(브루트포스)으로 풀면 경우의 수가 <strong>N!로 폭발적으로 증가</strong>합니다.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border rounded-xl overflow-hidden">
                      <thead>
                        <tr className="bg-muted/60 text-muted-foreground text-xs">
                          <th className="px-4 py-2 text-left font-semibold">도시 수 N</th>
                          <th className="px-4 py-2 text-left font-semibold">경우의 수 (N-1)!</th>
                          <th className="px-4 py-2 text-left font-semibold">비고</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {[
                          { n: 4,  count: "6",              note: "✅ 즉시 계산" },
                          { n: 10, count: "362,880",        note: "✅ 빠름" },
                          { n: 15, count: "약 1.3조",       note: "⚠️ 수십 분" },
                          { n: 20, count: "약 1.2 × 10¹⁷", note: "❌ 수백 년" },
                        ].map(row => (
                          <tr key={row.n} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-2 font-mono font-bold">{row.n}</td>
                            <td className={`px-4 py-2 font-mono ${row.n >= 15 ? 'text-rose-600 dark:text-rose-400 font-bold' : ''}`}>{row.count}</td>
                            <td className="px-4 py-2 text-xs text-muted-foreground">{row.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <hr className="border-border" />

                {/* 핵심 아이디어 */}
                <section className="space-y-3">
                  <h3 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-black">3</span>
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-500" />
                    핵심 아이디어
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
                      <p className="font-bold text-indigo-700 dark:text-indigo-300 text-sm mb-1">🔢 비트마스크</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        N개 도시의 방문 여부를 <code className="bg-muted px-1 rounded">N비트 정수</code> 하나로 표현합니다.<br/>
                        예: <code className="bg-muted px-1 rounded">0b0111</code> → 도시 0, 1, 2 방문 완료
                      </p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                      <p className="font-bold text-emerald-700 dark:text-emerald-300 text-sm mb-1">♻️ 동적 프로그래밍</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        부분 문제 <code className="bg-muted px-1 rounded">dp[mask][i]</code>의 결과를 저장해<br/>
                        중복 계산을 제거하고 지수 시간을 다항 수준으로 줄입니다.
                      </p>
                    </div>
                  </div>
                </section>

                <hr className="border-border" />

                {/* 복잡도 */}
                <section className="space-y-3">
                  <h3 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-black">4</span>
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    복잡도
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
                      <span className="text-xs text-muted-foreground font-semibold">시간</span>
                      <code className="text-sm font-bold font-mono text-amber-700 dark:text-amber-300">O(N² × 2ᴺ)</code>
                    </div>
                    <div className="flex items-center gap-2 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-xl px-4 py-3">
                      <span className="text-xs text-muted-foreground font-semibold">공간</span>
                      <code className="text-sm font-bold font-mono text-sky-700 dark:text-sky-300">O(N × 2ᴺ)</code>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">N=20이면 이조차 수 GB의 메모리가 필요해 실용적 한계는 N≈20 수준입니다.</p>
                </section>
              </div>

              {/* Footer CTA */}
              <div className="border-t px-6 md:px-8 py-4 flex justify-end gap-3 bg-muted/20">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-muted/60 transition-colors"
                >
                  닫기
                </button>
                <button
                  onClick={handleStart}
                  className="px-5 py-2 rounded-lg text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all shadow-sm"
                >
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
