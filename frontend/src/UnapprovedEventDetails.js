import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UnapprovedEventDetails(props) {
  const [event, setEvent] = useState({});
  const eventId = props.match.params.id;

  useEffect(() => {
    // Senden einer GET-Anfrage an den Server, um die Details der nicht genehmigten Veranstaltung abzurufen
    axios.get(`http://localhost:3000/unapproved-events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der nicht genehmigten Veranstaltungsdetails: ' + error);
      });
  }, [eventId]);

  const handleApprove = () => {
    // Senden einer POST-Anfrage an den Server, um die Veranstaltung zu genehmigen
    axios.post(`http://localhost:3000/approve-event/${eventId}`)
      .then((response) => {
        // Erfolgreiche Rückmeldung vom Server, z.B., Weiterleitung zur Liste der nicht genehmigten Veranstaltungen
      })
      .catch((error) => {
        console.error('Fehler beim Genehmigen der Veranstaltung: ' + error);
      });
  };

  return (
    <div>
      <h1>Nicht genehmigte Veranstaltungsdetails</h1>
      <p>Veranstaltungstitel: {event.title}</p>
      {/* Weitere Details anzeigen */}
      <button type="button" onClick={handleApprove}>Veranstaltung genehmigen</button>
      <Link to="/unapproved-events">Zurück zur Liste der nicht genehmigten Veranstaltungen</Link>
    </div>
  );
}

export default UnapprovedEventDetails;
