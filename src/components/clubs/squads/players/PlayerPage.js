import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { newSquad, newClub, newPlayer } from "../../../../../tools/mockData";
import { loadSquads } from "../../../../redux/actions/squadActions";
import { loadClubs } from "../../../../redux/actions/clubActions";
import { loadPlayers } from "../../../../redux/actions/playerActions";
import PropTypes from "prop-types";
import Spinner from "../../../common/Spinner";
import PlayerDetail from "./PlayerDetail";

const PlayerPage = ({
  squads,
  loadSquads,
  history,
  clubs,
  loadClubs,
  players,
  loadPlayers,
  ...props
}) => {
  const [squad, setSquad] = useState({ ...props.squad });
  const [club, setClub] = useState({ ...props.club });
  const [player, setPlayer] = useState({ ...props.player });

  useEffect(() => {
    if (squads.length === 0) {
      loadSquads().catch((err) => {
        alert("Loading clubs failed, " + err);
      });
    } else {
      setSquad({ ...props.squad });
    }
  }, [props.squad]);

  useEffect(() => {
    if (clubs.length === 0) {
      loadClubs().catch((err) => {
        alert("Loading clubs failed, " + err);
      });
    } else {
      console.log(props.club);
      setClub({ ...props.club });
    }
  }, [props.club]);

  useEffect(() => {
    if (players.length === 0) {
      loadPlayers().catch((err) => {
        alert("Loading players failed, " + err);
      });
    } else {
      setPlayer({ ...props.player });
    }
  }, [props.player]);

  return players.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <>
        <h1>{squad.name}</h1>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-club"
          onClick={() =>
            history.push(
              `/club/${club.id}/squad/${squad.id}/player/${player.id}/edit`
            )
          }
        >
          Edit {`${player.firstName} ${player.lastName}W`}
        </button>
        <PlayerDetail player={player} squad={squad} club={club} />
      </>
    </>
  );
};

PlayerPage.propTypes = {
  squad: PropTypes.object.isRequired,
  club: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  squads: PropTypes.array.isRequired,
  loadSquads: PropTypes.func.isRequired,
  clubs: PropTypes.array.isRequired,
  loadClubs: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  loadPlayers: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const getSquadById = (squads, id) => {
  return squads.find((storedSquad) => storedSquad.id == id) || null;
};

const getClubById = (clubs, id) => {
  return clubs.find((club) => club.id == id) || null;
};

const getPlayerById = (players, id) => {
  return players.find((player) => player.id == id) || null;
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.playerId;
  const player =
    id && state.players.length > 0
      ? getPlayerById(state.players, id)
      : newPlayer;
  const squadId = ownProps.match.params.squadId;
  const squad =
    state.squads.length > 0 ? getSquadById(state.squads, squadId) : newSquad;
  const clubId = ownProps.match.params.clubId;
  const club =
    state.clubs.length > 0 ? getClubById(state.clubs, clubId) : newClub;
  return {
    club,
    squad,
    player,
    squads: state.squads,
    clubs: state.clubs,
    players: state.players,
  };
};

const mapDispatchToProps = {
  loadSquads,
  loadClubs,
  loadPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
