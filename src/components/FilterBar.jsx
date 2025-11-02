import React from "react";

const FilterBar = ({ minPrice, maxPrice, setMinPrice, setMaxPrice, onFilter, onRefresh, loading }) => (
  <div className="filter-section">
    <label>Min Price:</label>
    <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
    <label>Max Price:</label>
    <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
    <button onClick={onFilter}>Filter</button>
    <button onClick={onRefresh}>🔄 Refresh</button>
    {loading && <span className="loading">⏳ Loading...</span>}
  </div>
);

export default FilterBar;
