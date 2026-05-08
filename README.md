# Suumadin

Suumadin on eestikeelne reaalajas party/klassimang. Mangijad loovad ruumi, vastavad loovatele kusimustele ja haaletevad parimate vastuste poolt.

## Tehnoloogiad

- Frontend: React 18, Vite, Tailwind CSS
- Animatsioonid: Motion
- 3D taust: Three.js
- Backend: Node.js, Express, Socket.IO
- Andmehoid: serveri malu, andmebaasi pole

## Lokaalne kaivitamine

Paigalda soltuvused:

```bash
npm install
npm --prefix server install
npm --prefix client install
```

Kaivita frontend ja backend korraga:

```bash
npm run dev
```

Vaikimisi aadressid:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

## Production build

```bash
npm --prefix client run build
```

Build tekib kausta `client/dist/`. Seda kausta ei hoita Git'is, sest Render/hostingu build teeb selle ise.

Kui frontend ja backend on eri domeenidel, maarake frontendi buildi ajal:

```bash
VITE_BACKEND_URL=https://suumadin-backend.onrender.com npm --prefix client run build
```

Windows PowerShellis:

```powershell
$env:VITE_BACKEND_URL='https://suumadin-backend.onrender.com'
npm --prefix client run build
```

## Projekti struktuur

```text
H2katon/
  client/
    public/
      suumadin_logo.png
    src/
      components/
      App.jsx
      main.jsx
      socket.js
      index.css
    package.json
    vite.config.js
  server/
    index.js
    package.json
  package.json
  README.md
```

## Socket.IO pohivoog

- `create-room`: loo ruum
- `join-room`: liitu ruumiga
- `start-game`: alusta mangu
- `submit-answer`: saada vastus
- `submit-vote`: haaleta
- `submit-medals`: saada medalivooru valikud
- `play-again`: alusta uuesti
- `game-state`: server saadab mangu oleku
- `timer-update`: server saadab taimeri seisu

## Markused

- Ruumid ja manguseis elavad ainult serveri malus. Serveri restart kustutab aktiivsed ruumid.
- `node_modules/`, `client/dist/`, logid ja pid-failid on ignoreeritud.
- `render.yaml` ja vana cPaneli workflow on eemaldatud; deploy seadistus peaks olema hostingu dashboardis.
