import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

function fmtM(val) { return `$${(val / 1e6).toFixed(0)}M`; }

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 text-xs max-w-xs">
      <p className="text-amber-400 font-semibold mb-1 truncate">{d?.title}</p>
      <p className="text-gray-300">Budget: <span className="text-white">${(d?.x / 1e6).toFixed(1)}M</span></p>
      <p className="text-gray-300">Revenue: <span className="text-white">${(d?.y / 1e6).toFixed(1)}M</span></p>
      <p className="text-gray-300">Rating: <span className="text-white">{d?.rating}</span></p>
    </div>
  );
};

export default function BudgetRevenueChart({ movies }) {
  const data = movies
    .filter(m => m.budget > 0 && m.revenue > 0)
    .map(m => ({ x: m.budget, y: m.revenue, title: m.title, rating: m.voteAverage }));

  return (
    <div className="chart-card">
      <h3 className="chart-card-title">Budget vs. Revenue</h3>
      <p className="chart-card-subtitle">Each dot represents a movie with both budget &amp; revenue data ({data.length} movies)</p>
      <ResponsiveContainer width="100%" height={320}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="x" name="Budget" tickFormatter={fmtM} tick={{ fill: '#9CA3AF', fontSize: 11 }} label={{ value: 'Budget', position: 'insideBottom', offset: -2, fill: '#6B7280', fontSize: 12 }} />
          <YAxis dataKey="y" name="Revenue" tickFormatter={fmtM} tick={{ fill: '#9CA3AF', fontSize: 11 }} label={{ value: 'Revenue', angle: -90, position: 'insideLeft', fill: '#6B7280', fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine x={0} y={0} stroke="#6B7280" strokeDasharray="4 4" />
          <Scatter data={data} fill="#F59E0B" fillOpacity={0.7} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}