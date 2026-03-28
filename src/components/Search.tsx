"use client";

import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  async function handleSearch(e: any) {
    const value = e.target.value;
    setQuery(value);

    const res = await fetch(`/api/search?q=${value}`);
    const data = await res.json();

    setResults(data);
  }

  return (
    <div style={{ padding: "10px" }}>
      <input
        data-testid="search-input"
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search docs..."
      />

      <ul>
        {results.map((r, i) => (
          <li key={i}>
            <a href={r.url}>{r.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}