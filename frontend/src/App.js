import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import EventList from './EventList';
import EventDetails from './EventDetails';
import EventForm from './EventForm';
import EventEdit from './EventEdit';
import UnapprovedEvents from './UnapprovedEvents';
import UnapprovedEventDetails from './UnapprovedEventDetails';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Startseite</Link>
            </li>
            <li>
              <Link to="/add-event">Veranstaltung hinzufügen</Link>
            </li>
            <li>
              <Link to="/unapproved-events">Nicht genehmigte Veranstaltungen</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/add-event" element={<EventForm />} />
        <Route path="/edit-event/:id" element={<EventEdit />} />
        <Route path="/unapproved-events" element={<UnapprovedEvents />} />
        <Route path="/unapproved-event/:id" element={<UnapprovedEventDetails />} />
        <Route path="/generate-test-data" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
