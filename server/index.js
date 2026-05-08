const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

const ROUND1_PROMPTS = [
  'Mis oleks kõige naljakam asi, mida {nimi} võiks eksami ajal teha?',
  'Kui {nimi} oleks koolidirektor, mis oleks esimene asi, mida ta muudaks?',
  'Mis on kõige veidram koht, kus {nimi} võiks kodutööd teha?',
  'Kui {nimi} oleks klassijuhataja, mida ta keelaks?',
  'Mis oleks kõige naljakam vabandus, mida {nimi} võiks kasutada hilinemiseks?',
  'Kui {nimi} peaks pidama koolis kõne, millest ta räägiks?',
  'Mis oleks kõige imelikum koolikott, mis {nimi}-l võiks olla?',
  'Kui {nimi} oleks kooli maskott, milline ta oleks?',
  'Mis oleks kõige hullem kontrolltöö, mida {nimi} võiks saada?',
  'Kui {nimi} oleks õpetaja, milline aine oleks tema oma?',
  'Mis oleks kõige naljakam asi, mida {nimi} võiks sööklas teha?',
  'Kui {nimi} peaks ühe koolireegli eemaldama, mis see oleks?',
  'Mis oleks kõige imelikum projekt, mida {nimi} võiks teha?',
  'Kui {nimi} oleks kuulus inimene, mille poolest ta tuntud oleks?',
  'Mis oleks kõige veidram põhjus, miks {nimi} ei teinud kodutööd?',
  'Kui {nimi} oleks filmis, mis roll tal oleks?',
  'Mis oleks kõige naljakam hüüdnimi, mida {nimi} võiks saada?',
  'Kui {nimi} peaks korraldama kooli ürituse, mis see oleks?',
  'Mis oleks kõige kummalisem aine, mida {nimi} tahaks õppida?',
  'Kui {nimi} oleks kooli reegel, milline ta oleks?',
  'Mis oleks kõige naljakam asi, mida {nimi} võiks sporditunnis teha?',
  'Kui {nimi} oleks kooli legend, mille poolest ta tuntud oleks?',
  'Mis oleks kõige hullem koht, kus {nimi} võiks magama jääda?',
  'Kui {nimi} oleks klassi esindaja, mida ta lubaks?',
  'Mis oleks kõige imelikum küsimus, mida {nimi} võiks tunnis küsida?',
  'Kui {nimi} peaks valima ühe töö terveks eluks, mis see oleks?',
  'Mis oleks kõige naljakam asi, mida {nimi} võiks esitluse ajal teha?',
  'Kui {nimi} oleks kooli reeglite muutja, mida ta lisaks?',
  'Mis oleks kõige veidram asi, mida {nimi} võiks kooli kaasa võtta?',
  'Kui {nimi} oleks tunnikell, millal ta heliseks?',
  'Mis oleks kõige naljakam asi, mida {nimi} võiks klassipildil teha?',
  'Kui {nimi} oleks kooli direktor üheks päevaks, mida ta lubaks?',
  'Mis oleks kõige imelikum eksam, mida {nimi} võiks teha?',
  'Kui {nimi} oleks kooli reklaam, mida ta ütleks?',
  'Mis oleks kõige naljakam asi, mida {nimi} võiks rühmatöös teha?',
  'Kui {nimi} oleks kooli meem, milline see oleks?',
  'Mis oleks kõige hullem päev, mida {nimi} võiks koolis kogeda?',
  'Mis oleks kõige imelikum koht, kus {nimi} võiks õppida?',
];

