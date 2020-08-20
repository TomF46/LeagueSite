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
  fromSquadId: null,
  toSquadId: null,
};

module.exports = {
  newClub,
  newSquad,
  newPlayer,
  newLeague,
  newTransfer,
};
