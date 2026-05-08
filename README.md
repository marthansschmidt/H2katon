# Suumadin

Suumadin on eestikeelne reaalajas klassi- ja seltskonnamäng. Mängijad loovad ruumi, vastavad loovatele küsimustele ning hääletavad parimate vastuste poolt.

## Tehnoloogiad

- Frontend: React 18, Vite, Tailwind CSS
- Animatsioonid: Motion
- 3D-taust: Three.js
- Backend: Node.js, Express, Socket.IO
- Andmehoid: serveri mälu, eraldi andmebaasi pole

## Lokaalne käivitamine

Paigalda sõltuvused:

```bash
npm install
npm --prefix server install
npm --prefix client install
```

Käivita backend ja frontend korraga:

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

Build tekib kausta `client/dist/`. Seda kausta ei hoita Git'is, sest hosting ehitab selle ise.

Kui frontend ja backend on eri domeenidel, määra frontendi buildi ajal backend URL:

```bash
VITE_BACKEND_URL=https://suumadin-backend.onrender.com npm --prefix client run build
```

Windows PowerShellis:

```powershell
$env:VITE_BACKEND_URL='https://suumadin-backend.onrender.com'
npm --prefix client run build
```

Kui `VITE_BACKEND_URL` puudub, kasutab frontend lokaalselt `http://localhost:3001` ja productionis vaikimisi `https://suumadin-backend.onrender.com`.

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

## Mängu põhivoog

1. Üks mängija loob ruumi.
2. Teised liituvad ruumikoodiga.
3. Host alustab mängu.
4. Mängijad vastavad küsimustele.
5. Vastuste poolt hääletatakse.
6. Punktid arvutatakse serveris ja mäng liigub järgmisesse vooru.

## Socket.IO sündmused

- `create-room`: loo ruum
- `join-room`: liitu ruumiga
- `start-game`: alusta mängu
- `submit-answer`: saada vastus
- `submit-vote`: hääleta
- `submit-medals`: saada medalivooru valikud
- `play-again`: alusta uuesti
- `game-state`: server saadab mängu oleku
- `timer-update`: server saadab taimeri seisu

## Märkused

- Ruumid ja mänguseis elavad serveri mälus. Serveri restart kustutab aktiivsed ruumid.
- `node_modules/`, `client/dist/`, logid ja pid-failid on ignoreeritud.
- `render.yaml` ei ole repos vajalik, kui Renderi build ja start käsud on dashboardis seadistatud.