const ROUND2_PROMPTS = [
  'Mis oleks kõige hullem põhjus kooli mitte tulla?',
  'Mis oleks kõige naljakam koolivorm?',
  'Mis oleks kõige mõttetum kooliaine?',
  'Mis oleks parim vabandus kontrolltöö vältimiseks?',
  'Mis oleks kõige hullem klassireegel?',
  'Mis oleks kõige naljakam kooli nimi?',
  'Mis oleks kõige halvem asi, mida õpetaja võiks öelda?',
  'Mis oleks kõige veidram kooliprojekt?',
  'Mis oleks kõige naljakam asi, mida direktor võiks teha?',
  'Mis oleks kõige hullem koht õppimiseks?',
  'Mis oleks kõige parem asi koolis keelata?',
  'Mis oleks kõige naljakam spordiala koolis?',
  'Mis oleks kõige imelikum kodutöö?',
  'Mis oleks kõige hullem koolitoit?',
  'Mis oleks kõige naljakam asi, mida klass võiks teha?',
  'Mis oleks kõige veidram eksam?',
  'Mis oleks kõige naljakam asi, mida tunnis juhtuda?',
  'Mis oleks kõige hullem koolipäev?',
  'Mis oleks kõige parem põhjus tunni ära jätmiseks?',
  'Mis oleks kõige naljakam kooli üritus?',
  'Mis oleks kõige hullem rühmatöö?',
  'Mis oleks kõige imelikum küsimus õpetajale?',
  'Mis oleks kõige naljakam asi, mida keegi esitlusel teeb?',
  'Mis oleks kõige hullem karistus?',
  'Mis oleks kõige veidram kooliklubi?',
  'Mis oleks kõige naljakam klassinimi?',
  'Mis oleks kõige hullem aine terveks aastaks?',
  'Mis oleks kõige naljakam asi, mida võiks direktor keelata?',
  'Mis oleks kõige imelikum koolipäeva algus?',
];

const ROUND3_PROMPTS = [
  'Kirjelda oma ideaalset koolipäeva kolme sõnaga.',
  'Leiuta uus koolireegel.',
  'Mis oleks parim viis õppimiseks?',
  'Kirjelda halvimat võimalikku koolipäeva.',
  'Leiuta uus kooliaine.',
  'Mis muudaks kooli lõbusamaks?',
  'Kirjelda ideaalset õpetajat.',
  'Mis on kõige parem asi kooli juures?',
  'Mis on kõige hullem asi kooli juures?',
  'Kirjelda ideaalset klassi.',
  'Mis oleks ideaalne vahetund?',
  'Leiuta uus kooli üritus.',
  'Mis muudaks tunnid huvitavamaks?',
  'Kirjelda ideaalset rühmatööd.',
  'Mis oleks parim viis eksami tegemiseks?',
  'Kirjelda ideaalset koolireisi.',
  'Mis oleks parim kooli traditsioon?',
  'Leiuta uus kooliklubi.',
  'Mis teeks kooli lihtsamaks?',
  'Kirjelda ideaalset koolimaja.',
  'Mis oleks kõige parem koolitoit?',
  'Kirjelda ideaalset õpetamisviisi.',
  'Mis muudaks õppimise kiiremaks?',
  'Mis oleks ideaalne koolipäeva algus?',
];


const BOT_ANSWERS = [
  'Kindlasti midagi väga imelikku.',
  'See on nii naljakas, et ma ei saa isegi öelda.',
  'Keegi tegelikult ei tea, aga legend räägib...',
  'Internet ütleb, et see on saladus.',
  'Ma küsiks pigem ChatGPT käest.',
  'Vastus on 42. Alati.',
  'Ma ei oska vastata, aga mu kass teaks.',
  'Ilmselt midagi sellist, mis läheb TikToki.',
  'Koolis tohib ainult tantsides liikuda.',
  'Professionaalne magamine - hindega!',
  'Ta jäi kodus peegli ette enda peale naerma.',
  'Ema, palun veel 5 minutit!',
  'Suudab magada silmad lahti.',
  'TikToki tantsu analüüs.',
  'Ta toob alati snäkke kaasa.',
  'Iga reede on pidžaamapäev.',
  'Telepaat - aga ainult loomadega.',
  'Snäkitegemine edasijõudnutele.',
  'Meemide ajalugu ja kultuur.',
  'Strateegiline tunnikõrvale hiilimine.',
];

function randomBotAnswer() {
  return BOT_ANSWERS[Math.floor(Math.random() * BOT_ANSWERS.length)];
}

var rooms = {};

