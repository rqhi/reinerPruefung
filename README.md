# reinerPruefung
Prüfungsleistung Webprogrammierung Wirtschaftsinformatik 2022 - 3. Semester

## Backend

Um das Backend zu starten, gehe in den `/backend`-Ordner und führe die folgenden Befehle aus:

```bash
npm install
node server.js
```

Der Webserver öffnet sich auf [http://localhost:3000](http://localhost:3000).

## Frontend

Um das Frontend zu starten, gehe in den `/frontend`-Ordner und führe die folgenden Befehle aus:

```bash
npm install
npm start
```

Der Webserver für das Frontend öffnet sich auf [http://localhost:3001](http://localhost:3001).

## API-Endpunkte

- `GET /approved-events`:
Hol Dir alle genehmigten Veranstaltungen und sieh sie nach dem Datum sortiert an, beginnend mit den neuesten.

- `GET /unapproved-events`:
Hol Dir alle nicht genehmigten Veranstaltungen.

- ` POST /add-event`:
Erstelle eine neue Veranstaltung. Du musst Daten im Request Body senden, einschließlich Titel, Beschreibung, Veranstaltungsort, Datum und Preis. Das Datum wird im deutschen Format (TT.MM.JJJJ) gespeichert.

- ` GET /search-events`:
Finde Veranstaltungen basierend auf einem Suchbegriff. Der Suchbegriff wird als Query-Parameter "query" erwartet.

- ` GET /events/:id`:
Hol Dir eine einzelne Veranstaltung anhand ihrer ID.

- ` DELETE /events/:id`:
Lösche eine einzelne Veranstaltung anhand ihrer ID.

- ` PUT /events/:id`:
Aktualisiere eine einzelne Veranstaltung anhand ihrer ID. Du musst Daten im Request Body senden.

- ` POST /approve-event/:id`:
Genehmige eine einzelne Veranstaltung anhand ihrer ID.

- ` POST /add-external-event`:
Füge eine externe Veranstaltung hinzu. Du musst Daten im Request Body senden, einschließlich Titel, Beschreibung, Veranstaltungsort, Datum, Preis, createdBy und createdOn.

- ` POST /generate-test-data`:
Generiere und speichere Testdaten für Veranstaltungen. Erstelle eine festgelegte Anzahl von Testdatensätzen mit zufälligen Daten und speichere sie in der events.json-Datei.