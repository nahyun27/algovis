import type { SortStep } from './types';

export function generateBubbleSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const n = arr.length;
  const steps: SortStep[] = [];
  const sorted: number[] = [];
  let compares = 0, swaps = 0;

  const snap = (type: SortStep['type'], desc: string, codeLine: number, comparing: number[] = [], swapping: number[] = []): void => {
    steps.push({ type, array: [...arr], comparing, swapping, sorted: [...sorted], pivot: null, description: desc, codeLine, compares, swaps });
  };

  snap('INIT', '버블 정렬 시작', 1);

  for (let i = n - 1; i > 0; i--) {
    let swapped = false;
    for (let j = 0; j < i; j++) {
      compares++;
      snap('COMPARE', `arr[${j}]=${arr[j]}와 arr[${j + 1}]=${arr[j + 1]} 비교`, 5, [j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        swapped = true;
        snap('SWAP', `arr[${j}]과 arr[${j + 1}] 교환`, 7, [], [j, j + 1]);
      }
    }
    sorted.push(i);
    snap('SORTED', `인덱스 ${i} 정렬 확정`, 3);
    if (!swapped) {
      for (let k = 0; k <= i - 1; k++) if (!sorted.includes(k)) sorted.push(k);
      snap('DONE', `교환 없음 → 조기 종료! 비교 ${compares}회, 교환 ${swaps}회`, 10);
      return steps;
    }
  }
  sorted.push(0);
  snap('DONE', `버블 정렬 완료! 비교 ${compares}회, 교환 ${swaps}회`, 11);
  return steps;
}
