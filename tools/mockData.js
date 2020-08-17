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

module.exports = {
  clubs,
  newClub,
  squads,
  newSquad,
};
