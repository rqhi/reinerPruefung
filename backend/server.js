const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const fs = require("fs");

// Audit-Datei
const auditLogFilePath = "audit.txt";

// Event-JSON-Datei
let events = require("./events.json");

const cors = require("cors");
app.use(cors());

// Route - genehmigte Veranstaltung
app.get("/approved-events", (req, res) => {
  // Filtere die genehmigten Veranstaltungen
  const approvedEvents = events.filter((event) => event.entry.approved);

  // Sortiere die Veranstaltungen in absteigender Reihenfolge (neuestes Datum zuerst)
  const sortedEvents = approvedEvents.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  res.json(sortedEvents);
});

// Route - ungenehmigte Veranstaltung
app.get("/unapproved-events", (req, res) => {
  // Filtere die nicht genehmigten Veranstaltungen
  const unapprovedEvents = events.filter((event) => !event.entry.approved);

  res.json(unapprovedEvents);
});

// Route - hinzufügen Veranstaltung
app.post("/add-event", (req, res) => {
  const newEventInfos = req.body; // Daten von EventForm.js

  // +1 Neue ID für Event
  //newEventInfos.id = events.length + 1;

  // überprüfen ob alle Informationen gefüllt sind.
  if (
    !newEventInfos.title ||
    !newEventInfos.description ||
    !newEventInfos.location ||
    !newEventInfos.date ||
    newEventInfos.price === 0
  ) {
    // Error Code 400 (Katze mit Mittelfinger :^) )
    return res.status(400).json({
      error:
        "Unvollständige Informationen: Bitte füllen Sie alle erforderlichen Felder aus.",
    });
  }

  // Alle Veranstaltungen aus der Events.json lesen
  fs.readFile("events.json", "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Fehler beim Lesen der Veranstaltungen" });
    }

    const events = JSON.parse(data);

    // Neues Oberevent, um Metadaten in der JSON zu speichern
    const newEvent = {
      createdOn: req.hostname,
      createdBy: req.ip,
      softwareVersion: null,
      entry: newEventInfos,
    };

    // Neue eindeutige ID für Event
    newEvent.id = events.length + 1;

    // Neue Veranstaltung hinzugüen
    events.push(newEvent);

    // Event in die Events.json schreiben (Datei wird erweitert)
    fs.writeFile("events.json", JSON.stringify(events, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Fehler beim Speichern der Veranstaltung" });
      }

      res.json(newEvent);
    });
  });
});

// Route, um Veranstaltungen zu suchen (Titel, Veranstaltungsort (TODO Datum, Preis, Beschreibung)
app.get("/search-events", (req, res) => {
  const { query } = req.query; // Query-Parameter "query" aus der URL

  if (!query) {
    return res.status(400).json({ error: 'Query-Parameter "query" fehlt' });
  }

  const matchingEvents = events.filter(
    (event) =>
      event.entry.title.includes(query) || event.entry.location.includes(query)
  );

  res.json(matchingEvents);
});

// Route - einzelnes Event aufrufen
app.get("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);

  // Filtere nach einer eindeutigen Event ID
  const event = events.find((event) => event.id === eventId);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: "Veranstaltung nicht gefunden" });
  }
});

// Route - einzelnes Event löschen
app.delete("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);

  // Filtere nach einer eindeutigen Event ID
  const event = events.find((event) => event.id === eventId);

  if (event !== -1) {
    // Entfernt die Veranstaltung aus der Liste
    events.splice(event, 1);
    res.status(204).end(); // Erfolgreiche Löschung
  } else {
    res.status(404).json({ error: "Veranstaltung nicht gefunden" });
  }
});