function generateRoomCode() {
  var code = '';
  for (var i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  if (rooms[code]) return generateRoomCode();
  return code;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomPrompt(arr, usedPrompts) {
  var available = arr.filter(function(p) { return usedPrompts.indexOf(p) === -1; });
  if (available.length === 0) {
    usedPrompts.length = 0;
    available = arr.slice();
  }
  var chosen = available[Math.floor(Math.random() * available.length)];
  usedPrompts.push(chosen);
  return chosen;
}

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = a[i]; a[i] = a[j]; a[j] = temp;
  }
  return a;
}

function addScore(room, playerId, points) {
  var player = room.players.find(function(p) { return p.id === playerId; });
  if (player) player.score += points;
}

function startTimer(roomCode, seconds, onEnd) {
  var room = rooms[roomCode];
  if (!room) return;
  room.timer = seconds;
  io.to(roomCode).emit('timer-update', room.timer);
  room.timerInterval = setInterval(function() {
    if (room.timer <= 0) {
      clearInterval(room.timerInterval);
      room.timerInterval = null;
      onEnd();
      return;
    }
    room.timer--;
    io.to(roomCode).emit('timer-update', room.timer);
  }, 1000);
}

function stopTimer(roomCode) {
  var room = rooms[roomCode];
  if (room && room.timerInterval) {
    clearInterval(room.timerInterval);
    room.timerInterval = null;
  }
}

function getPublicState(room) {
  return {
    hostId: room.hostId,
    players: room.players.map(function(p) {
      return { id: p.id, name: p.name, score: p.score, isBot: p.isBot || false };
    }),
    state: room.state,
    currentRound: room.currentRound,
    roundPhase: room.roundPhase,
    currentSubRound: room.currentSubRound,
    totalSubRounds: room.totalSubRounds,
    currentPrompt: room.currentPrompt,
    promptPlayerId: room.promptPlayerId,
    battlePlayers: room.battlePlayers || [],
    answers: (room.answers || []).map(function(a) {
      return {
        playerId: a.playerId,
        playerName: a.playerName,
        text: a.text,
        votes: room.votes[a.playerId] || 0,
      };
    }),
    answeredCount: (room.answers || []).length,
    expectedAnswers: room.expectedAnswers || room.players.length,
    votedCount: (room.votedPlayers || []).length,
    expectedVoters: room.expectedVoters || room.players.length,
    medals: room.publicMedals || null,
  };
}

function emitState(roomCode) {
  var room = rooms[roomCode];
  if (room) io.to(roomCode).emit('game-state', getPublicState(room));
}

function startRound1(roomCode) {
  var room = rooms[roomCode];
  room.currentRound = 1;
  room.roundPhase = 'intro';
  room.currentSubRound = 1;
  room.totalSubRounds = 2;
  emitState(roomCode);
  setTimeout(function() { startR1Prompt(roomCode); }, 5000);
}

function startR1Prompt(roomCode) {
  var room = rooms[roomCode];
  if (!room) return;
  var promptPlayer = pickRandom(room.players);
  var promptTemplate = pickRandomPrompt(ROUND1_PROMPTS, room.usedR1Prompts);
  room.currentPrompt = promptTemplate.replace(/{nimi}/g, promptPlayer.name);
  room.promptPlayerId = promptPlayer.id;
  room.answers = [];
  room.votes = {};
  room.votedPlayers = [];
  room.roundPhase = 'prompt';
  room.expectedAnswers = room.players.length;
  emitState(roomCode);
  startTimer(roomCode, 30, function() { r1MoveToReveal(roomCode); });
  scheduleBotAnswers(roomCode);
}

function r1MoveToReveal(roomCode) {
  var room = rooms[roomCode];
  if (!room || room.roundPhase !== 'prompt') return;
  stopTimer(roomCode);
  room.roundPhase = 'reveal';
  emitState(roomCode);
  setTimeout(function() { r1MoveToVote(roomCode); }, 3000);
}

function r1MoveToVote(roomCode) {
  var room = rooms[roomCode];
  if (!room) return;
  room.roundPhase = 'vote';
  room.expectedVoters = room.players.length;
  emitState(roomCode);
  startTimer(roomCode, 15, function() { r1FinishVoting(roomCode); });
  scheduleBotVotes(roomCode, room.players);
}

