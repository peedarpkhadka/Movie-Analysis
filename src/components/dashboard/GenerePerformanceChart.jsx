import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 text-xs">
      <p className="text-amber-400 font-semibold mb-2">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="text-white">{p.name === 'Avg Revenue' ? `$${(p.value / 1e6).toFixed(1)}M` : p.value.toFixed(1)}</span>
        </p>
      ))}
    </div>
  );
};

export default function GenrePerformanceChart({ movies }) {
  const genreMap = {};
  movies.forEach(m => {
    m.genres.forEach(g => {
      if (!genreMap[g]) genreMap[g] = { revenue: [], popularity: [], count: 0 };
      genreMap[g].count++;
      if (m.revenue > 0) genreMap[g].revenue.push(m.revenue);
      genreMap[g].popularity.push(m.popularity);
    });
  });

  const data = Object.entries(genreMap)
    .filter(([, v]) => v.count >= 5)
    .map(([genre, v]) => ({
      genre,
      'Avg Revenue': v.revenue.length ? v.revenue.reduce((a, b) => a + b, 0) / v.revenue.length : 0,
      'Avg Popularity': v.popularity.length ? v.popularity.reduce((a, b) => a + b, 0) / v.popularity.length : 0,
    }))
    .sort((a, b) => b['Avg Revenue'] - a['Avg Revenue'])
    .slice(0, 12);

  return (
    <div className="chart-card">
      <h3 className="chart-card-title">Genre Performance</h3>
      <p className="chart-card-subtitle">Average revenue and popularity by genre (top 12 by revenue)</p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="genre" tick={{ fill: '#9CA3AF', fontSize: 10 }} angle={-35} textAnchor="end" interval={0} />
          <YAxis yAxisId="left" tickFormatter={v => `$${(v / 1e6).toFixed(0)}M`} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '10px', color: '#9CA3AF', fontSize: 12 }} />
          <Bar yAxisId="left" dataKey="Avg Revenue" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="Avg Popularity" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}