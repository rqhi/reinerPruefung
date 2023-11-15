import React, { useState } from 'react';
import axios from 'axios';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Senden einer GET-Anfrage an den Server, um Veranstaltungen basierend auf searchTerm zu suchen
    axios.get(`http://localhost:3000/search-events?searchTerm=${searchTerm}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error('Fehler beim Suchen von Veranstaltungen: ' + error);
      });
  };

  return (
    <div>
      <h1>Veranstaltungen suchen</h1>
      <input
        type="text"
        placeholder="Suchbegriff"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Suchen</button>
      {/* Hier die Anzeige der Suchergebnisse */}
    </div>
  );  
}

export default SearchBar;
