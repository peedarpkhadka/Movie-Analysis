import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RatingsDistribution({ movies }) {
  const bins = {};
  for (let i = 0; i <= 9; i++) bins[`${i}-${i + 1}`] = 0;

  movies.forEach(m => {
    if (m.voteAverage > 0 && m.voteCount >= 10) {
      const bin = Math.floor(m.voteAverage);
      const key = `${bin}-${bin + 1}`;
      if (bins[key] !== undefined) bins[key]++;
    }
  });

  const data = Object.entries(bins).map(([range, count]) => ({ range, count }));

  const popBins = { '0-200': 0, '200-500': 0, '500-1k': 0, '1k-2k': 0, '2k-5k': 0, '5k+': 0 };
  movies.forEach(m => {
    const p = m.popularity;
    if (p < 200) popBins['0-200']++;
    else if (p < 500) popBins['200-500']++;
    else if (p < 1000) popBins['500-1k']++;
    else if (p < 2000) popBins['1k-2k']++;
    else if (p < 5000) popBins['2k-5k']++;
    else popBins['5k+']++;
  });
  const popData = Object.entries(popBins).map(([range, count]) => ({ range, count }));

  return (
    <div>
      <div className="charts-grid" style={{ marginBottom: 0 }}>
        <div className="chart-card">
          <h3 className="chart-card-title">Rating Distribution</h3>
          <p className="chart-card-subtitle">Movies with ≥10 votes by rating band</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="range" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8, fontSize: 12 }} itemStyle={{ color: '#F59E0B' }} labelStyle={{ color: '#E5E7EB' }} />
              <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Movies" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3 className="chart-card-title">Popularity Distribution</h3>
          <p className="chart-card-subtitle">Movies by popularity score range</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={popData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="range" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8, fontSize: 12 }} itemStyle={{ color: '#8B5CF6' }} labelStyle={{ color: '#E5E7EB' }} />
              <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Movies" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}