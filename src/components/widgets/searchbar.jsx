import React from "react";

export default function SearchBar({ value, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search jobs by title or company..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button>Search</button>
    </div>
  );
}
