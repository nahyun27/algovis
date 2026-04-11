import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartVisualization: () => void;
}

export default function TopoInfoModal({ isOpen, onClose, onStartVisualization }: Props) {
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
                  <h2 className="text-2xl font-bold tracking-tight mb-1">위상정렬 (Topological Sort)</h2>
                  <p className="text-violet-100 text-sm font-medium">DAG에서 선행 관계를 만족하는 노드 순서 결정</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-700 dark:text-zinc-300">

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">위상정렬이란?</h3>
                <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl p-4 text-[13px] leading-relaxed">
                  방향 비순환 그래프(DAG)에서 각 노드를 <strong>선행 관계를 위반하지 않는 순서</strong>로 나열하는 것입니다.
                  즉, 간선 u → v가 있으면 정렬 결과에서 u는 반드시 v 앞에 위치해야 합니다.
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">실생활 예시</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: '🎓', title: '수강신청 선수과목', desc: '미적분 → 선형대수 → 알고리즘 순서로 이수해야 하는 커리큘럼' },
                    { icon: '🔨', title: '빌드 시스템 의존성', desc: 'make, gradle 등에서 파일 A가 B에 의존할 때 B를 먼저 컴파일' },
                    { icon: '📦', title: '패키지 설치 순서', description: 'npm, pip 등에서 의존 패키지를 먼저 설치한 뒤 상위 패키지 설치' },
                    { icon: '🗓️', title: '프로젝트 일정 계획', desc: '선행 작업이 끝나야 다음 작업을 시작할 수 있는 태스크 순서 결정' },
                  ].map(item => (
                    <div key={item.title} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 flex gap-3">
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-[13px] text-zinc-900 dark:text-white">{item.title}</p>
                        <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mt-0.5">{item.desc ?? (item as { description?: string }).description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">칸의 알고리즘 vs DFS 방식</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[13px]">
                    <thead>
                      <tr className="border-b-2 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white">
                        <th className="py-2 pr-4">특징</th>
                        <th className="py-2 pr-4 text-sky-600 dark:text-sky-400">칸의 알고리즘 (BFS)</th>
                        <th className="py-2 text-emerald-600 dark:text-emerald-400">DFS 방식</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {[
                        ['핵심 자료구조', '큐 (Queue)', '스택 (재귀 호출)'],
                        ['진행 방향', '진입차수 0 노드부터 처리', '깊이 우선으로 후위 순서 push'],
                        ['사이클 감지', '결과 수 ≠ 전체 노드 수', 'in_stack 배열로 back edge 탐지'],
                        ['직관성', '단계가 명확해 이해하기 쉬움', '재귀 구조 익숙하면 간결'],
                        ['시간복잡도', 'O(V + E)', 'O(V + E)'],
                      ].map(([feat, kahn, dfs]) => (
                        <tr key={feat}>
                          <td className="py-2.5 pr-4 font-medium">{feat}</td>
                          <td className="py-2.5 pr-4">{kahn}</td>
                          <td className="py-2.5">{dfs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">사이클이 있으면 위상정렬이 불가능한 이유</h3>
                <p className="leading-relaxed">
                  A → B → C → A 처럼 순환이 존재하면, A를 출력하려면 C가 앞에 와야 하고, C를 출력하려면 B가, B를 출력하려면 A가 먼저 와야 합니다.
                  이 모순을 해결할 순서가 없으므로 <strong>위상정렬이 정의되지 않습니다.</strong>
                  이 때문에 위상정렬의 입력은 반드시 <strong>방향 비순환 그래프(DAG)</strong>여야 합니다.
                </p>
                <div className="mt-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-3 text-[12px] font-mono text-rose-700 dark:text-rose-300">
                  A → B → C → A &nbsp;(사이클 ❌ 위상정렬 불가)
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">시간 복잡도</h3>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex-1 min-w-[140px] bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">시간 복잡도</p>
                    <p className="font-bold text-lg font-mono text-violet-600 dark:text-violet-400">O(V + E)</p>
                    <p className="text-[11px] text-zinc-500 mt-1">모든 노드와 간선을 한 번씩 처리</p>
                  </div>
                  <div className="flex-1 min-w-[140px] bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">공간 복잡도</p>
                    <p className="font-bold text-lg font-mono text-violet-600 dark:text-violet-400">O(V + E)</p>
                    <p className="text-[11px] text-zinc-500 mt-1">인접 리스트, 큐/스택, in_degree 배열</p>
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
