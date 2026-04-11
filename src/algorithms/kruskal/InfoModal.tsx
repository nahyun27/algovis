import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartVisualization: () => void;
}

export default function KruskalInfoModal({ isOpen, onClose, onStartVisualization }: Props) {
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
            {/* Header - green gradient */}
            <div className="p-6 text-white shrink-0 bg-gradient-to-r from-emerald-600 to-teal-600">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-1">크루스칼 알고리즘 (Kruskal)</h2>
                  <p className="text-emerald-100 text-sm font-medium">간선 정렬 + Union-Find로 MST(최소 신장 트리) 구축</p>
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
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-[13px] leading-relaxed">
                  그래프의 모든 노드를 <strong>사이클 없이</strong> 연결하되, 사용한 간선의 <strong>총 가중치가 최소</strong>인 트리입니다.
                  N개 노드를 연결하는 MST는 정확히 <strong>N−1개의 간선</strong>으로 구성됩니다.
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">크루스칼 핵심 아이디어</h3>
                <ol className="space-y-2 text-[13px] leading-relaxed list-decimal list-inside">
                  <li>모든 간선을 <strong>가중치 오름차순</strong>으로 정렬</li>
                  <li>가장 가벼운 간선부터 순서대로 검토</li>
                  <li><strong>Union-Find</strong>로 두 노드가 같은 컴포넌트인지 확인</li>
                  <li>같은 컴포넌트면 <strong>사이클 발생 → 스킵</strong></li>
                  <li>다른 컴포넌트면 <strong>MST에 추가 + Union</strong></li>
                  <li>MST 간선 수 = N−1이 되면 종료</li>
                </ol>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">Union-Find 핵심 연산</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <p className="font-bold text-blue-700 dark:text-blue-300 text-[13px] mb-1">Find (경로 압축)</p>
                    <p className="text-[12px] leading-relaxed">노드의 루트를 찾는 연산. 경로 압축으로 이후 조회를 O(1)에 가깝게 최적화.</p>
                    <code className="block mt-2 text-[11px] bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded font-mono">
                      parent[x] = find(parent[x])
                    </code>
                  </div>
                  <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl p-4">
                    <p className="font-bold text-violet-700 dark:text-violet-300 text-[13px] mb-1">Union (랭크 기반)</p>
                    <p className="text-[12px] leading-relaxed">두 집합을 합치는 연산. 랭크(트리 높이)가 낮은 쪽을 높은 쪽 아래에 붙여 트리를 얕게 유지.</p>
                    <code className="block mt-2 text-[11px] bg-violet-100 dark:bg-violet-900/40 px-2 py-1 rounded font-mono">
                      parent[ry] = rx
                    </code>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">크루스칼 vs 프림</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[13px]">
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
                        ['적합한 그래프', '희소 그래프 (E가 작을 때)', '밀집 그래프 (E가 클 때)'],
                        ['시간복잡도', 'O(E log E)', 'O(E log V)'],
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
                    <p className="font-bold text-lg font-mono text-emerald-600 dark:text-emerald-400">O(E log E)</p>
                    <p className="text-[11px] text-zinc-500 mt-1">간선 정렬이 병목 (Union-Find는 사실상 O(1))</p>
                  </div>
                  <div className="flex-1 min-w-[140px] bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">공간 복잡도</p>
                    <p className="font-bold text-lg font-mono text-emerald-600 dark:text-emerald-400">O(V + E)</p>
                    <p className="text-[11px] text-zinc-500 mt-1">parent/rank 배열 O(V), 간선 목록 O(E)</p>
                  </div>
                </div>
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
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors"
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
