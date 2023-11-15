import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EventDetails(props) {
  const [event, setEvent] = useState({
    entry: {
      title: ''
    }
  });

  var url = window.location.pathname;
  const eventId = url.substring(url.lastIndexOf('/') + 1);
  console.log(eventId);

  useEffect(() => {
    axios.get(`http://localhost:3000/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der Veranstaltungsdetails: ' + error);
      });
  }, [eventId]);

  const handleApprove = () => {
    // Senden einer POST-Anfrage an den Server, um die Veranstaltung zu genehmigen
    axios.post(`http://localhost:3000/approve-event/${eventId}`)
      .then((response) => {
        // Erfolgreiche Rückmeldung vom Server, z.B., Weiterleitung zur Liste der nicht genehmigten Veranstaltungen
        console.log('Veranstaltung $1 wurde erfolgreich genehmigt', {eventId})
      })
      .catch((error) => {
        console.error('Fehler beim Genehmigen der Veranstaltung: ' + error);
      });
  };

  const handleDelete = () => {
    // Senden einer DELETE-Anfrage an den Server, um die Veranstaltung zu löschen
    axios.delete(`http://localhost:3000/events/${eventId}`)
      .then((response) => {
        // Erfolgreiche Rückmeldung vom Server, z.B., Weiterleitung zur Veranstaltungsliste
        console.log('Veranstaltung $1 wurde erfolgreich gelöscht', {eventId})
      })
      .catch((error) => {
        console.error('Fehler beim Löschen der Veranstaltung: ' + error);
      });
  };

  return (
    <div>
      <h1>Veranstaltungsdetails</h1>
      <p>Veranstaltungsname: {event.entry.title}</p>
      <p>Beschreibung: {event.entry.description}</p>
      <p>Datum: {event.entry.date}</p>
      <p>Ort: {event.entry.location}</p>
      <p>Preis: {event.entry.price}</p>
      <p><button type="button" onClick={handleApprove}>Veranstaltung genehmigen</button></p>
      <p><button type="button" onClick={handleDelete}>Veranstaltung löschen</button></p>
      <Link to="/">Zurück zur Veranstaltungsliste</Link>
    </div>
  );
}

export default EventDetails;