function r1FinishVoting(roomCode) {
  var room = rooms[roomCode];
  if (!room) return;
  stopTimer(roomCode);
  room.answers.forEach(function(answer) {
    var voteCount = room.votes[answer.playerId] || 0;
    if (voteCount === 0) return;
    if (answer.playerId === room.promptPlayerId) {
      addScore(room, answer.playerId, voteCount * 1000);
    } else {
      addScore(room, answer.playerId, voteCount * 500);
    }
  });
  room.roundPhase = 'results';
  emitState(roomCode);
  setTimeout(function() {
    if (room.currentSubRound < room.totalSubRounds) {
      room.currentSubRound++;
      startR1Prompt(roomCode);
    } else {
      showScoreboard(roomCode, function() { startRound2(roomCode); });
    }
  }, 10000);
}

function startRound2(roomCode) {
  var room = rooms[roomCode];
  room.currentRound = 2;
  room.roundPhase = 'intro';
  room.currentSubRound = 1;
  room.totalSubRounds = Math.min(3, Math.max(2, Math.floor(room.players.length / 2) + 1));
  room.usedBattlePairs = [];
  emitState(roomCode);
  setTimeout(function() { startR2Battle(roomCode); }, 5000);
}

function startR2Battle(roomCode) {
  var room = rooms[roomCode];
  if (!room) return;
  var available = room.players.filter(function(p) { return room.usedBattlePairs.indexOf(p.id) === -1; });
  if (available.length < 2) {
    available = room.players.slice();
    room.usedBattlePairs = [];
  }
  var shuffled = shuffle(available);
  var pair = shuffled.slice(0, 2);
  room.battlePlayers = pair.map(function(p) { return { id: p.id, name: p.name }; });
  room.usedBattlePairs.push(pair[0].id, pair[1].id);
  room.currentPrompt = pickRandomPrompt(ROUND2_PROMPTS, room.usedR2Prompts);
  room.promptPlayerId = null;
  room.answers = [];
  room.votes = {};
  room.votedPlayers = [];
  room.roundPhase = 'prompt';
  room.expectedAnswers = 2;
  emitState(roomCode);
  startTimer(roomCode, 30, function() { r2MoveToReveal(roomCode); });
  var battleBots = room.players.filter(function(p) {
    return p.isBot && pair.some(function(bp) { return bp.id === p.id; });
  });
  battleBots.forEach(function(bot) {
    var delay = 2000 + Math.random() * 3000;
    setTimeout(function() {
      if (!rooms[roomCode] || room.roundPhase !== 'prompt') return;
      if (room.answers.some(function(a) { return a.playerId === bot.id; })) return;
      room.answers.push({ playerId: bot.id, playerName: bot.name, text: randomBotAnswer() });
      io.to(roomCode).emit('answer-count', { answeredCount: room.answers.length, expectedAnswers: room.expectedAnswers });
      if (room.answers.length >= room.expectedAnswers) r2MoveToReveal(roomCode);
    }, delay);
  });
}

function r2MoveToReveal(roomCode) {
  var room = rooms[roomCode];
  if (!room || room.roundPhase !== 'prompt') return;
  stopTimer(roomCode);
  room.roundPhase = 'reveal';
  emitState(roomCode);
  setTimeout(function() { r2MoveToVote(roomCode); }, 3000);
}

