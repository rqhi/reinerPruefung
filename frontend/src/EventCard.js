import React from 'react';
import { Link } from 'react-router-dom';

function EventCard({ event, onApproveClick }) {
  return (
    <div className="event-card">
      <h2>
        <Link to={`/event/${event.id}`}>{event.entry.title}</Link>
      </h2>
      <p>{event.entry.date}</p>
      <p>{event.entry.location}</p>
      <p>Preis: {event.entry.price} €</p>
      <p>ID: {event.entry.id} </p>
      <p>approved: {event.entry.approved}</p>
      {onApproveClick && (
        <button type="button" onClick={() => onApproveClick(event.entry.id)}>
          Veranstaltung genehmigen
        </button>
      )}
    </div>
  );
}

export default EventCard;
