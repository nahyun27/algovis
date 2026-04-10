import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeViewerProps {
  codeLine: number;
  solverType: 'topDown' | 'bottomUp';
}

const TSP_CODE_TOP_DOWN = `def solve(mask, curr):
    if mask == (1 << N) - 1:
        return W[curr][0] if W[curr][0] else INF
        
    if dp[mask][curr] != INF:
        return dp[mask][curr]
        
    ans = INF
    for nxt in range(N):
        if not (mask & (1 << nxt)) and W[curr][nxt]:
            res = solve(mask | (1 << nxt), nxt) + W[curr][nxt]
            ans = min(ans, res)
            
    dp[mask][curr] = ans
    return ans`;

const TSP_CODE_BOTTOM_UP = `dp[1][0] = 0

for mask in range(1, 1 << N):
    if not (mask & 1): continue
    for i in range(N):
        if not (mask & (1 << i)): continue
        
        for j in range(N):
            if i != j and (mask & (1 << j)) and W[j][i]:
                res = dp[mask ^ (1 << i)][j] + W[j][i]
                dp[mask][i] = min(dp[mask][i], res)
                
ans = INF
for i in range(1, N):
    if dp[(1 << N) - 1][i] != INF and W[i][0]:
        ans = min(ans, dp[(1 << N) - 1][i] + W[i][0])
return ans`;

export default function CodeViewer({ codeLine, solverType }: CodeViewerProps) {
  const codeStr = solverType === 'topDown' ? TSP_CODE_TOP_DOWN : TSP_CODE_BOTTOM_UP;
  const title = solverType === 'topDown' ? 'Source Code (Top-down DP)' : 'Source Code (Bottom-up DP)';

  return (
    <div className="border rounded-xl bg-[var(--code-bg)] shadow-sm overflow-hidden flex flex-col flex-shrink-0 h-[420px]">
      <div className="p-3 border-b bg-muted/30">
        <h2 className="font-semibold tracking-tight text-sm">{title}</h2>
      </div>
      <div className="flex-1 overflow-auto text-[13px] bg-[#1e1e1e]">
        <SyntaxHighlighter
          language="python"
          style={vscDarkPlus}
          showLineNumbers
          wrapLines
          lineProps={(lineNumber) => ({
            style: {
              display: 'block',
              backgroundColor: lineNumber === codeLine ? 'var(--accent-bg, rgba(59, 130, 246, 0.2))' : 'transparent',
              borderLeft: lineNumber === codeLine ? '3px solid var(--accent, #3b82f6)' : '3px solid transparent',
              paddingLeft: '10px'
            }
          })}
          customStyle={{ margin: 0, padding: '16px 0', background: 'transparent' }}
        >
          {codeStr}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
