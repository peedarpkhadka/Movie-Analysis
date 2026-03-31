import { useState, useEffect } from 'react';
import { Filter, TrendingUp } from 'lucide-react';
import MetricsCards from '../components/dashboard/MetricsCards';
import DashboardFilters from '../components/dashboard/DashboardFilters';
import BudgetRevenueChart from '../components/dashboard/BudgetRevenueChart';
import GenrePerformanceChart from '../components/dashboard/GenerePerformanceChart';
import RatingsDistribution from '../components/dashboard/RatingsDistribution';
import RevenueTrendChart from '../components/dashboard/RevenueTrendChart';
import TopMoviesTable from '../components/dashboard/TopMoviesTable';
import CorrelationInsights from '../components/dashboard/Correlationlnsights';

// Base movie data for demonstration
const baseSampleMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    budget: 185000000,
    revenue: 1004558444,
    voteAverage: 9.0,
    voteCount: 32000,
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    language: "en",
    popularity: 85.2
  },
  {
    id: 2,
    title: "Inception",
    budget: 160000000,
    revenue: 836836967,
    voteAverage: 8.8,
    voteCount: 35000,
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi", "Thriller"],
    language: "en",
    popularity: 82.1
  },
  {
    id: 3,
    title: "Interstellar",
    budget: 165000000,
    revenue: 677471339,
    voteAverage: 8.6,
    voteCount: 33000,
    releaseYear: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    language: "en",
    popularity: 78.9
  },
  {
    id: 4,
    title: "Parasite",
    budget: 11400000,
    revenue: 258809962,
    voteAverage: 8.5,
    voteCount: 17000,
    releaseYear: 2019,
    genres: ["Comedy", "Thriller", "Drama"],
    language: "ko",
    popularity: 75.3
  },
  {
    id: 5,
    title: "The Shawshank Redemption",
    budget: 25000000,
    revenue: 28341469,
    voteAverage: 9.3,
    voteCount: 25000,
    releaseYear: 1994,
    genres: ["Drama"],
    language: "en",
    popularity: 90.1
  },
  {
    id: 6,
    title: "Pulp Fiction",
    budget: 8000000,
    revenue: 214179088,
    voteAverage: 8.9,
    voteCount: 27000,
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    language: "en",
    popularity: 88.7
  },
  {
    id: 7,
    title: "Avengers: Endgame",
    budget: 356000000,
    revenue: 2797800564,
    voteAverage: 8.4,
    voteCount: 24000,
    releaseYear: 2019,
    genres: ["Action", "Adventure", "Drama"],
    language: "en",
    popularity: 95.2
  },
  {
    id: 8,
    title: "The Godfather",
    budget: 6000000,
    revenue: 134966411,
    voteAverage: 9.2,
    voteCount: 19000,
    releaseYear: 1972,
    genres: ["Crime", "Drama"],
    language: "en",
    popularity: 87.4
  },
  {
    id: 9,
    title: "Fast X",
    budget: 340000000,
    revenue: 652000000,
    voteAverage: 7.4,
    voteCount: 2500,
    releaseYear: 2023,
    genres: ["Action", "Crime", "Thriller"],
    language: "en",
    popularity: 83.6
  },
  {
    id: 10,
    title: "John Wick: Chapter 4",
    budget: 90000000,
    revenue: 431800000,
    voteAverage: 7.9,
    voteCount: 3100,
    releaseYear: 2023,
    genres: ["Action", "Crime", "Thriller"],
    language: "en",
    popularity: 78.2
  }
];

const allGenres = ["Action", "Comedy", "Crime", "Drama", "Adventure", "Sci-Fi", "Thriller", "Horror", "Romance", "Animation", "Documentary", "Fantasy", "Family"];
const allLanguages = ["en", "ko", "es", "fr", "ja", "de", "it", "pt", "ru", "zh"];
const movieTitles = [
  "The Dark Knight", "Inception", "Interstellar", "Parasite", "The Shawshank Redemption",
  "Pulp Fiction", "Avengers: Endgame", "The Godfather", "Fast X", "John Wick: Chapter 4",
  "Oppenheimer", "Barbie", "Killers of the Flower Moon", "The Brutalist", "Anatomy of a Fall",
  "Past Lives", "American Fiction", "Zone of Interest", "The Iron Claw", "Dune: Part Two",
  "Godzilla x Kong", "Deadpool & Wolverine", "Inside Out 2", "Despicable Me 4", "Transformers: Rise of the Beasts",
  "The Marvels", "Furiosa", "Aquaman and the Lost Kingdom", "Mission Impossible", "John Wick",
  "Mad Max Fury Road", "Titanic", "Avatar", "Avatar: The Way of Water", "The Lion King",
  "Frozen", "Toy Story", "Finding Nemo", "Spider-Man", "Iron Man"
];

