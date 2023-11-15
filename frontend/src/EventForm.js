import React, { useState } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';

function EventForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    price: 0,
    approved: false
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Senden Sie die Formulardaten an den Server
    axios
      .post('http://localhost:3000/add-event', formData)
      .then((response) => {
        const createdEventTitle = response.data.entry.title;

        // Erfolgreiche Rückmeldung vom Server
        setSuccessMessage(`Die Veranstaltung ${createdEventTitle} wurde erfolgreich erstellt.`);

        // Zurücksetzen des Formulars
        setFormData({
          title: '',
          description: '',
          location: '',
          date: '',
          price: 0,
          approved: false
        });
      })
      .catch((error) => {
        if (error.response) {
          // Der Server hat einen Fehlerstatus zurückgegeben
          setErrorMessage('Fehler: ' + error.response.status + ' - ' + error.response.data.message);
        } else {
          // Ein unerwarteter Fehler ist aufgetreten
          setErrorMessage('Ein unerwarteter Fehler ist aufgetreten.');
        }
      });
  };

  return (
    <div>
      <h1>Veranstaltung hinzufügen</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <ErrorMessage message={errorMessage} /* Anzeige von Fehlermeldungen */ />}
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="title">Titel:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Beschreibung:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="location">Veranstaltungsort:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Datum:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Preis:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
          />
          </div>
        <button type="submit">Veranstaltung hinzufügen</button>
      </form>
    </div>
  );
}

export default EventForm;
