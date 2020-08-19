const clubs = [
  { id: 1, name: "Bromsgrove Hockey Club", location: "Bromsgrove" },
  { id: 2, name: "Droitwich Hockey Club", location: "Droitwich" },
  { id: 3, name: "Redditch Hockey Club", location: "Redditch" },
];

const squads = [
  { id: 1, clubId: 1, name: "Mens seconds", league: 1 },
  { id: 2, clubId: 1, name: "Mens firsts", league: 1 },
  { id: 3, clubId: 2, name: "Mens firsts", league: 1 },
  { id: 4, clubId: 3, name: "Mens firsts", league: 2 },
];

const players = [
  {
    id: 1,
    clubId: 1,
    squadId: 1,
    firstName: "Billy",
    lastName: "Bitcoin",
    position: "Forward",
  },
  {
    id: 2,
    clubId: 2,
    squadId: 3,
    firstName: "Carl",
    lastName: "Davies",
    position: "Defence",
  },
  {
    id: 3,
    clubId: 3,
    squadId: 4,
    firstName: "David",
    lastName: "Davidson",
    position: "Attack",
  },
  {
    id: 4,
    clubId: 1,
    squadId: 1,
    firstName: "Liam",
    lastName: "Woolwich",
    position: "Goalkeeper",
  },
  {
    id: 5,
    clubId: 1,
    squadId: 2,
    firstName: "Kieron",
    lastName: "Dowrich",
    position: "Goalkeeper",
  },
];

const leagues = [
  { id: 1, name: "Division 1" },
  { id: 2, name: "Division 2" },
];

const transfers = [
  {
    id: 1,
    playerId: 2,
    fromId: 3,
    toId: 4,
  },
  {
    id: 2,
    playerId: 1,
    fromId: 1,
    toId: 4,
  },
];

const newClub = {
  id: null,
  name: "",
  location: "",
};

const newSquad = {
  id: null,
  clubId: null,
  name: "",
  league: null,
};

const newPlayer = {
  id: null,
  firstName: "",
  lastName: "",
  position: "",
  squadId: null,
  clubId: null,
};

const newLeague = {
  id: null,
  name: "",
};

const newTransfer = {
  id: null,
  playerId: null,
  fromId: null,
  toId: null,
};

module.exports = {
  clubs,
  newClub,
  squads,
  newSquad,
  players,
  newPlayer,
  leagues,
  newLeague,
  transfers,
  newTransfer,
};
