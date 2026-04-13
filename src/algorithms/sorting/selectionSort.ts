import type { SortStep } from './types';

export function generateSelectionSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const n = arr.length;
  const steps: SortStep[] = [];
  const sorted: number[] = [];
  let compares = 0, swaps = 0;

  const snap = (type: SortStep['type'], desc: string, codeLine: number, comparing: number[] = [], swapping: number[] = []): void => {
    steps.push({ type, array: [...arr], comparing, swapping, sorted: [...sorted], pivot: null, description: desc, codeLine, compares, swaps });
  };

  snap('INIT', '선택 정렬 시작', 1);

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    snap('COMPARE', `i=${i}: 최솟값 탐색 시작 (현재 최소: arr[${minIdx}]=${arr[minIdx]})`, 4, [i]);
    for (let j = i + 1; j < n; j++) {
      compares++;
      snap('COMPARE', `arr[${j}]=${arr[j]}와 현재 최소 arr[${minIdx}]=${arr[minIdx]} 비교`, 6, [minIdx, j]);
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;
      snap('SWAP', `arr[${i}]과 arr[${minIdx}] 교환`, 8, [], [i, minIdx]);
    }
    sorted.push(i);
    snap('SORTED', `인덱스 ${i}에 최솟값 ${arr[i]} 확정`, 8);
  }
  sorted.push(n - 1);
  snap('DONE', `선택 정렬 완료! 비교 ${compares}회, 교환 ${swaps}회`, 9);
  return steps;
}