// Route - einzelnes Event bearbeiten
app.put("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);

  // Filtere nach einer eindeutigen Event ID
  const event = events.find((event) => event.id === eventId);

  if (!event) {
    return res.status(404).json({ error: "Veranstaltung nicht gefunden" });
  }

  // Veranstaltung updaten
  const updatedEvent = req.body;

  // Stellen Sie sicher, dass die ID der Veranstaltung unverändert bleibt
  updatedEvent.id = eventId;

  
  // Index der zu aktualisierenden Veranstaltung in der Liste finden
  const eventIndex = events.findIndex((event) => event.id === eventId);

  console.log('Index' + eventIndex);
  console.log(events[eventIndex]);
  // Aktualisieren Sie die Veranstaltung in der Liste
  events[eventIndex] = updatedEvent;

  console.log(events[eventIndex]);
  //console.log('1: ' + updatedEvent);

  //events.push(updatedEvent);

  console.log('2: ' + events);

  res.json(updatedEvent);
});

// Route - einzelnes Event genehmigen
app.post("/approve-event/:id", (req, res) => {
  const eventId = parseInt(req.params.id);

  // Suchen Sie die Veranstaltung anhand der ID
  const event = events.find((event) => event.id === eventId);

  if (!event) {
    return res.status(403).json({ error: "Veranstaltung nicht gefunden" });
  }

  if (event.entry.approved == true) {
    return res
      .status(400)
      .json({ error: "Veranstaltung ist bereits genehmigt" });
  } 
  else {
    event.entry.approved = true;
  }

  // Protokollieren Sie die Genehmigungsaktion
  const auditLogEntry = {
    timestamp: new Date().toISOString(),
    action: "Genehmigung",
    event: event.entry.title,
    approvedBy: "Admin", // Sie können hier den Benutzer angeben, der die Genehmigung durchführt
  };

  const auditLogData = JSON.stringify(auditLogEntry) + "\n";

  fs.appendFile(auditLogFilePath, auditLogData, (err) => {
    if (err) {
      console.error("Fehler beim Schreiben des Audit-Logs: ", err);
    }
  });

  fs.writeFile("events.json", JSON.stringify(events, null, 2), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Fehler beim Speichern der Veranstaltung" });
    }

    res.json(event);
  });
});

// Route - externes Event hinzufügen
app.post("/add-external-event", (req, res) => {
  const eventData = req.body; // Die externen Veranstaltungsdaten aus dem Request Body

  if (!eventData || !eventData.entry) {
    return res
      .status(400)
      .json({ error: "Ungültige Daten: Event-Daten fehlen" });
  }

  // Überprüfen Sie, ob die Daten bereits eine "softwareVersion" haben. Wenn nicht, weisen Sie null zu.
  if (!eventData.softwareVersion) {
    eventData.softwareVersion = null;
  }

  // Erzeugen Sie eine eindeutige ID 
  const eventId = events.length + 1;

  // Fügen Sie die Daten der neuen Veranstaltung hinzu
  const newEvent = {
    id: eventId,
    title: eventData.entry.title,
    beschreibung: eventData.entry.beschreibung,
    location: eventData.entry.location,
    date: eventData.entry.date,
    price: eventData.entry.price,
    createdBy: eventData.createdBy,
    createdOn: eventData.createdOn,
    softwareVersion: eventData.softwareVersion,
    approved: false, // Die Veranstaltung ist standardmäßig nicht genehmigt
  };

  events.push(newEvent);

  res.json(newEvent);
});

// Route - erstellen Testdaten
app.post("/generate-test-data", (req, res) => {

  const numberOfTestEvents = 10; // wieviele Testsätze sollen erstellt werden

  for (let i = 0; i < numberOfTestEvents; i++) {
    const newEvent = {
      createdOn: "Terminal361",
      createdBy: "Testbenutzer",
      softwareVersion: 1.0,
      entry: {
      title: `Test-Veranstaltung ${i + 1}`,
      beschreibung: `Dies ist eine Testveranstaltung Nummer ${i + 1}`,
      location: "Testort",
      date: "2025-12-31",
      price: Math.floor(Math.random() * 100), // Zufälliger Preis zwischen 0 und 99
      approved: false
      },
      id: events.length + 1,
    };

    events.push(newEvent);
  }

  res.json({
    message: `${numberOfTestEvents} Testdatensätze wurden erstellt`,
  });
});

// Webservice auf Port 3000 starten
const port = 3000;
app.listen(port, () => {
  console.log(`Der Webservice läuft auf http://localhost:${port}`);
});
