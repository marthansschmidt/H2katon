# 🎮 Suumadin

Veebipõhine Suumadin mäng õpilaste omavahelise suhtlemise arendamiseks. Eestikeelne kasutajaliides.

## 📋 Kirjeldus

Mängu käik:

1. **Üks mängija loob ruumi** ja saab ruumikoodi
2. **Teised liituvad** ruumikoodiga
3. Host **alustab mängu** (vähemalt 2 mängijat)
4. Iga voor kuvab **prompti** (küsimuse), kus kasutatakse mängijate nimesid
5. Mängijad kirjutavad **lühikesed vastused** (45 sek)
6. Vastused kuvatakse **anonüümselt**
7. Mängijad **hääletavad** parima vastuse poolt (30 sek)
8. Punkte jagatakse häälte alusel (100p iga hääle eest)
9. Pärast 5 vooru kuvatakse **lõpptulemus**

## 🛠️ Tehnoloogiad

| Komponent         | Tehnoloogia                         |
| ----------------- | ----------------------------------- |
| Frontend          | React 18 + Vite                     |
| Backend           | Node.js + Express                   |
| Reaalajas suhtlus | Socket.IO                           |
| Stiil             | Puhas CSS (modern, gradient-põhine) |
| Andmebaas         | Puudub (in-memory)                  |

## 🚀 Käivitamine

### 1. Klooni projekt ja paigalda sõltuvused

```bash
# Serveri sõltuvused
cd server
npm install

# Kliendi sõltuvused
cd ../client
npm install
```

### 2. Käivita server (Terminal 1)

```bash
cd server
npm run dev
```

Server käivitub pordil **3001**.

### 3. Käivita klient (Terminal 2)

```bash
cd client
npm run dev
```

Klient käivitub pordil **5173**. Ava brauser aadressil: **http://localhost:5173**

### 4. Mängimine

1. Ava brauser aadressil `http://localhost:5173`
2. Vajuta "Loo ruum" ja sisesta oma nimi
3. Jaga ruumikoodi teistele mängijatele
4. Teised avavad sama aadressi ja vajutavad "Liitu ruumiga"
5. Host vajutab "Alusta mängu"
6. Mängi! 🎉

> **Vihje:** Testi lokaalses võrgus – ava mitu brauseri akent/tabi, et simuleerida mitut mängijat.

## 📁 Projekti struktuur

```
H2katon/
├── server/
│   ├── package.json          # Serveri sõltuvused
│   └── index.js              # Express + Socket.IO server
├── client/
│   ├── package.json          # Kliendi sõltuvused
│   ├── vite.config.js        # Vite konfiguratsioon
│   ├── index.html            # HTML mall
│   └── src/
│       ├── main.jsx          # React entry point
│       ├── App.jsx           # Peamine komponent + olekuhaldus
│       ├── socket.js         # Socket.IO ühendus
│       ├── index.css         # Globaalsed stiilid
│       └── components/
│           ├── HomePage.jsx  # Avaleht (loo/liitu)
│           ├── Lobby.jsx     # Ooteruum
│           ├── PromptPhase.jsx  # Küsimuse faas
│           ├── RevealPhase.jsx  # Vastuste kuvamine
│           ├── VotePhase.jsx    # Hääletamine
│           ├── ScoresPhase.jsx  # Punktitabel
│           └── EndScreen.jsx    # Lõpuekraan
└── README.md
```

## 🎯 Mängu loogika

### Olekumasin (State Machine)

```
lobby → prompt → reveal → vote → scores → prompt (järgmine voor)
                                            ↓
                                     (5 vooru pärast)
                                            ↓
                                           end → lobby (mängi uuesti)
```

### Andmemudel (serveri mälus)

```javascript
room = {
  hostId: "socket-id", // Hosti tunnus
  players: [{ id, name, score }], // Mängijad
  state: "lobby", // Mängu faas
  currentRound: 0, // Praegune voor
  totalRounds: 5, // Voorude arv
  currentPrompt: "", // Praegune küsimus
  answers: [{ playerId, text }], // Vastused
  votes: { playerId: count }, // Hääled
  votedPlayers: [], // Hääletanud mängijad
  usedPrompts: [], // Kasutatud küsimused
};
```

### Socket.IO sündmused

| Sündmus         | Suund           | Kirjeldus       |
| --------------- | --------------- | --------------- |
| `create-room`   | Klient → Server | Loo uus ruum    |
| `join-room`     | Klient → Server | Liitu ruumiga   |
| `start-game`    | Klient → Server | Alusta mängu    |
| `submit-answer` | Klient → Server | Saada vastus    |
| `submit-vote`   | Klient → Server | Hääleta         |
| `play-again`    | Klient → Server | Mängi uuesti    |
| `game-state`    | Server → Klient | Mängu olek      |
| `timer-update`  | Server → Klient | Taimeri uuendus |

## 📝 Promptide näited

- "Mis on kõige veidram põhjus, miks **Mari** võiks kooli hilineda?"
- "Kui **Jaan** oleks direktor, siis millise uue reegli ta kohe teeks?"
- "Mis oleks kõige naljakam asi, mida **Kati** võiks tunnis kogemata öelda?"

Promptides asendatakse `{nimi}` juhusliku mängija nimega.

## ⚙️ Konfiguratsioon

Muudetavad väärtused `server/index.js` failis:

- `totalRounds: 5` – voorude arv
- Vastamise aeg: `45` sekundit
- Hääletamise aeg: `30` sekundit
- Max mängijaid: `8`
- Punktid hääle kohta: `100`
