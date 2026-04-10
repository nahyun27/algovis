import { type TSPStep, INF, CITIES, W } from './shared';

export function generateTSPStepsBottomUp(): TSPStep[] {
  const steps: TSPStep[] = [];
  const N = CITIES;
  const dp: number[][] = Array.from({ length: 1 << N }, () => Array(N).fill(INF));
  const cloneDP = () => dp.map(row => [...row]);

  dp[1][0] = 0;
  steps.push({
    mask: 1, currentCity: 0, nextCity: null, edgeWeight: null,
    dpTable: cloneDP(), activeEdge: null, description: `초기식: dp[0001][0] = 0 (시작 도시)`,
    isImprovement: true, codeLine: 1
  });

  for (let mask = 1; mask < (1 << N); mask++) {
    if ((mask & 1) === 0) continue;

    for (let i = 0; i < N; i++) {
       if ((mask & (1 << i)) === 0) continue;

       const prevMask = mask ^ (1 << i);
       if (prevMask === 0) continue; // Base case already set

       steps.push({
         mask, currentCity: i, nextCity: null, edgeWeight: null, dpTable: cloneDP(),
         activeEdge: null, description: `dp[${mask.toString(2).padStart(N, '0')}][${i}]를 구하기 위해 이전 상태들 탐색`,
         isImprovement: false, codeLine: 5
       });

       for (let j = 0; j < N; j++) {
          if (j !== i && (prevMask & (1 << j)) !== 0 && W[j][i] !== 0) {
             const costFromJ = dp[prevMask][j];
             if (costFromJ === INF) continue;

             steps.push({
               mask: prevMask, currentCity: j, nextCity: i, edgeWeight: W[j][i], dpTable: cloneDP(),
               activeEdge: [j, i], description: `도시 ${j}에서 ${i}로 이동 (비용: dp[${prevMask.toString(2).padStart(N, '0')}][${j}]+${W[j][i]} = ${costFromJ + W[j][i]})`,
               isImprovement: false, codeLine: 10
             });

             const res = costFromJ + W[j][i];
             const improved = res < dp[mask][i];
             if (improved) dp[mask][i] = res;

             steps.push({
               mask, currentCity: i, nextCity: null, edgeWeight: null, dpTable: cloneDP(),
               activeEdge: [j, i], description: `전이 완료. dp[${mask.toString(2).padStart(N, '0')}][${i}] 값 갱신: ${improved ? `예 (${res})` : '아니오'}`,
               isImprovement: improved, codeLine: 11
             });
          }
       }
    }
  }

  const finalMask = (1 << N) - 1;
  steps.push({
    mask: finalMask, currentCity: 0, nextCity: null, edgeWeight: null, dpTable: cloneDP(),
    activeEdge: null, description: `모든 도시를 방문한 상태(1111)에서 출발점(0)으로 돌아가는 최소 비용 계산`,
    isImprovement: false, codeLine: 14
  });

  let ans = INF;
  let bestLastCity = -1;
  for (let i = 1; i < N; i++) {
    if (dp[finalMask][i] !== INF && W[i][0] !== 0) {
      const total = dp[finalMask][i] + W[i][0];
      steps.push({
        mask: finalMask, currentCity: i, nextCity: 0, edgeWeight: W[i][0], dpTable: cloneDP(),
        activeEdge: [i, 0], description: `마지막 도시 ${i}에서 0으로 귀환 (비용: ${dp[finalMask][i]} + ${W[i][0]} = ${total})`,
        isImprovement: false, codeLine: 16
      });

      if (total < ans) {
        ans = total;
        bestLastCity = i;
        steps.push({
          mask: finalMask, currentCity: 0, nextCity: null, edgeWeight: W[i][0], dpTable: cloneDP(),
          activeEdge: [i, 0], description: `최종 순회 비용 최솟값 갱신: ${ans}`,
          isImprovement: true, codeLine: 17
        });
      }
    }
  }

  steps.push({
    mask: finalMask, currentCity: 0, nextCity: null, edgeWeight: null, dpTable: cloneDP(),
    activeEdge: bestLastCity !== -1 ? [bestLastCity, 0] : null,
    description: `[종료] 최종 최소 순회 비용: ${ans === INF ? '도달 불가' : ans}`,
    isImprovement: true, codeLine: 18
  });

  return steps;
}
