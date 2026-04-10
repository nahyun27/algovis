# algovis

> Interactive algorithm visualizer — step-by-step animations for graph, DP, and pathfinding algorithms with code viewer and practice problems

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

## 소개

알고리즘을 단계별로 시각화하는 인터랙티브 학습 사이트입니다.  
DP 테이블, 그래프 탐색 과정, 소스 코드 하이라이팅이 스텝마다 동기화되어 알고리즘의 흐름을 직관적으로 이해할 수 있습니다.

## 기능

- **단계별 시각화** — 이전/다음/자동재생으로 알고리즘 실행 과정을 한 스텝씩 확인
- **DP 테이블 연동** — 갱신되는 셀을 실시간 하이라이팅
- **방향 그래프 렌더링** — 방문 여부, 현재 위치, 이동 대상을 색상으로 구분
- **소스 코드 뷰어** — 현재 실행 중인 라인 하이라이팅 + 코드 복사
- **Top-down / Bottom-up 토글** — 같은 문제를 두 가지 방식으로 비교
- **관련 백준 문제** — 난이도, N 범위, 복잡도 정보 포함
- **다크모드** 지원

## 구현된 알고리즘

| 알고리즘 | 카테고리 | 복잡도 | 상태 |
|---|---|---|---|
| 외판원 순회 (TSP) | Graph / DP | O(N² × 2^N) | ✅ 완료 |
| 다익스트라 | Graph | O((V+E) log V) | 🔜 예정 |
| A* | Pathfinding | O(E log V) | 🔜 예정 |
| BFS / DFS | Graph | O(V+E) | 🔜 예정 |

## 시작하기

**요구사항: Node.js 20.19+ 또는 22.12+**

```bash
git clone https://github.com/<username>/algovis.git
cd algovis
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 열기

## 기술 스택

- **React 18** + **TypeScript**
- **Vite** — 빌드 도구
- **Tailwind CSS** — 스타일링
- **Framer Motion** — 애니메이션
- **React Router** — 페이지 라우팅

## 프로젝트 구조

```
src/
├── algorithms/
│   └── tsp/
│       ├── solverTopDown.ts   # 재귀 + 메모이제이션
│       ├── solverBottomUp.ts  # 반복문 (시각화 최적)
│       └── types.ts
├── components/
│   ├── GraphCanvas/           # SVG 방향 그래프
│   ├── DPTable/               # dp[mask][city] 테이블
│   ├── StepController/        # 재생 컨트롤
│   ├── CodeViewer/            # 소스 코드 + 하이라이팅
│   └── ProblemList/           # 백준 문제 목록
└── pages/
    ├── Home/
    └── AlgorithmPage/
```

## 관련 문제 (백준)

| 번호 | 문제 | 티어 | N 범위 | 완전탐색 |
|---|---|---|---|---|
| 10971 | 외판원 순회 2 | Silver II | N ≤ 10 | ✅ 가능 |
| 2098 | 외판원 순회 | Gold I | N ≤ 16 | ❌ DP 필수 |
| 16991 | 외판원 순회 3 | Gold I | N ≤ 16 | ❌ DP 필수 |

## 기여

새로운 알고리즘 추가 방법:

1. `src/algorithms/<name>/` 폴더 생성
2. `solver.ts` — Step 배열 반환하는 함수 구현
3. `src/pages/AlgorithmPage/` 에 라우트 추가
4. 홈 카드 목록에 등록
