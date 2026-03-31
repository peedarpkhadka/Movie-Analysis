import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function pearsonCorr(xs, ys) {
  const n = xs.length;
  if (n < 2) return 0;
  const mx = xs.reduce((a, b) => a + b) / n;
  const my = ys.reduce((a, b) => a + b) / n;
  const num = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0);
  const den = Math.sqrt(xs.reduce((s, x) => s + (x - mx) ** 2, 0) * ys.reduce((s, y) => s + (y - my) ** 2, 0));
  return den === 0 ? 0 : num / den;
}

const PAIRS = [
  { x: 'voteCount', y: 'revenue', labelX: 'Vote Count', labelY: 'Revenue ($M)', scaleY: 1e6 },
  { x: 'voteAverage', y: 'popularity', labelX: 'Avg Rating', labelY: 'Popularity', scaleY: 1 },
];

const CustomTooltip = ({ active, payload, pair }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div className="bg-gray-900 border border-gray-600 rounded-lg p-2 text-xs">
      <p className="text-white truncate max-w-xs">{d?.title}</p>
      <p className="text-gray-300">{pair.labelX}: <span className="text-amber-400">{d?.x?.toFixed?.(1) ?? d?.x}</span></p>
      <p className="text-gray-300">{pair.labelY}: <span className="text-purple-400">{pair.scaleY === 1e6 ? `$${(d?.y).toFixed(1)}M` : d?.y?.toFixed?.(1)}</span></p>
    </div>
  );
};

export default function CorrelationInsights({ movies }) {
  return (
    <>
      <div style={{ color: '#f3f4f6', fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Correlation Analysis</div>
      <div className="charts-grid" style={{ marginBottom: 0 }}>
        {PAIRS.map(pair => {
          const data = movies
            .filter(m => m[pair.x] > 0 && m[pair.y] > 0)
            .map(m => ({ x: m[pair.x], y: pair.scaleY > 1 ? m[pair.y] / pair.scaleY : m[pair.y], title: m.title }));
          const corr = pearsonCorr(data.map(d => d.x), data.map(d => d.y));

          return (
            <div key={pair.x} className="chart-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 className="chart-card-title" style={{ margin: 0 }}>{pair.labelX} vs {pair.labelY}</h3>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  fontWeight: 500,
                  background: Math.abs(corr) > 0.5 ? 'rgba(16, 185, 129, 0.1)' : Math.abs(corr) > 0.3 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                  color: Math.abs(corr) > 0.5 ? '#10b981' : Math.abs(corr) > 0.3 ? '#f59e0b' : '#9ca3af'
                }}>
                  r = {corr.toFixed(2)}
                </span>
              </div>
              <p className="chart-card-subtitle">Pearson correlation: {Math.abs(corr) > 0.5 ? 'strong' : Math.abs(corr) > 0.3 ? 'moderate' : 'weak'}</p>
              <ResponsiveContainer width="100%" height={220}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="x" name={pair.labelX} tick={{ fill: '#9CA3AF', fontSize: 10 }} label={{ value: pair.labelX, position: 'insideBottom', offset: -2, fill: '#6B7280', fontSize: 11 }} />
                  <YAxis dataKey="y" name={pair.labelY} tick={{ fill: '#9CA3AF', fontSize: 10 }} label={{ value: pair.labelY, angle: -90, position: 'insideLeft', fill: '#6B7280', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip pair={pair} />} />
                  <Scatter data={data} fill="#8B5CF6" fillOpacity={0.6} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>
    </>
  );
}