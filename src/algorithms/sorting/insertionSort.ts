import type { SortStep } from './types';

export function generateInsertionSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const n = arr.length;
  const steps: SortStep[] = [];
  const sorted: number[] = [0];
  let compares = 0, swaps = 0;

  const snap = (type: SortStep['type'], desc: string, codeLine: number, comparing: number[] = [], swapping: number[] = []): void => {
    steps.push({ type, array: [...arr], comparing, swapping, sorted: [...sorted], pivot: null, description: desc, codeLine, compares, swaps });
  };

  snap('INIT', '삽입 정렬 시작 (인덱스 0은 이미 정렬)', 1);

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    snap('COMPARE', `key = arr[${i}] = ${key}를 정렬된 구간에 삽입`, 3, [i]);
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      compares++;
      snap('COMPARE', `arr[${j}]=${arr[j]} > key=${key} → 오른쪽으로 이동`, 5, [j, j + 1]);
      arr[j + 1] = arr[j];
      swaps++;
      snap('SET', `arr[${j + 1}] = arr[${j}] = ${arr[j + 1]}`, 6, [], [j, j + 1]);
      j--;
    }
    if (j >= 0) { compares++; }
    arr[j + 1] = key;
    snap('SET', `arr[${j + 1}] = key = ${key} 삽입 완료`, 7, [j + 1]);
    if (!sorted.includes(i)) sorted.push(i);
    // Keep sorted indices up to i
    for (let k = 0; k <= i; k++) if (!sorted.includes(k)) sorted.push(k);
    snap('SORTED', `인덱스 0~${i} 정렬 완료`, 2);
  }
  snap('DONE', `삽입 정렬 완료! 비교 ${compares}회, 이동 ${swaps}회`, 8);
  return steps;
}
