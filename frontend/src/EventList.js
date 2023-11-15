import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventList.css';

function EventList() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/approved-events')
      .then((response) => {
        setEvents(response.data);
        setFilteredEvents(response.data);
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der Veranstaltungsliste: ' + error);
      });
  }, []);

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = events.filter((event) => {
      const title = event.entry.title.toLowerCase();
      const location = event.entry.location.toLowerCase();
      return title.includes(lowerCaseSearchTerm) || location.includes(lowerCaseSearchTerm);
    });
    setFilteredEvents(filtered);
  };

  return (
    <div className="event-list-container">
      <h1>Übersicht aller genehmigten Veranstaltungen</h1>
      <input
        type="text"
        placeholder="Suchbegriff"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Suchen</button>
      {/* Aufgabe2-Grid: Drei Spalten */}
      <div className="event-grid">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h2>{event.entry.title}</h2>
            <p>{event.entry.date}</p>
            <p>{event.entry.location}</p>
            <p>Preis: {event.entry.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