function r2MoveToVote(roomCode) {
  var room = rooms[roomCode];
  if (!room) return;
  room.roundPhase = 'vote';
  var voters = room.players.filter(function(p) {
    return !room.battlePlayers.some(function(bp) { return bp.id === p.id; });
  });
  room.expectedVoters = voters.length;
  emitState(roomCode);
  if (room.expectedVoters === 0) {
    r2FinishVoting(roomCode);
    return;
  }
  startTimer(roomCode, 15, function() { r2FinishVoting(roomCode); });
  voters.filter(function(p) { return p.isBot; }).forEach(function(bot) {
    var delay = 1000 + Math.random() * 3000;
    setTimeout(function() {
      if (!rooms[roomCode] || room.roundPhase !== 'vote') return;
      if (room.votedPlayers.indexOf(bot.id) !== -1) return;
      var chosen = pickRandom(room.answers);
      if (chosen) room.votes[chosen.playerId] = (room.votes[chosen.playerId] || 0) + 1;
      room.votedPlayers.push(bot.id);
      io.to(roomCode).emit('vote-count', { votedCount: room.votedPlayers.length, expectedVoters: room.expectedVoters });
      if (room.votedPlayers.length >= room.expectedVoters) r2FinishVoting(roomCode);
    }, delay);
  });
}

function r2FinishVoting(roomCode) {
  var room = rooms[roomCode];
  if (!room) return;
  stopTimer(roomCode);
  room.answers.forEach(function(answer) {
    var voteCount = room.votes[answer.playerId] || 0;
    addScore(room, answer.playerId, voteCount * 500);
  });
  room.roundPhase = 'results';
  emitState(roomCode);
  setTimeout(function() {
    if (room.currentSubRound < room.totalSubRounds) {
      room.currentSubRound++;
      startR2Battle(roomCode);
    } else {
      showScoreboard(roomCode, function() { startRound3(roomCode); });
    }
  }, 10000);
}

function startRound3(roomCode) {
  var room = rooms[roomCode];
  room.currentRound = 3;
  room.roundPhase = 'intro';
  room.currentSubRound = 1;
  room.totalSubRounds = 1;
  emitState(roomCode);
  setTimeout(function() { startR3Prompt(roomCode); }, 5000);
}

function startR3Prompt(roomCode) {
  var room = rooms[roomCode];
  if (!room) return;
  room.currentPrompt = pickRandomPrompt(ROUND3_PROMPTS, room.usedR3Prompts);
  room.promptPlayerId = null;
  room.answers = [];
  room.votes = {};
  room.votedPlayers = [];
  room.medals = {};
  room.publicMedals = null;
  room.roundPhase = 'prompt';
  room.expectedAnswers = room.players.length;
  room.battlePlayers = [];
  emitState(roomCode);
  startTimer(roomCode, 30, function() { r3MoveToReveal(roomCode); });
  scheduleBotAnswers(roomCode);
}

function r3MoveToReveal(roomCode) {
  var room = rooms[roomCode];
  if (!room || room.roundPhase !== 'prompt') return;
  stopTimer(roomCode);
  room.roundPhase = 'reveal';
  emitState(roomCode);
  setTimeout(function() { r3MoveToMedalVote(roomCode); }, 3000);
}

function r3MoveToMedalVote(roomCode) {
  var room = rooms[roomCode];
  if (!room) return;
  room.roundPhase = 'vote';
  room.expectedVoters = room.players.length;
  emitState(roomCode);
  startTimer(roomCode, 15, function() { r3FinishMedalVote(roomCode); });
  room.players.filter(function(p) { return p.isBot; }).forEach(function(bot) {
    var delay = 2000 + Math.random() * 4000;
    setTimeout(function() {
      if (!rooms[roomCode] || room.roundPhase !== 'vote') return;
      if (room.votedPlayers.indexOf(bot.id) !== -1) return;
      var others = room.answers.filter(function(a) { return a.playerId !== bot.id; });
      var shuffledOthers = shuffle(others).slice(0, 3);
      var medalTypes = ['gold', 'silver', 'bronze'];
      var medalChoices = [];
      for (var i = 0; i < shuffledOthers.length && i < 3; i++) {
        medalChoices.push({ playerId: shuffledOthers[i].playerId, medal: medalTypes[i] });
      }
      room.medals[bot.id] = medalChoices;
      room.votedPlayers.push(bot.id);
      io.to(roomCode).emit('vote-count', { votedCount: room.votedPlayers.length, expectedVoters: room.expectedVoters });
      if (room.votedPlayers.length >= room.expectedVoters) r3FinishMedalVote(roomCode);
    }, delay);
  });
}

