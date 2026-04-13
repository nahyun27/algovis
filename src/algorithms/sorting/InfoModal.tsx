import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartVisualization: () => void;
}

const COMPLEXITY = [
  ['버블',   'O(n)',      'O(n²)',     'O(n²)',     'O(1)', '안정'],
  ['선택',   'O(n²)',     'O(n²)',     'O(n²)',     'O(1)', '불안정'],
  ['삽입',   'O(n)',      'O(n²)',     'O(n²)',     'O(1)', '안정'],
  ['병합',   'O(n log n)','O(n log n)','O(n log n)','O(n)', '안정'],
  ['퀵',     'O(n log n)','O(n log n)','O(n²)',     'O(log n)', '불안정'],
  ['힙',     'O(n log n)','O(n log n)','O(n log n)','O(1)', '불안정'],
];

export default function SortingInfoModal({ isOpen, onClose, onStartVisualization }: Props) {
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
            <div className="p-6 text-white shrink-0 bg-gradient-to-r from-rose-500 to-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-1">정렬 알고리즘</h2>
                  <p className="text-rose-100 text-sm font-medium">6가지 정렬의 동작 원리를 비교하며 이해하기</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-700 dark:text-zinc-300">
              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">각 알고리즘 한 줄 요약</h3>
                <div className="space-y-1.5 text-[13px]">
                  <p><strong>버블 정렬</strong> — 인접한 두 원소를 반복 비교·교환하여 큰 값을 뒤로 밀어냄</p>
                  <p><strong>선택 정렬</strong> — 매 회전마다 남은 구간에서 최솟값을 찾아 앞으로 이동</p>
                  <p><strong>삽입 정렬</strong> — 정렬된 구간에 새 원소를 올바른 위치에 삽입</p>
                  <p><strong>병합 정렬</strong> — 배열을 반씩 분할 후 정렬된 두 부분을 병합 (분할 정복)</p>
                  <p><strong>퀵 정렬</strong> — 피벗 기준으로 파티션 후 재귀 정렬 (분할 정복)</p>
                  <p><strong>힙 정렬</strong> — 최대 힙을 구축한 뒤 루트를 반복 추출</p>
                </div>
              </section>

              <section>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">복잡도 비교표</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px] text-left border-separate [border-spacing:0]">
                    <thead>
                      <tr className="border-b-2 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white">
                        <th className="py-2 pr-3">알고리즘</th>
                        <th className="py-2 pr-3">최선</th>
                        <th className="py-2 pr-3">평균</th>
                        <th className="py-2 pr-3">최악</th>
                        <th className="py-2 pr-3">공간</th>
                        <th className="py-2">안정</th>
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
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">언제 어떤 정렬?</h3>
                <div className="space-y-1.5 text-[13px] leading-relaxed">
                  <p><strong>소규모 데이터 (N &lt; 50)</strong> — 삽입 정렬이 상수 오버헤드가 적어 빠름</p>
                  <p><strong>안정 정렬 필요</strong> — 병합 정렬 (추가 메모리 허용 시)</p>
                  <p><strong>평균 성능 중시</strong> — 퀵 정렬 (실전 가장 빠름)</p>
                  <p><strong>최악 보장</strong> — 힙 정렬 또는 병합 정렬</p>
                  <p><strong>추가 메모리 불가</strong> — 힙 정렬 (in-place O(1))</p>
                </div>
              </section>
            </div>

            <div className="p-4 border-t bg-zinc-50 dark:bg-zinc-900/50 shrink-0 flex justify-between">
              <button onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors text-zinc-700 dark:text-zinc-300">
                닫기
              </button>
              <button
                onClick={() => { onClose(); onStartVisualization(); }}
                className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-lg transition-colors"
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
