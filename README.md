# reinerPruefung

Dieses Projekt ist Teil der Prüfungsleistung für die Veranstaltung Webprogrammierung im 3. Semester des Studiengangs Wirtschaftsinformatik im Jahr 2022.

## Backend

### Installation

Um das Backend zu starten, navigieren Sie zum /backend-Verzeichnis und führen Sie die folgenden Befehle aus:

```bash
cd backend/
npm install
node server.js
```

Der Webserver wird unter der Adresse http://localhost:3000 gestartet.

## Frontend

### Installation

Um das Frontend zu starten, navigieren Sie zum /frontend-Verzeichnis und führen Sie die folgenden Befehle aus:

```bash
cd frontend/
npm install
npm start
```

Der Webserver wird unter der Adresse http://localhost:3001 gestartet und kann im Browser geöffnet werden.

## Verwendung

Nachdem sowohl das Backend als auch das Frontend gestartet wurden, können Sie auf die Anwendung zugreifen, indem Sie die oben genannten URLs in Ihrem Browser öffnen.

## API-Endpunkte

- `GET /events`: Ruft alle Veranstaltungen ab.
- `GET /events/:id`: Ruft eine einzelne Veranstaltung anhand der ID ab.
- `POST /generate-test-data`: Erstellt Testdaten und speichert sie in der `events.json`-Datei.
- Weitere Endpunkte entsprechend der Implementierung.

## API-Endpunkte

- `GET /approved-events`:
Ruft alle genehmigten Veranstaltungen ab und sortiert sie nach dem Datum in absteigender Reihenfolge.

- `GET /unapproved-events`:
Ruft alle nicht genehmigten Veranstaltungen ab.

- ` POST /add-event`:
Erstellt eine neue Veranstaltung. Erfordert Daten im Request Body, einschließlich Titel, Beschreibung, Veranstaltungsort, Datum und Preis. Das Datum wird im deutschen Format (DD.MM.YYYY) gespeichert.

- ` GET /search-events`:
Ruft Veranstaltungen basierend auf einem Suchbegriff ab. Der Suchbegriff wird als Query-Parameter "query" erwartet.

- ` GET /events/:id`:
Ruft eine einzelne Veranstaltung anhand der ID ab.

- ` DELETE /events/:id`:
Löscht eine einzelne Veranstaltung anhand der ID.

- ` PUT /events/:id`:
Aktualisiert eine einzelne Veranstaltung anhand der ID. Erfordert Daten im Request Body.

- ` POST /approve-event/:id`:
Genehmigt eine einzelne Veranstaltung anhand der ID.

- ` POST /add-external-event`:
Fügt eine externe Veranstaltung hinzu. Erfordert Daten im Request Body, einschließlich Titel, Beschreibung, Veranstaltungsort, Datum, Preis, createdBy und createdOn.

- ` POST /generate-test-data`:
Generiert und speichert Testdaten für Veranstaltungen. Erstellt eine festgelegte Anzahl von Testdatensätzen mit zufälligen Daten und speichert sie in der events.json-Datei.


## Entwicklungsmodus

Die Anwendung wurde für den Entwicklungsmodus konfiguriert. Änderungen an der Frontend-Anwendung werden automatisch aktualisiert, während der Entwicklungsserver läuft.