import { DollarSign, TrendingUp, Star, Film } from 'lucide-react';

function fmt(num) {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`;
  return `$${num.toFixed(0)}`;
}

const cards = [
  { key: 'total', label: 'Total Movies', icon: Film, bgGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', iconBg: '#8b5cf6' },
  { key: 'avgBudget', label: 'Avg Budget', icon: DollarSign, bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)', iconBg: '#f59e0b' },
  { key: 'avgRevenue', label: 'Avg Revenue', icon: TrendingUp, bgGradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', iconBg: '#10b981' },
  { key: 'avgRating', label: 'Avg Rating', icon: Star, bgGradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)', iconBg: '#f43f5e' },
];

export default function MetricsCards({ movies }) {
  const withBudget = movies.filter(m => m.budget > 0);
  const withRevenue = movies.filter(m => m.revenue > 0);
  const withRating = movies.filter(m => m.voteAverage > 0);

  const metrics = {
    total: movies.length,
    avgBudget: withBudget.length ? withBudget.reduce((s, m) => s + m.budget, 0) / withBudget.length : 0,
    avgRevenue: withRevenue.length ? withRevenue.reduce((s, m) => s + m.revenue, 0) / withRevenue.length : 0,
    avgRating: withRating.length ? withRating.reduce((s, m) => s + m.voteAverage, 0) / withRating.length : 0,
  };

  return (
    <div className="metrics-container">
      {cards.map(({ key, label, icon: Icon, bgGradient, iconBg }) => (
        <div key={key} className="metric-card">
          <div className="metric-card-header">
            <span className="metric-card-label">{label}</span>
            <div className="metric-card-icon" style={{ background: iconBg }}>
              <Icon size={20} />
            </div>
          </div>
          <div className="metric-card-value">
            {key === 'total' && movies.length.toLocaleString()}
            {key === 'avgRating' && metrics.avgRating.toFixed(2)}
            {(key === 'avgBudget' || key === 'avgRevenue') && fmt(metrics[key])}
          </div>
        </div>
      ))}
    </div>
  );
}