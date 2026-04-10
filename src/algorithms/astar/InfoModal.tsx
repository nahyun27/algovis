import { X, Map } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartVisualization: () => void;
}

export default function InfoModal({ isOpen, onClose, onStartVisualization }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
         onClick={onClose}>
      <div className="bg-card w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]"
           onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Map size={24} />
            </div>
            <h2 className="text-xl font-bold tracking-tight">A* (A-Star) 알고리즘이란?</h2>
          </div>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6 text-sm text-muted-foreground">
          
          <section>
            <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
              🧭 휴리스틱 탐색 (Heuristic Search)
            </h3>
            <p className="leading-relaxed">
              A* 알고리즘은 다익스트라 알고리즘에 <strong>목표 지점까지의 예상 거리(휴리스틱)</strong> 개념을 추가한 최단 경로 탐색 알고리즘입니다. 목적지를 향해 똑똑하게 탐색 범위를 줄여 훨씬 빠르게 길을 찾습니다.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold text-foreground mb-3">핵심 수식: f(x) = g(x) + h(x)</h3>
            <div className="grid gap-3">
              <div className="p-3 bg-muted/50 rounded-lg border border-border/50">
                <span className="font-bold text-foreground text-blue-600 dark:text-blue-400">g(x)</span> : 출발점에서 노드 x까지의 <strong>실제 누적 비용</strong> (다익스트라와 동일)
              </div>
              <div className="p-3 bg-muted/50 rounded-lg border border-border/50">
                <span className="font-bold text-foreground text-orange-600 dark:text-orange-400">h(x)</span> : 노드 x에서 목표점까지의 <strong>예상(휴리스틱) 비용</strong> (유클리드 거리 등)
              </div>
              <div className="p-3 bg-muted/50 rounded-lg border border-border/50">
                <span className="font-bold text-foreground text-purple-600 dark:text-purple-400">f(x)</span> : 최종 예측 비용. A*는 이 값이 <strong>가장 작은 노드부터</strong> 우선 탐색합니다.
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-foreground mb-2">⭐ Admissible Heuristic (허용성)</h3>
            <p className="leading-relaxed">
              최단 경로를 보장받기 위해서는 필수 조건이 있습니다.
              바로 <strong>h(x)가 실제 남은 거리보다 크면 안 된다는 것</strong>입니다. 과대평가하지 않으면 A*는 항상 최적의 경로를 찾아냅니다!
            </p>
          </section>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border bg-card hover:bg-muted font-medium transition-colors"
            >
              닫기
            </button>
            <button
              onClick={() => { onClose(); onStartVisualization(); }}
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-colors"
            >
              시각화 보기
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
