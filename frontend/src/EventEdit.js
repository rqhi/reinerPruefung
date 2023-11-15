import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importieren Sie Link aus 'react-router-dom'
import axios from 'axios';

function EventEdit(props) {
  const [event, setEvent] = useState({
    entry: {
      title: ''
    }
  });
  const [editedEvent, setEditedEvent] = useState({
    entry: {
      title: ''
    }
  });

  var url = window.location.pathname;
  const eventId = url.substring(url.lastIndexOf('/') + 1);

  useEffect(() => {
    // Senden einer GET-Anfrage an den Server, um die aktuellen Veranstaltungsdetails abzurufen
    axios.get(`http://localhost:3000/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        setEditedEvent(response.data); // Initialisieren Sie editedEvent mit den aktuellen Details
        console.log(response.data);
        console.log(event);
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der Veranstaltungsdetails: ' + error);
      });
  }, [eventId]);

  const handleUpdate = () => {
    // Senden einer PUT-Anfrage an den Server, um die Veranstaltung zu aktualisieren
    console.log('EditedEvent: ' + editedEvent)
    axios.put(`http://localhost:3000/events/${eventId}`, editedEvent)
      .then((response) => {
        // Erfolgreiche Rückmeldung vom Server, z.B., Weiterleitung zur Veranstaltungsdetailansicht
        console.log('Veranstaltung $1 wurde erfolgreich geändert', {eventId})
      })
      .catch((error) => {
        console.error('Fehler beim Aktualisieren der Veranstaltung: ' + error);
      });
  };

  return (
    <div>
      <h1>Bearbeiten der Veranstaltung: {event.entry.title}</h1>
      <form>
        <label>Veranstaltungstitel:
          <input
            type="text"
             /*value={editedEvent.entry.title} */
            onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
          />
        </label>
        {/* Fügen Sie weitere Formularfelder für die Bearbeitung hinzu, z.B., Beschreibung, Ort, Datum und Preis */}
        <button type="button" onClick={handleUpdate}>Änderungen speichern</button>
      </form>
      <Link to={`/event/${eventId}`}>Zurück zur Detailansicht</Link>
    </div>
  );
}

export default EventEdit;
