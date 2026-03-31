import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 text-xs">
      <p className="text-amber-400 font-semibold mb-2">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="text-white">{p.name.includes('Revenue') ? `$${(p.value / 1e6).toFixed(0)}M` : p.value.toFixed(1)}</span>
        </p>
      ))}
    </div>
  );
};

export default function RevenueTrendChart({ movies }) {
  const yearMap = {};
  movies.forEach(m => {
    if (!m.releaseYear || m.releaseYear < 1990 || m.releaseYear > 2024) return;
    if (!yearMap[m.releaseYear]) yearMap[m.releaseYear] = { revenues: [], ratings: [], count: 0 };
    yearMap[m.releaseYear].count++;
    if (m.revenue > 0) yearMap[m.releaseYear].revenues.push(m.revenue);
    if (m.voteAverage > 0) yearMap[m.releaseYear].ratings.push(m.voteAverage);
  });

  const data = Object.entries(yearMap)
    .filter(([, v]) => v.count >= 2)
    .map(([year, v]) => ({
      year: parseInt(year),
      'Avg Revenue': v.revenues.length ? v.revenues.reduce((a, b) => a + b, 0) / v.revenues.length : 0,
      'Avg Rating': v.ratings.length ? v.ratings.reduce((a, b) => a + b, 0) / v.ratings.length : 0,
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <div className="chart-full">
      <h3 className="chart-card-title">Revenue & Rating Trends Over Time</h3>
      <p className="chart-card-subtitle">Average revenue and rating per release year (1990–2024)</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="year" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
          <YAxis yAxisId="left" tickFormatter={v => `$${(v / 1e6).toFixed(0)}M`} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 10]} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: '#9CA3AF', fontSize: 12 }} />
          <Line yAxisId="left" type="monotone" dataKey="Avg Revenue" stroke="#F59E0B" strokeWidth={2} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="Avg Rating" stroke="#10B981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}