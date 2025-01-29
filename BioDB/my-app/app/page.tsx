'use client'
import React, { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { ResultTable } from './components/ResultTable';
import { DetailPopup } from './components/DetailPopup';
 

export default function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (params: any) => {
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await fetch(`http://localhost/api/search_Toho.php?${queryString}`);
      const data = await response.json();
      if (data.status === 'success') {
        setSearchResults(data.data);
        console.log('Search results:', data.data);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Toho Music search</h1>
      <SearchForm onSearch={handleSearch} />
      <ResultTable data={searchResults} />
    </div>
  );
}

export async function fetchMusicDetail(id) {
	const response = await fetch(`http://localhost/api/Toho_detail.php?id=${id}`);
	if (!response.ok) {
	  throw new Error('Failed to fetch music detail');
	}
	const data = await response.json();
	return data;
}