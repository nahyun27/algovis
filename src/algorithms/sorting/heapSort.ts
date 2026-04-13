import type { SortStep } from './types';

export function generateHeapSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const n = arr.length;
  const steps: SortStep[] = [];
  const sorted: number[] = [];
  let compares = 0, swaps = 0;

  const snap = (type: SortStep['type'], desc: string, codeLine: number, comparing: number[] = [], swapping: number[] = [], hs?: number): void => {
    steps.push({ type, array: [...arr], comparing, swapping, sorted: [...sorted], pivot: null, description: desc, codeLine, compares, swaps, heapSize: hs ?? n });
  };

  snap('INIT', '힙 정렬 시작 — 먼저 최대 힙 구축', 1, [], [], n);

  function heapify(size: number, root: number) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      compares++;
      snap('COMPARE', `arr[${left}]=${arr[left]}와 arr[${largest}]=${arr[largest]} 비교`, 10, [left, largest], [], size);
      if (arr[left] > arr[largest]) largest = left;
    }
    if (right < size) {
      compares++;
      snap('COMPARE', `arr[${right}]=${arr[right]}와 arr[${largest}]=${arr[largest]} 비교`, 12, [right, largest], [], size);
      if (arr[right] > arr[largest]) largest = right;
    }
    if (largest !== root) {
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      swaps++;
      snap('SWAP', `arr[${root}]과 arr[${largest}] 교환 (heapify)`, 15, [], [root, largest], size);
      heapify(size, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }
  snap('COMPARE', '최대 힙 구축 완료', 3, [], [], n);

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    swaps++;
    sorted.push(i);
    snap('SWAP', `최댓값 arr[0]=${arr[i]}를 끝으로 이동 → 인덱스 ${i} 확정`, 5, [], [0, i], i);
    heapify(i, 0);
  }
  sorted.push(0);
  snap('DONE', `힙 정렬 완료! 비교 ${compares}회, 교환 ${swaps}회`, 6, [], [], 0);
  return steps;
}
