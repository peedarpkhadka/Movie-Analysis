import { Filter } from 'lucide-react';

export default function DashboardFilters({ movies, filters, setFilters }) {
  const allGenres = [...new Set(movies.flatMap(m => m.genres))].sort();
  const years = [...new Set(movies.map(m => m.releaseYear).filter(Boolean))].sort();
  const minYear = years[0] || 1990;
  const maxYear = years[years.length - 1] || 2024;

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <Filter className="w-4 h-4" />
        <span className="font-medium">Filters:</span>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-gray-400 text-sm">Genre</label>
        <select
          value={filters.genre}
          onChange={e => setFilters(f => ({ ...f, genre: e.target.value }))}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-1.5 focus:ring-amber-500 focus:border-amber-500"
        >
          <option value="">All Genres</option>
          {allGenres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-gray-400 text-sm">Year From</label>
        <select
          value={filters.yearFrom}
          onChange={e => setFilters(f => ({ ...f, yearFrom: parseInt(e.target.value) }))}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-1.5"
        >
          {years.filter(y => !filters.yearTo || y <= filters.yearTo).map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-gray-400 text-sm">Year To</label>
        <select
          value={filters.yearTo}
          onChange={e => setFilters(f => ({ ...f, yearTo: parseInt(e.target.value) }))}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-1.5"
        >
          {years.filter(y => !filters.yearFrom || y >= filters.yearFrom).map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-gray-400 text-sm">Language</label>
        <select
          value={filters.language}
          onChange={e => setFilters(f => ({ ...f, language: e.target.value }))}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-1.5"
        >
          <option value="">All Languages</option>
          {[...new Set(movies.map(m => m.language).filter(Boolean))].sort().map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <button
        onClick={() => setFilters({ genre: '', yearFrom: minYear, yearTo: maxYear, language: '' })}
        className="text-amber-400 hover:text-amber-300 text-sm transition-colors ml-auto"
      >
        Reset
      </button>
    </div>
  );
}