function r3FinishMedalVote(roomCode) {
  var room = rooms[roomCode];
  if (!room) return;
  stopTimer(roomCode);
  var medalPoints = { gold: 1000, silver: 500, bronze: 300 };
  var medalCounts = {};
  var allMedals = Object.values(room.medals);
  for (var m = 0; m < allMedals.length; m++) {
    var choices = allMedals[m];
    for (var c = 0; c < choices.length; c++) {
      var pid = choices[c].playerId;
      var medal = choices[c].medal;
      if (!medalCounts[pid]) medalCounts[pid] = { gold: 0, silver: 0, bronze: 0 };
      medalCounts[pid][medal]++;
      addScore(room, pid, medalPoints[medal]);
    }
  }
  room.publicMedals = medalCounts;
  room.roundPhase = 'results';
  emitState(roomCode);
  setTimeout(function() {
    room.state = 'end';
    room.roundPhase = 'final';
    emitState(roomCode);
  }, 10000);
}

function showScoreboard(roomCode, nextFn) {
  var room = rooms[roomCode];
  if (!room) return;
  room.roundPhase = 'scoreboard';
  emitState(roomCode);
  setTimeout(function() { nextFn(); }, 10000);
}

function scheduleBotAnswers(roomCode) {
  var room = rooms[roomCode];
  if (!room) return;
  room.players.filter(function(p) { return p.isBot; }).forEach(function(bot) {
    var delay = 2000 + Math.random() * 4000;
    setTimeout(function() {
      if (!rooms[roomCode] || room.roundPhase !== 'prompt') return;
      if (room.answers.some(function(a) { return a.playerId === bot.id; })) return;
      room.answers.push({ playerId: bot.id, playerName: bot.name, text: randomBotAnswer() });
      io.to(roomCode).emit('answer-count', { answeredCount: room.answers.length, expectedAnswers: room.expectedAnswers });
      if (room.answers.length >= room.expectedAnswers) {
        if (room.currentRound === 1) r1MoveToReveal(roomCode);
        else if (room.currentRound === 3) r3MoveToReveal(roomCode);
      }
    }, delay);
  });
}

function scheduleBotVotes(roomCode, allPlayers) {
  var room = rooms[roomCode];
  if (!room) return;
  allPlayers.filter(function(p) { return p.isBot; }).forEach(function(bot) {
    var delay = 1000 + Math.random() * 3000;
    setTimeout(function() {
      if (!rooms[roomCode] || room.roundPhase !== 'vote') return;
      if (room.votedPlayers.indexOf(bot.id) !== -1) return;
      var others = room.answers.filter(function(a) { return a.playerId !== bot.id; });
      if (others.length > 0) {
        var chosen = pickRandom(others);
        room.votes[chosen.playerId] = (room.votes[chosen.playerId] || 0) + 1;
      }
      room.votedPlayers.push(bot.id);
      io.to(roomCode).emit('vote-count', { votedCount: room.votedPlayers.length, expectedVoters: room.expectedVoters });
      if (room.votedPlayers.length >= room.expectedVoters) {
        if (room.currentRound === 1) r1FinishVoting(roomCode);
      }
    }, delay);
  });
}

