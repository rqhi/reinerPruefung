import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';

function UnapprovedEvents() {
  const [unapprovedEvents, setUnapprovedEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/unapproved-events')
      .then((response) => {
        setUnapprovedEvents(response.data);
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der nicht genehmigten Veranstaltungen: ' + error);
      });
  }, []);

  const handleApproveEvent = (eventId) => {
    // Senden einer POST-Anfrage an den Server, um die Veranstaltung zu genehmigen
    console.log(eventId);
    axios.post(`http://localhost:3000/approve-event/${eventId}`)
      .then((response) => {
        // Aktualisieren der lokalen Liste der nicht genehmigten Veranstaltungen nach der Genehmigung
        setUnapprovedEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      })
      .catch((error) => {
        console.error('Fehler beim Genehmigen der Veranstaltung: ' + error);
      });
  };

  return (
    <div>
      <h1>Nicht genehmigte Veranstaltungen</h1>
      <div className="event-grid">
        {unapprovedEvents.map((event) => (
          <EventCard key={event.id} event={event} onApproveClick={() => handleApproveEvent(event.id)} />
        ))}
      </div>
    </div>
  );
}

export default UnapprovedEvents;
