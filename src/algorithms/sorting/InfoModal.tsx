import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SortAlgorithm } from './types';
import { SORT_LABELS } from './types';

/* ─── Per-algorithm detail content ─── */

const ALGO_DETAILS: Record<SortAlgorithm, { gradient: string; sections: { title: string; body: string }[]; complexity: string[] }> = {
  bubble: {
    gradient: 'from-red-500 to-rose-500',
    sections: [
      { title: '동작 원리', body: '인접한 두 원소를 비교해 순서가 잘못되면 교환합니다. 한 패스가 끝나면 가장 큰 값이 배열 끝으로 "버블"처럼 떠오릅니다. 이 과정을 N-1회 반복하면 정렬이 완성됩니다.' },
      { title: '왜 느린가?', body: '모든 인접 쌍을 매 패스마다 비교하므로 비교 횟수가 O(n²)입니다. 이미 정렬된 원소도 반복 검사합니다.' },
      { title: '조기 종료 최적화', body: '한 패스에서 교환이 한 번도 일어나지 않으면 이미 정렬된 것이므로 즉시 종료합니다. 이 경우 최선 시간복잡도는 O(n)입니다.' },
      { title: '언제 쓰는가?', body: '교육 목적, 아주 작은 배열(N < 10), 거의 정렬된 데이터에서 간단하게 쓸 때 적합합니다.' },
    ],
    complexity: ['O(n)', 'O(n²)', 'O(n²)', 'O(1)', '안정'],
  },
  selection: {
    gradient: 'from-amber-500 to-orange-500',
    sections: [
      { title: '동작 원리', body: '남은 구간에서 최솟값을 찾아 현재 위치와 교환합니다. 매 회전마다 정렬 확정 구간이 1칸씩 늘어납니다.' },
      { title: '불안정 정렬인 이유', body: '최솟값을 찾아 교환할 때, 동일한 값의 상대 순서가 바뀔 수 있습니다. 예: [4a, 3, 4b, 1] → [1, 3, 4b, 4a]로 4a와 4b 순서가 뒤바뀜.' },
      { title: '교환 횟수가 적다', body: '비교는 O(n²)이지만 교환은 최대 O(n)입니다. 쓰기 비용이 비싼 환경(플래시 메모리 등)에서 유리합니다.' },
    ],
    complexity: ['O(n²)', 'O(n²)', 'O(n²)', 'O(1)', '불안정'],
  },
  insertion: {
    gradient: 'from-emerald-500 to-teal-500',
    sections: [
      { title: '동작 원리', body: '정렬된 구간의 올바른 위치에 새 원소를 삽입합니다. 카드 게임에서 손에 든 카드를 정렬하는 것과 같은 원리입니다.' },
      { title: '거의 정렬된 배열에서 강점', body: '이미 거의 정렬된 데이터에서는 이동이 거의 없어 O(n)에 가까운 성능을 보입니다. 이것이 삽입 정렬의 최대 장점입니다.' },
      { title: '온라인 알고리즘', body: '데이터가 하나씩 들어와도 즉시 정렬할 수 있습니다. 스트리밍 데이터 처리에 적합합니다.' },
      { title: '실전 활용', body: 'Python의 Tim Sort, Java의 Arrays.sort()는 작은 구간에 삽입 정렬을 사용합니다. 소규모(N < 64)에서 오버헤드 없이 빠릅니다.' },
    ],
    complexity: ['O(n)', 'O(n²)', 'O(n²)', 'O(1)', '안정'],
  },
  merge: {
    gradient: 'from-blue-500 to-indigo-500',
    sections: [
      { title: '분할 정복 원리', body: '배열을 반으로 나누고, 각각을 재귀적으로 정렬한 뒤, 두 정렬된 부분을 하나로 병합합니다. "나눠서 풀고, 합치면서 정렬"하는 전략입니다.' },
      { title: '안정 정렬', body: '같은 값의 원소는 원래 순서가 유지됩니다. 데이터베이스 정렬 등에서 중요한 성질입니다.' },
      { title: '추가 메모리 O(n)', body: '병합 과정에서 임시 배열이 필요합니다. 이것이 병합 정렬의 가장 큰 단점으로, 메모리가 제한된 환경에서는 주의해야 합니다.' },
      { title: '항상 O(n log n)', body: '입력 데이터와 무관하게 최선/평균/최악 모두 O(n log n)입니다. 성능이 예측 가능한 안정적인 알고리즘입니다.' },
    ],
    complexity: ['O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', '안정'],
  },
  quick: {
    gradient: 'from-violet-500 to-purple-500',
    sections: [
      { title: '피벗과 파티션', body: '피벗을 선택하고, 피벗보다 작은 값은 왼쪽, 큰 값은 오른쪽으로 분리(파티션)합니다. 피벗은 최종 위치에 확정되고, 양쪽을 재귀 정렬합니다.' },
      { title: '실전 최강의 정렬', body: '평균 O(n log n)이며, 캐시 지역성이 우수하고 상수 계수가 작아 같은 O(n log n)인 병합·힙 정렬보다 실측에서 빠릅니다.' },
      { title: '최악 O(n²) 주의', body: '이미 정렬된 배열에서 매번 끝 원소를 피벗으로 잡으면 파티션이 극단적으로 불균형해져 O(n²)이 됩니다.' },
      { title: '피벗 선택 전략', body: '랜덤 피벗, median-of-three 등으로 최악을 회피합니다. 실전 라이브러리는 이 전략들을 조합하여 사용합니다.' },
    ],
    complexity: ['O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)', '불안정'],
  },
  heap: {
    gradient: 'from-cyan-500 to-sky-500',
    sections: [
      { title: '힙 자료구조', body: '완전 이진 트리로 부모가 자식보다 항상 크거나 같은(최대 힙) 성질을 가집니다. 배열로 표현 시 인덱스 i의 자식은 2i+1, 2i+2입니다.' },
      { title: 'Heapify 과정', body: '한 노드를 자식과 비교해 필요시 교환하고 재귀적으로 내려갑니다. 배열 전체를 힙으로 만드는 Build Heap은 O(n)에 가능합니다.' },
      { title: 'O(n log n) 보장', body: '최선/평균/최악 모두 O(n log n)이며 추가 메모리 O(1)로 in-place 정렬입니다. 최악 성능이 보장되어야 할 때 적합합니다.' },
      { title: '단점', body: '캐시 지역성이 나쁘고(트리 구조 접근) 불안정 정렬이라 실전에서는 퀵 정렬보다 느린 경우가 많습니다.' },
    ],
    complexity: ['O(n log n)', 'O(n log n)', 'O(n log n)', 'O(1)', '불안정'],
  },
};