io.on('connection', function(socket) {
  console.log('Ühendus: ' + socket.id);

  socket.on('create-room', function(data, callback) {
    var playerName = data.playerName;
    var roomCode = generateRoomCode();
    rooms[roomCode] = {
      hostId: socket.id,
      players: [{ id: socket.id, name: playerName, score: 0 }],
      state: 'lobby',
      currentRound: 0,
      roundPhase: null,
      currentSubRound: 0,
      totalSubRounds: 0,
      currentPrompt: '',
      promptPlayerId: null,
      battlePlayers: [],
      answers: [],
      votes: {},
      votedPlayers: [],
      medals: {},
      publicMedals: null,
      usedBattlePairs: [],
      usedR1Prompts: [],
      usedR2Prompts: [],
      usedR3Prompts: [],
      expectedAnswers: 0,
      expectedVoters: 0,
      timer: 0,
      timerInterval: null,
    };
    socket.join(roomCode);
    socket.roomCode = roomCode;
    console.log('Ruum loodud: ' + roomCode + ' (host: ' + playerName + ')');
    callback({ success: true, roomCode: roomCode, playerId: socket.id });
    emitState(roomCode);
  });

  socket.on('join-room', function(data, callback) {
    var roomCode = data.roomCode.toUpperCase();
    var playerName = data.playerName;
    var room = rooms[roomCode];
    if (!room) return callback({ success: false, error: 'Ruumi ei leitud!' });
    if (room.state !== 'lobby') return callback({ success: false, error: 'Mäng on juba alanud!' });
    if (room.players.length >= 15) return callback({ success: false, error: 'Ruum on täis! (max 15)' });
    if (room.players.some(function(p) { return p.name === playerName; })) return callback({ success: false, error: 'See nimi on juba kasutusel!' });
    room.players.push({ id: socket.id, name: playerName, score: 0 });
    socket.join(roomCode);
    socket.roomCode = roomCode;
    callback({ success: true, roomCode: roomCode, playerId: socket.id });
    emitState(roomCode);
  });

  socket.on('add-bot', function(_, callback) {
    var room = rooms[socket.roomCode];
    if (!room || room.hostId !== socket.id || room.state !== 'lobby' || room.players.length >= 15) {
      if (callback) callback({ success: false, error: 'Ei saa botti lisada' });
      return;
    }
    var BOT_NAMES = ['Robot-Riho', 'Masina-Mari', 'Tehis-Toomas', 'Digi-Diana', 'Cyber-Karl', 'Algo-Anna'];
    var usedNames = room.players.map(function(p) { return p.name; });
    var name = null;
    for (var i = 0; i < BOT_NAMES.length; i++) {
      if (usedNames.indexOf(BOT_NAMES[i]) === -1) { name = BOT_NAMES[i]; break; }
    }
    if (!name) name = 'Bot-' + room.players.length;
    room.players.push({ id: 'bot-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5), name: name, score: 0, isBot: true });
    if (callback) callback({ success: true });
    emitState(socket.roomCode);
  });

  socket.on('remove-bot', function(data, callback) {
    var botId = data.botId;
    var room = rooms[socket.roomCode];
    if (!room || room.hostId !== socket.id || room.state !== 'lobby') {
      if (callback) callback({ success: false });
      return;
    }
    var idx = -1;
    for (var i = 0; i < room.players.length; i++) {
      if (room.players[i].id === botId && room.players[i].isBot) { idx = i; break; }
    }
    if (idx !== -1) room.players.splice(idx, 1);
    if (callback) callback({ success: true });
    emitState(socket.roomCode);
  });

  socket.on('start-game', function(_, callback) {
    var room = rooms[socket.roomCode];
    if (!room) { if (callback) callback({ success: false, error: 'Ruum ei eksisteeri' }); return; }
    if (room.hostId !== socket.id) { if (callback) callback({ success: false, error: 'Ainult host' }); return; }
    if (room.players.length < 2) { if (callback) callback({ success: false, error: 'Vähemalt 2 mängijat! Lisa bot.' }); return; }
    room.state = 'playing';
    startRound1(socket.roomCode);
    if (callback) callback({ success: true });
  });

  socket.on('submit-answer', function(data) {
    var text = data.text;
    var room = rooms[socket.roomCode];
    if (!room || room.roundPhase !== 'prompt') return;
    if (room.answers.some(function(a) { return a.playerId === socket.id; })) return;
    if (room.currentRound === 2) {
      var isBattle = room.battlePlayers.some(function(bp) { return bp.id === socket.id; });
      if (!isBattle) return;
    }
    var player = room.players.find(function(p) { return p.id === socket.id; });
    if (!player) return;
    room.answers.push({ playerId: socket.id, playerName: player.name, text: text.trim() });
    io.to(socket.roomCode).emit('answer-count', { answeredCount: room.answers.length, expectedAnswers: room.expectedAnswers });
    if (room.answers.length >= room.expectedAnswers) {
      if (room.currentRound === 1) r1MoveToReveal(socket.roomCode);
      else if (room.currentRound === 2) r2MoveToReveal(socket.roomCode);
      else if (room.currentRound === 3) r3MoveToReveal(socket.roomCode);
    }
  });

  socket.on('submit-vote', function(data) {
    var votedForPlayerId = data.votedForPlayerId;
    var room = rooms[socket.roomCode];
    if (!room || room.roundPhase !== 'vote' || room.currentRound === 3) return;
    if (room.votedPlayers.indexOf(socket.id) !== -1) return;
    if (votedForPlayerId === socket.id) return;
    if (!room.answers.some(function(a) { return a.playerId === votedForPlayerId; })) return;
    if (room.currentRound === 2) {
      var isBattlePlayer = room.battlePlayers.some(function(bp) { return bp.id === socket.id; });
      if (isBattlePlayer) return;
    }
    room.votes[votedForPlayerId] = (room.votes[votedForPlayerId] || 0) + 1;
    room.votedPlayers.push(socket.id);
    io.to(socket.roomCode).emit('vote-count', { votedCount: room.votedPlayers.length, expectedVoters: room.expectedVoters });
    if (room.votedPlayers.length >= room.expectedVoters) {
      if (room.currentRound === 1) r1FinishVoting(socket.roomCode);
      else if (room.currentRound === 2) r2FinishVoting(socket.roomCode);
    }
  });

  socket.on('submit-medals', function(data) {
    var choices = data.choices;
    var room = rooms[socket.roomCode];
    if (!room || room.roundPhase !== 'vote' || room.currentRound !== 3) return;
    if (room.votedPlayers.indexOf(socket.id) !== -1) return;
    if (!Array.isArray(choices) || choices.length > 3) return;
    var validMedals = ['gold', 'silver', 'bronze'];
    var usedMedals = {};
    for (var i = 0; i < choices.length; i++) {
      var ch = choices[i];
      if (validMedals.indexOf(ch.medal) === -1) return;
      if (usedMedals[ch.medal]) return;
      if (ch.playerId === socket.id) return;
      if (!room.answers.some(function(a) { return a.playerId === ch.playerId; })) return;
      usedMedals[ch.medal] = true;
    }
    room.medals[socket.id] = choices;
    room.votedPlayers.push(socket.id);
    io.to(socket.roomCode).emit('vote-count', { votedCount: room.votedPlayers.length, expectedVoters: room.expectedVoters });
    if (room.votedPlayers.length >= room.expectedVoters) r3FinishMedalVote(socket.roomCode);
  });

  socket.on('play-again', function() {
    var room = rooms[socket.roomCode];
    if (!room || room.hostId !== socket.id) return;
    stopTimer(socket.roomCode);
    room.state = 'lobby';
    room.currentRound = 0;
    room.roundPhase = null;
    room.currentSubRound = 0;
    room.totalSubRounds = 0;
    room.currentPrompt = '';
    room.promptPlayerId = null;
    room.battlePlayers = [];
    room.answers = [];
    room.votes = {};
    room.votedPlayers = [];
    room.medals = {};
    room.publicMedals = null;
    room.usedBattlePairs = [];
    room.expectedAnswers = 0;
    room.expectedVoters = 0;
    room.players.forEach(function(p) { p.score = 0; });
    emitState(socket.roomCode);
  });

  socket.on('disconnect', function() {
    var roomCode = socket.roomCode;
    if (!roomCode || !rooms[roomCode]) return;
    var room = rooms[roomCode];
    room.players = room.players.filter(function(p) { return p.id !== socket.id; });
    if (room.players.length === 0) {
      stopTimer(roomCode);
      delete rooms[roomCode];
      return;
    }
    if (room.hostId === socket.id) room.hostId = room.players[0].id;
    emitState(roomCode);
  });
});

app.get('/api/health', function(req, res) {
  res.json({ status: 'ok', rooms: Object.keys(rooms).length });
});

var PORT = process.env.PORT || 3001;
server.listen(PORT, function() {
  console.log('Mänguserver töötab pordil ' + PORT);
});
