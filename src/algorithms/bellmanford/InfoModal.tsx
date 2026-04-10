import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartVisualization: () => void;
}

export default function BFInfoModal({ isOpen, onClose, onStartVisualization }: Props) {
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
            <div className="p-6 text-white shrink-0 bg-gradient-to-r from-rose-500 to-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-1">벨만-포드 알고리즘</h2>
                  <p className="text-rose-100 text-sm font-medium">음수 간선이 있는 그래프의 단일 출발점 최단경로</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-700 dark:text-zinc-300">

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">왜 다익스트라가 음수 간선에서 실패할까?</h3>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-[13px] leading-relaxed">
                  다익스트라는 <strong>그리디</strong>로 "지금까지 최소인 노드"를 확정합니다. 하지만 음수 간선이 있으면 나중에 더 좋은 경로가 생길 수 있어 이미 확정한 값이 틀릴 수 있습니다.
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">핵심 아이디어</h3>
                <p className="leading-relaxed">
                  노드 V개의 그래프에서 최단경로는 최대 <strong>V-1개의 간선</strong>을 사용합니다.
                  따라서 모든 간선을 V-1번 반복 완화하면 모든 최단경로가 확정됩니다.
                </p>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">다익스트라 vs 벨만-포드</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[13px]">
                    <thead>
                      <tr className="border-b-2 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white">
                        <th className="py-2 pr-4">특징</th>
                        <th className="py-2 pr-4 text-amber-600 dark:text-amber-400">다익스트라</th>
                        <th className="py-2 text-rose-600 dark:text-rose-400">벨만-포드</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {[
                        ['음수 간선',  '❌ 불가',  '✅ 가능'],
                        ['음수 사이클 감지', '❌ 불가', '✅ 가능'],
                        ['시간복잡도', 'O((V+E) log V)', 'O(V·E)'],
                        ['방식', '그리디 (우선순위 큐)', '완전 반복 완화'],
                      ].map(([feat, dij, bf]) => (
                        <tr key={feat}>
                          <td className="py-2.5 pr-4 font-medium">{feat}</td>
                          <td className="py-2.5 pr-4">{dij}</td>
                          <td className="py-2.5">{bf}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">음수 사이클 감지 원리</h3>
                <p className="leading-relaxed">
                  V-1번 반복 후 V번째 라운드에서도 거리가 갱신된다면,
                  즉 <code className="bg-zinc-200 dark:bg-zinc-700 px-1 rounded">dist[u] + w &lt; dist[v]</code>가 성립한다면 음수 사이클이 존재합니다.
                  이 경우 최단경로가 <strong>-∞</strong>로 수렴하므로 정의되지 않습니다.
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
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-lg transition-colors"
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
