const clubs = [
  { id: 1, name: "Bromsgrove Hockey Club", location: "Bromsgrove" },
  { id: 2, name: "Droitwich Hockey Club", location: "Droitwich" },
  { id: 3, name: "Redditch Hockey Club", location: "Redditch" },
];

const squads = [
  { id: 1, clubId: 1, name: "Mens seconds" },
  { id: 2, clubId: 1, name: "Mens firsts" },
  { id: 3, clubId: 2, name: "Mens firsts" },
  { id: 4, clubId: 3, name: "Mens firsts" },
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

const newClub = {
  id: null,
  name: "",
  location: "",
};

const newSquad = {
  id: null,
  clubId: null,
  name: "",
};

const newPlayer = {
  id: null,
  firstName: "",
  lastName: "",
  position: "",
  squadId: null,
  clubId: null,
};

module.exports = {
  clubs,
  newClub,
  squads,
  newSquad,
  players,
  newPlayer,
};
