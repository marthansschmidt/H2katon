# 🎮 Suumadin

Veebipõhine Suumadin mäng õpilaste omavahelise suhtlemise arendamiseks. Eestikeelne kasutajaliides.

## 📋 Kirjeldus

Suumadin on interaktiivne partei- ja klassimäng, kus mängijad annavad loomingulisi vastuseid küsimustele ja hääletavad parimate vastuste poolt.

### Mängu käik:

1. **Üks mängija loob ruumi** ja saab 4-kohalise numbrilise ruumikoodi (0000-9999)
2. **Teised liituvad** ruumikoodi sisestades
3. Host **alustab mängu** (vähemalt 2 mängijat)
4. **3 vooru** erinevate küsimustega:
   - **Voor 1 & 2:** Klassikaline Suumadin - kutsida vastuseid ja hääletada
   - **Voor 3:** Medal-voor - määrata kullast, hõbeda ja pronksi medalid

### Voorude käik:

- Küsimus nähtav kogu aja (nimed on **bold** ja suurem)
- Mängijad kirjutavad **lühikesed vastused** (30 sek)
- Vastused kuvatakse **anonüümselt**
- Mängijad **hääletavad** vastuste poolt (15 sek hääletamine)
- Punkte jagatakse häälte alusel (100p iga hääle eest)
- Tulemused nähtavad (10 sek)
- Pärast 3 vooru kuvatakse **lõpptulemus**

## 🛠️ Tehnoloogiad

| Komponent         | Tehnoloogia                          |
| ----------------- | ------------------------------------ |
| Frontend          | React 18 + Vite                      |
| Animatsioonid     | Framer Motion                        |
| 3D Graafika       | Three.js + WebGL (MagicRings efekt)  |
| Backend           | Node.js + Express                    |
| Reaalajas suhtlus | Socket.IO                            |
| Stiil             | Tailwind CSS + custom glass-morphism |
| Ikoonid           | Lucide React                         |
| Andmebaas         | Puudub (in-memory)                   |

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
lobby → intro → prompt → reveal/vote → results → scoreboard → prompt (järgmine voor)
                                                                    ↓
                                                           (3 vooru pärast)
                                                                    ↓
                                                                  end
```

### Voorude struktuuri

- **Round 1:** Klassikaline Suumadin
  - Prompt: "Mis oleks kõige naljakam asi, mida **[Nimi]** võiks teha?"
  - Vastamise aeg: 30s
  - Hääletamise aeg: 15s
- **Round 2:** Lahing (2 juhuslikku mängijat esitavad vastuseid)
  - Prompt: Tavaliselt üldine küsimus
  - Vastamise aeg: 30s
  - Hääletamise aeg: 15s

- **Round 3:** Medal-voor
  - Prompt: Küsimused ilma nimedeta (nt "Leiuta uus koolireegel")
  - Hääletamise aeg: 15s
  - Medal-valik: Kuld (1. koht), Hõbe (2. koht), Pronks (3. koht)

### Andmemudel (serveri mälus)

```javascript
room = {
  hostId: "socket-id", // Hosti tunnus
  players: [{ id, name, score, isBot }], // Mängijad
  state: "lobby", // Mängu faas
  currentRound: 1, // Praegune voor (1-3)
  currentSubRound: 1, // Allvooru number
  totalSubRounds: 2, // Allvoorude arv
  roundPhase: "prompt", // Faas: prompt, reveal, vote, results, scoreboard
  currentPrompt: "", // Praegune küsimus (nimed on bold)
  promptPlayerId: "", // Kelle nime promptis kasutatakse
  battlePlayers: [], // Round 2 lahingu mängijad
  answers: [{ playerId, playerName, text, votes }], // Vastused
  votes: { playerId: count }, // Hääled per vastus
  votedPlayers: [], // Hääletanud mängijad
  usedR1Prompts: [], // Kasutatud R1 küsimused
  usedR2Prompts: [], // Kasutatud R2 küsimused
  usedR3Prompts: [], // Kasutatud R3 küsimused
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

### Round 1 (Klassikaline Suumadin)

- "Mis oleks kõige veidram põhjus, miks **{nimi}** võiks kooli hilineda?"
- "Kui **{nimi}** oleks direktor, siis millise uue reegli ta kohe teeks?"
- "Mis oleks kõige naljakam asi, mida **{nimi}** võiks tunnis kogemata öelda?"

### Round 2 (Lahing)

- "Mis oleks parim vabandus kontrolltöö vältimiseks?"
- "Mis oleks kõige naljakam koolivorm?"
- "Mis oleks kõige hullem klassireegel?"

### Round 3 (Medal-voor)

- "Kirjelda oma ideaalset koolipäeva kolme sõnaga."
- "Leiuta uus koolireegel."
- "Mis muudaks kooli lõbusamaks?"

**Märkus:** Promptides asendatakse `{nimi}` juhusliku mängija nimega ja need kuvatakse **bold** ja suurem.

## ⚙️ Konfiguratsioon

Muudetavad väärtused `server/index.js` failis:

### Voorude taimerid:

- Prompti vastamise aeg: **30 sekundit**
- Hääletamise aeg: **15 sekundit**
- Tulemuste kuvamise aeg: **10 sekundit**
- Scoreboardide kuvamise aeg: **10 sekundit**

### Ruumi seaded:

- Ruumikoodide formaat: **4-kohaline number (0000-9999)**
- Max mängijaid: **15**
- Punktid hääle kohta: **100 punkti**
- Vooru arv: **3 vooru**

### Küsimuste andmebaas:

- **Round 1 Prompts:** 37+ kooliteemaliseid küsimusi mängijate nimedega
- **Round 2 Prompts:** 29+ üldiseid küsimusi
- **Round 3 Prompts:** 15+ loovad kutsed ilma nimedeta

> **Märkus:** Promptide duplikaate ei esine - iga küsimus kuvatakse max üks kord mängu käigus.

## ✨ Hetkeseisus olevad omadused

### UI/UX

- ✅ Animeeritud 3D taust (MagicRings - Three.js WebGL efekt)
- ✅ Glass-morphism disain modernsete gradient efektidega
- ✅ Sujuvad transitsioonid ja Framer Motion animatsioonid
- ✅ Instruktsiooni popup avaleheküljel
- ✅ Back-nupp lobbist avalehele tagasiminek
- ✅ Ruumikoodid on numbrilised (0000-9999)

### Mängumehaanika

- ✅ 3 vooru erinevate küsimuste ja taimeritega
- ✅ Medal-voor kulla, hõbeda ja pronksi valikuga
- ✅ Lahing (Battle) mode 2. vooruses
- ✅ Küsimused nähtavad kogu aja hääletamise ja medal-vooruses
- ✅ Mängijate nimed on **bold** ja suurem prompts
- ✅ 80+ eestikeelsed küsimused
- ✅ Bot-mängijate tugi hosti jaoks

### Jõudlus

- ✅ Optimeeritud Vite bundle (~56KB main, ~214KB vendors)
- ✅ Gzip kompressioon (~14KB main, ~200KB vendors)
- ✅ Kood eraldatud (code splitting) vendor-bundlede kaupa
- ✅ Cache headrite optimisatsioon produktsioonikiirenduseks
