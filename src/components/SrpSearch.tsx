import React, { useState } from 'react';
import './SrpSearch.css';

interface SrpSearchProps {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
}

export const SrpSearch: React.FC<SrpSearchProps> = ({ onSearch, onFilterClick }) => {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState(3);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setQuery('');
    setActiveFilters(0);
  };

  return (
    <div className="srp-search-container">
      <div className="srp-search-wrapper">
        {/* Search input */}
        <div className="srp-search-field">
          <svg className="srp-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="search"
            className="srp-search-input"
            placeholder="What are you looking for?"
            value={query}
            onChange={handleSearch}
          />
          <button className="srp-search-magic" aria-label="AI Magic">
            ✨
          </button>
        </div>

        {/* Filter buttons */}
        <div className="srp-search-filters">
          <button className="srp-filter-sort" aria-label="Sort">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18"></path>
            </svg>
          </button>

          <button className="srp-filter-active" onClick={onFilterClick}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6a3 3 0 013-3h12a3 3 0 013 3v2h.5a2.5 2.5 0 010 5H21v2a3 3 0 01-3 3H6a3 3 0 01-3-3V6z"></path>
            </svg>
            <span>Filters ({activeFilters})</span>
          </button>

          <button className="srp-filter-clear" onClick={handleClear}>
            Clear
          </button>

          <button className="srp-filter-dropdown">
            <span>Budget</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <button className="srp-filter-dropdown">
            <span>BHK type</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SrpSearch;
