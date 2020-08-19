/*
This uses json-server, but with the module approach: https://github.com/typicode/json-server#module
Downside: You can't pass the json-server command line options.
Instead, can override some defaults by passing a config object to jsonServer.defaults();
You have to check the source code to set some items.
Examples:
Validation/Customization: https://github.com/typicode/json-server/issues/266
Delay: https://github.com/typicode/json-server/issues/534
ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
*/

/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const db = require("./db.json");

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults({
  // Display json-server's built in homepage when json-server starts.
  static: "node_modules/json-server/dist",
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function (req, res, next) {
  setTimeout(next, 0);
});

// Declaring custom routes below. Add custom routes before JSON Server router

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.get("/squads/", (req, res) => {
  let results = res.map((squad) => {
    squad.clubName =
      db.clubs.find((club) => club.id == squad.clubId).name || null;
    return squad;
  });
  if (results) {
    res.status(200).jsonp(results);
  } else {
    res.status(400);
  }
});

server.get("/players/", (req, res) => {
  let results = res.map((player) => {
    player.clubName =
      db.clubs.find((club) => club.id == player.clubId).name || null;
    player.squadName =
      db.squads.find((squad) => squad.id == player.squadId).name || null;
    return player;
  });
  if (results) {
    res.status(200).jsonp(results);
  } else {
    res.status(400);
  }
});

server.get("/transfers/", (req, res) => {
  console.log(db);
  debugger;
  let results = db.transfers.map((transfer) => {
    let player = db.players.find((player) => player.id == transfer.playerId);
    transfer.playerName = `${player.firstName} ${player.lastName}`;
    let from = db.squads.find((squad) => squad.id == transfer.fromId);
    let fromSquadName = from.name;
    let fromClubName =
      db.clubs.find((club) => club.id == from.clubId).name || null;
    transfer.fromTeamName = `${fromClubName} ${fromSquadName}`;
    let to = db.squads.find((squad) => squad.id == transfer.toId);
    let toSquadName = to.name;
    let toClubName = db.clubs.find((club) => club.id == to.clubId).name || null;
    transfer.toTeamName = `${toClubName} ${toSquadName}`;

    return transfer;
  });
  if (results) {
    res.status(200).jsonp(results);
  } else {
    res.status(400);
  }
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Centralized logic

//https://spin.atomicobject.com/2018/10/08/mock-api-json-server/    information for extending the basic routes
