import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartVisualization: () => void;
}

export default function PrimInfoModal({ isOpen, onClose, onStartVisualization }: Props) {
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
            <div className="p-6 text-white shrink-0 bg-gradient-to-r from-sky-600 to-cyan-600">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-1">프림 알고리즘 (Prim)</h2>
                  <p className="text-sky-100 text-sm font-medium">우선순위 큐로 현재 트리에서 가장 가까운 노드를 반복 확장</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-700 dark:text-zinc-300">

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">MST(최소 신장 트리)란?</h3>
                <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-xl p-4 text-[13px] leading-relaxed">
                  그래프의 모든 노드를 <strong>사이클 없이</strong> 연결하되, 사용한 간선의 <strong>총 가중치가 최소</strong>인 트리입니다.
                  N개 노드를 연결하는 MST는 정확히 <strong>N−1개의 간선</strong>으로 구성됩니다.
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">프림 핵심 아이디어</h3>
                <ol className="space-y-2 text-[13px] leading-relaxed list-decimal list-inside">
                  <li>임의의 시작 노드(0번)를 MST에 포함 — <code className="bg-muted px-1 rounded text-[12px]">key[0] = 0</code></li>
                  <li>현재 MST와 연결된 모든 후보 간선을 <strong>우선순위 큐</strong>에 관리</li>
                  <li>큐에서 <strong>key가 가장 작은 노드</strong> 꺼냄</li>
                  <li>이미 MST에 포함됐으면 스킵 (지연 삭제)</li>
                  <li>MST에 추가 후, 미방문 인접 노드의 key값 <strong>갱신</strong></li>
                  <li>N−1개 간선이 모이면 완성</li>
                </ol>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">다익스트라와의 차이</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl p-4">
                    <p className="font-bold text-violet-700 dark:text-violet-300 text-[13px] mb-1">다익스트라</p>
                    <p className="text-[12px] leading-relaxed">
                      <code className="bg-muted px-1 rounded">dist[v] = dist[u] + w</code><br/>
                      시작 노드에서의 <strong>누적 최단 거리</strong>를 최소화
                    </p>
                  </div>
                  <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-xl p-4">
                    <p className="font-bold text-sky-700 dark:text-sky-300 text-[13px] mb-1">프림</p>
                    <p className="text-[12px] leading-relaxed">
                      <code className="bg-muted px-1 rounded">key[v] = w</code> (간선 가중치만)<br/>
                      현재 트리에 연결하는 <strong>간선 가중치</strong>를 최소화
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">크루스칼 vs 프림</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px] border-separate [border-spacing:0]">
                    <thead>
                      <tr className="border-b-2 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white">
                        <th className="py-2 pr-4">특징</th>
                        <th className="py-2 pr-4 text-emerald-600 dark:text-emerald-400">크루스칼</th>
                        <th className="py-2 text-sky-600 dark:text-sky-400">프림</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {[
                        ['탐색 기준', '간선(Edge) 기준', '노드(Vertex) 기준'],
                        ['자료구조', 'Union-Find', '우선순위 큐'],
                        ['적합한 그래프', '희소 그래프 (E ≪ V²)', '밀집 그래프 (E ≈ V²)'],
                        ['시간복잡도', 'O(E log E)', 'O(E log V)'],
                        ['MST 결과', '동일', '동일'],
                      ].map(([feat, k, p]) => (
                        <tr key={feat}>
                          <td className="py-2.5 pr-4 font-medium">{feat}</td>
                          <td className="py-2.5 pr-4">{k}</td>
                          <td className="py-2.5">{p}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">시간 복잡도</h3>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex-1 min-w-[140px] bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">시간 복잡도</p>
                    <p className="font-bold text-lg font-mono text-sky-600 dark:text-sky-400">O(E log V)</p>
                    <p className="text-[11px] text-zinc-500 mt-1">heapq 연산이 병목 (E번 push/pop)</p>
                  </div>
                  <div className="flex-1 min-w-[140px] bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">공간 복잡도</p>
                    <p className="font-bold text-lg font-mono text-sky-600 dark:text-sky-400">O(V + E)</p>
                    <p className="text-[11px] text-zinc-500 mt-1">key/parent/in_mst 배열 O(V), 큐 O(E)</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-zinc-50 dark:bg-zinc-900/50 shrink-0 flex justify-between">
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors text-zinc-700 dark:text-zinc-300"
              >
                닫기
              </button>
              <button
                onClick={() => { onClose(); onStartVisualization(); }}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg transition-colors"
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
