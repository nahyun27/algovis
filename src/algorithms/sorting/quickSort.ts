import type { SortStep } from './types';

export function generateQuickSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const n = arr.length;
  const steps: SortStep[] = [];
  const sorted: number[] = [];
  let compares = 0, swaps = 0;

  const snap = (type: SortStep['type'], desc: string, codeLine: number, comparing: number[] = [], swapping: number[] = [], pivotIdx: number | null = null, range?: [number, number]): void => {
    steps.push({ type, array: [...arr], comparing, swapping, sorted: [...sorted], pivot: pivotIdx, activeRange: range, description: desc, codeLine, compares, swaps });
  };

  snap('INIT', '퀵 정렬 시작', 1);

  function quickSort(low: number, high: number) {
    if (low >= high) {
      if (low === high && !sorted.includes(low)) {
        sorted.push(low);
        snap('SORTED', `인덱스 ${low} 확정 (단일 원소)`, 4);
      }
      return;
    }
    const pivotIdx = partition(low, high);
    sorted.push(pivotIdx);
    snap('SORTED', `피벗 arr[${pivotIdx}]=${arr[pivotIdx]} 최종 위치 확정`, 4);
    quickSort(low, pivotIdx - 1);
    quickSort(pivotIdx + 1, high);
  }

  function partition(low: number, high: number): number {
    const pivotVal = arr[high];
    snap('PIVOT', `피벗 선택: arr[${high}]=${pivotVal}`, 9, [], [], high, [low, high]);
    let i = low - 1;
    for (let j = low; j < high; j++) {
      compares++;
      snap('COMPARE', `arr[${j}]=${arr[j]} <= 피벗 ${pivotVal}?`, 11, [j], [], high, [low, high]);
      if (arr[j] <= pivotVal) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
          snap('SWAP', `arr[${i}]과 arr[${j}] 교환`, 13, [], [i, j], high, [low, high]);
        }
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    snap('SWAP', `피벗을 위치 ${i + 1}에 배치`, 14, [], [i + 1, high], i + 1, [low, high]);
    return i + 1;
  }

  quickSort(0, n - 1);
  for (let i = 0; i < n; i++) if (!sorted.includes(i)) sorted.push(i);
  snap('DONE', `퀵 정렬 완료! 비교 ${compares}회, 교환 ${swaps}회`, 6);
  return steps;
}