/* ─── Individual algorithm modal ─── */

interface AlgoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartVisualization: () => void;
  algorithm: SortAlgorithm;
}

export function SortAlgoModal({ isOpen, onClose, onStartVisualization, algorithm }: AlgoModalProps) {
  const detail = ALGO_DETAILS[algorithm];
  const label = SORT_LABELS[algorithm];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[85vh]"
          >
            <div className={`p-5 sm:p-6 text-white shrink-0 bg-gradient-to-r ${detail.gradient}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-0.5">{label.kor}</h2>
                  <p className="text-white/80 text-sm font-medium">{label.name}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors"><X size={20} /></button>
              </div>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm text-zinc-700 dark:text-zinc-300">
              {detail.sections.map(s => (
                <section key={s.title}>
                  <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white mb-1.5">{s.title}</h3>
                  <p className="text-[13px] leading-relaxed">{s.body}</p>
                </section>
              ))}

              <section>
                <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white mb-2">복잡도</h3>
                <div className="flex gap-2 flex-wrap">
                  {['최선', '평균', '최악', '공간', '안정'].map((label, i) => (
                    <div key={label} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg px-3 py-2 text-center min-w-[80px]">
                      <p className="text-[10px] text-muted-foreground mb-0.5">{label}</p>
                      <p className="font-bold font-mono text-sm">{detail.complexity[i]}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="p-4 border-t bg-zinc-50 dark:bg-zinc-900/50 shrink-0 flex justify-between">
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors text-zinc-700 dark:text-zinc-300">닫기</button>
              <button onClick={() => { onClose(); onStartVisualization(); }}
                className={`px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-colors bg-gradient-to-r ${detail.gradient} hover:opacity-90`}>
                시각화 시작 →
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Comparison table modal ─── */

const COMPLEXITY = [
  ['버블',   'O(n)',      'O(n²)',     'O(n²)',     'O(1)', '안정'],
  ['선택',   'O(n²)',     'O(n²)',     'O(n²)',     'O(1)', '불안정'],
  ['삽입',   'O(n)',      'O(n²)',     'O(n²)',     'O(1)', '안정'],
  ['병합',   'O(n log n)','O(n log n)','O(n log n)','O(n)', '안정'],
  ['퀵',     'O(n log n)','O(n log n)','O(n²)',     'O(log n)', '불안정'],
  ['힙',     'O(n log n)','O(n log n)','O(n log n)','O(1)', '불안정'],
];

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SortCompareModal({ isOpen, onClose }: CompareModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[85vh]"
          >
            <div className="p-5 sm:p-6 text-white shrink-0 bg-gradient-to-r from-rose-500 to-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-0.5">정렬 알고리즘 비교</h2>
                  <p className="text-rose-100 text-sm font-medium">6가지 정렬의 복잡도와 특성 비교</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors"><X size={20} /></button>
              </div>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-zinc-700 dark:text-zinc-300">
              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">복잡도 비교표</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px] text-left border-separate [border-spacing:0]">
                    <thead>
                      <tr className="border-b-2 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white">
                        <th className="py-2 pr-3">알고리즘</th><th className="py-2 pr-3">최선</th><th className="py-2 pr-3">평균</th><th className="py-2 pr-3">최악</th><th className="py-2 pr-3">공간</th><th className="py-2">안정</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {COMPLEXITY.map(([name, best, avg, worst, space, stable]) => (
                        <tr key={name}>
                          <td className="py-2 pr-3 font-semibold">{name}</td>
                          <td className="py-2 pr-3 font-mono text-xs">{best}</td>
                          <td className="py-2 pr-3 font-mono text-xs">{avg}</td>
                          <td className="py-2 pr-3 font-mono text-xs">{worst}</td>
                          <td className="py-2 pr-3 font-mono text-xs">{space}</td>
                          <td className="py-2">{stable}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">한 줄 요약</h3>
                <div className="space-y-1.5 text-[13px]">
                  <p><strong>버블</strong> — 인접 비교·교환, 큰 값을 뒤로</p>
                  <p><strong>선택</strong> — 최솟값 찾아 앞으로</p>
                  <p><strong>삽입</strong> — 정렬 구간에 삽입</p>
                  <p><strong>병합</strong> — 분할 → 재귀 → 병합</p>
                  <p><strong>퀵</strong> — 피벗 파티션 → 재귀</p>
                  <p><strong>힙</strong> — 최대 힙 → 루트 추출</p>
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">언제 어떤 정렬?</h3>
                <div className="space-y-1.5 text-[13px] leading-relaxed">
                  <p><strong>소규모 (N &lt; 50)</strong> — 삽입 정렬</p>
                  <p><strong>안정 정렬</strong> — 병합 정렬</p>
                  <p><strong>평균 성능</strong> — 퀵 정렬 (실전 최강)</p>
                  <p><strong>최악 보장</strong> — 힙 / 병합 정렬</p>
                  <p><strong>메모리 제한</strong> — 힙 정렬 (in-place)</p>
                </div>
              </section>
            </div>

            <div className="p-4 border-t bg-zinc-50 dark:bg-zinc-900/50 shrink-0">
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors text-zinc-700 dark:text-zinc-300">닫기</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

