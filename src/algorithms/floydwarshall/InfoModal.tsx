import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartVisualization: () => void;
}

export default function FWInfoModal({ isOpen, onClose, onStartVisualization }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 text-white shrink-0 bg-gradient-to-r from-violet-600 to-indigo-600">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-1">플로이드-워셜 알고리즘</h2>
                  <p className="text-violet-100 text-sm font-medium">모든 노드 쌍의 최단거리 — 동적 계획법 기반</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-700 dark:text-zinc-300">

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">문제 정의</h3>
                <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl p-4 text-[13px] leading-relaxed">
                  <strong>모든 쌍 최단경로 (All-Pairs Shortest Path)</strong> 문제:
                  그래프의 <strong>모든 노드 쌍 (i, j)</strong>에 대해 i에서 j까지의 최단 거리를 한 번에 구합니다.
                  음수 간선도 처리 가능하며, 음수 사이클이 있으면 이를 감지합니다.
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">핵심 아이디어 — 경유 노드 DP</h3>
                <p className="leading-relaxed text-[13px]">
                  "경유할 수 있는 노드 집합을 하나씩 늘려가며" 최단거리를 갱신합니다.
                </p>
                <div className="mt-2 font-mono text-[12px] bg-zinc-100 dark:bg-zinc-800 rounded-lg p-3 leading-relaxed">
                  <span className="text-violet-600 dark:text-violet-400 font-bold">for k in 0..V:</span><br />
                  {'  '}<span className="text-blue-500">for i in 0..V:</span><br />
                  {'    '}<span className="text-orange-500">for j in 0..V:</span><br />
                  {'      '}dist[i][j] = <span className="text-green-600 dark:text-green-400 font-bold">min(dist[i][j], dist[i][k] + dist[k][j])</span>
                </div>
                <p className="mt-2 text-[12px] text-muted-foreground leading-relaxed">
                  k=0 라운드가 끝나면 "노드 0만 경유할 때의 최단거리", k=1이 끝나면 "노드 0과 1을 경유할 때의 최단거리"가 확정됩니다.
                  V번 반복하면 모든 경유 노드를 고려한 최단거리가 완성됩니다.
                </p>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">다익스트라 vs 벨만-포드 vs 플로이드-워셜</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[12px]">
                    <thead>
                      <tr className="border-b-2 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white">
                        <th className="py-2 pr-3">특징</th>
                        <th className="py-2 pr-3 text-amber-600 dark:text-amber-400">다익스트라</th>
                        <th className="py-2 pr-3 text-rose-600 dark:text-rose-400">벨만-포드</th>
                        <th className="py-2 text-violet-600 dark:text-violet-400">플로이드-워셜</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {[
                        ['출발점',     '단일 출발',    '단일 출발',    '모든 쌍'],
                        ['음수 간선',  '❌ 불가',      '✅ 가능',      '✅ 가능'],
                        ['음수 사이클','❌ 감지 불가',  '✅ 감지 가능', '✅ 감지 가능'],
                        ['시간복잡도', 'O((V+E)logV)', 'O(V·E)',       'O(V³)'],
                        ['공간복잡도', 'O(V)',          'O(V)',         'O(V²)'],
                        ['구현 난이도','중',           '중',           '쉬움 (3중 반복문)'],
                      ].map(([feat, dij, bf, fw]) => (
                        <tr key={feat}>
                          <td className="py-2 pr-3 font-medium">{feat}</td>
                          <td className="py-2 pr-3">{dij}</td>
                          <td className="py-2 pr-3">{bf}</td>
                          <td className="py-2 font-semibold text-violet-600 dark:text-violet-400">{fw}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">복잡도</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold font-mono text-violet-600 dark:text-violet-400">O(V³)</div>
                    <div className="text-[11px] text-muted-foreground mt-1">시간 복잡도</div>
                    <div className="text-[11px] text-muted-foreground">3중 for문</div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400">O(V²)</div>
                    <div className="text-[11px] text-muted-foreground mt-1">공간 복잡도</div>
                    <div className="text-[11px] text-muted-foreground">V×V 행렬</div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">음수 사이클 감지 원리</h3>
                <p className="leading-relaxed text-[13px]">
                  정상적인 그래프에서 자기 자신으로의 최단거리는 항상 0입니다.
                  알고리즘 수행 후 <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">dist[i][i] &lt; 0</code>인 노드가 있다면,
                  그 노드를 포함하는 음수 사이클이 존재한다는 의미입니다.
                </p>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">경로 추적 (Path Reconstruction)</h3>
                <p className="leading-relaxed text-[13px]">
                  거리 행렬과 함께 <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">next[i][j]</code> 배열을 관리합니다.
                  dist[i][j]가 갱신될 때 <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">next[i][j] = next[i][k]</code>로 업데이트합니다.
                  알고리즘 완료 후 next 배열을 따라가면 실제 경로를 복원할 수 있습니다.
                </p>
              </section>

            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-zinc-50 dark:bg-zinc-900/50 shrink-0 flex justify-between">
              <button onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors text-zinc-700 dark:text-zinc-300">
                닫기
              </button>
              <button
                onClick={() => { onClose(); onStartVisualization(); }}
                className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                시각화 시작 →
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