// Function to generate 1000+ movies
const generateMovies = () => {
  const movies = [...baseSampleMovies];
  
  for (let i = baseSampleMovies.length + 1; i <= 1000; i++) {
    const baseTitle = movieTitles[Math.floor(Math.random() * movieTitles.length)];
    const year = Math.floor(Math.random() * 30) + 1995;
    const budget = Math.random() > 0.3 ? Math.floor(Math.random() * 400000000) + 5000000 : 0;
    const revenue = budget > 0 ? Math.floor(Math.random() * (budget * 10)) : 0;
    
    movies.push({
      id: i,
      title: `${baseTitle} ${i % 10 === 0 ? '- Extended' : i % 7 === 0 ? '- Directors Cut' : ''}`.trim(),
      budget,
      revenue,
      voteAverage: Math.random() * 10,
      voteCount: Math.floor(Math.random() * 40000) + 100,
      releaseYear: year,
      genres: [
        allGenres[Math.floor(Math.random() * allGenres.length)],
        allGenres[Math.floor(Math.random() * allGenres.length)],
        ...(Math.random() > 0.5 ? [allGenres[Math.floor(Math.random() * allGenres.length)]] : [])
      ].filter((v, i, a) => a.indexOf(v) === i),
      language: allLanguages[Math.floor(Math.random() * allLanguages.length)],
      popularity: Math.random() * 100
    });
  }
  
  return movies.sort((a, b) => b.popularity - a.popularity);
};

const sampleMovies = generateMovies();

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    genre: '',
    yearFrom: 1990,
    yearTo: 2024,
    language: ''
  });

  useEffect(() => {
    // Simulate API call
    const loadMovies = async () => {
      setLoading(true);
      // In a real app, this would be: const data = await base44.movies.getAll();
      setTimeout(() => {
        setMovies(sampleMovies);
        setLoading(false);
      }, 500);
    };

    loadMovies();
  }, []);

  // Apply filters
  const filteredMovies = movies.filter(movie => {
    if (filters.genre && !movie.genres.includes(filters.genre)) return false;
    if (movie.releaseYear < filters.yearFrom || movie.releaseYear > filters.yearTo) return false;
    if (filters.language && movie.language !== filters.language) return false;
    return true;
  });

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      genre: '',
      yearFrom: 1990,
      yearTo: 2024,
      language: ''
    });
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">Loading movie data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div className="dashboard-header">
          <h1>TMDB Movie Analytics Dashboard</h1>
          <p>Top 1,000 Popular Movies — Financial & Audience Intelligence</p>
        </div>

        {/* Metrics Cards */}
        <MetricsCards movies={filteredMovies} />

        {/* Filter Bar */}
        <div className="filters-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.9rem' }}>
            <Filter size={18} />
            <span style={{ fontWeight: '500' }}>Filters:</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label className="filter-label">Genre</label>
            <select
              value={filters.genre}
              onChange={e => setFilters(f => ({ ...f, genre: e.target.value }))}
              className="filter-select"
            >
              <option value="">All Genres</option>
              {[...new Set(movies.flatMap(m => m.genres))].sort().map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label className="filter-label">Year From</label>
            <select
              value={filters.yearFrom}
              onChange={e => setFilters(f => ({ ...f, yearFrom: parseInt(e.target.value) }))}
              className="filter-select"
            >
              {Array.from({ length: 35 }, (_, i) => 1990 + i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label className="filter-label">Year To</label>
            <select
              value={filters.yearTo}
              onChange={e => setFilters(f => ({ ...f, yearTo: parseInt(e.target.value) }))}
              className="filter-select"
            >
              {Array.from({ length: 35 }, (_, i) => 1990 + i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label className="filter-label">Language</label>
            <select
              value={filters.language}
              onChange={e => setFilters(f => ({ ...f, language: e.target.value }))}
              className="filter-select"
            >
              <option value="">All Languages</option>
              {[...new Set(movies.map(m => m.language).filter(Boolean))].sort().map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <button onClick={handleResetFilters} className="reset-button">
            Reset
          </button>
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          <BudgetRevenueChart movies={filteredMovies} />
          <GenrePerformanceChart movies={filteredMovies} />
        </div>

        {/* Full Width Charts */}
        <div className="chart-full">
          <RatingsDistribution movies={filteredMovies} />
        </div>

        <div className="chart-full">
          <RevenueTrendChart movies={filteredMovies} />
        </div>

        {/* Correlation Insights */}
        <div className="charts-grid">
          <CorrelationInsights movies={filteredMovies} />
        </div>

        {/* Table */}
        <div className="table-container">
          <TopMoviesTable movies={filteredMovies} />
        </div>
      </div>
    </div>
  );
}