import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { newSquad } from "../../../../tools/mockData";
import { loadSquads } from "../../../redux/actions/squadActions";
import {
  loadPlayers,
  deletePlayer,
} from "../../../redux/actions/playerActions";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import SquadDetail from "./SquadDetail";
import PlayerList from "./players/PlayerList";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const SquadPage = ({
  squads,
  loadSquads,
  clubId,
  history,
  squadPlayers,
  players,
  loadPlayers,
  deletePlayer,
  ...props
}) => {
  const [squad, setSquad] = useState({ ...props.squad });

  useEffect(() => {
    if (squads.length === 0) {
      loadSquads().catch((err) => {
        alert("Loading squads failed, " + err);
      });
    } else {
      setSquad({ ...props.squad });
    }
  }, [props.squad]);

  useEffect(() => {
    if (players.length === 0) {
      loadPlayers().catch((err) => {
        alert("Loading clubs failed, " + err);
      });
    }
  }, [props.players]);

  const handlePlayerDelete = (player) => {
    confirmAlert({
      title: "Confirm deletion",
      message: `Are you sure you want to delete ${player.firstName} ${player.lastName}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deletePlayerOpto(player),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deletePlayerOpto = async (player) => {
    toast.success("Squad deleted");
    try {
      await deletePlayer(player);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return squads.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <>
        <h1>{squad.name}</h1>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-club"
          onClick={() => history.push(`/club/${clubId}/squad/${squad.id}/edit`)}
        >
          Edit {squad.name}
        </button>
        <SquadDetail squad={squad} />

        {squads.length > 0 && (
          <PlayerList
            players={squadPlayers}
            onDeleteClick={handlePlayerDelete}
          />
        )}
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-club"
          onClick={() =>
            history.push(`/club/${clubId}/squad/${squad.id}/player`)
          }
        >
          Add Player
        </button>
      </>
    </>
  );
};

SquadPage.propTypes = {
  squad: PropTypes.object.isRequired,
  clubId: PropTypes.any.isRequired,
  squads: PropTypes.array.isRequired,
  loadSquads: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  loadPlayers: PropTypes.func.isRequired,
  squadPlayers: PropTypes.array.isRequired,
  deletePlayer: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const getSquadById = (squads, id) => {
  return squads.find((storedSquad) => storedSquad.id == id) || null;
};

const getSquadPlayers = (players, squad) => {
  return players.filter((storedPlayer) => storedPlayer.squadId == squad.id);
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.squadId;
  const squad =
    id && state.squads.length > 0 ? getSquadById(state.squads, id) : newSquad;
  const clubId = ownProps.match.params.clubId;
  const squadPlayers = squad.id ? getSquadPlayers(state.players, squad) : [];
  return {
    clubId,
    squad,
    squadPlayers,
    squads: state.squads,
    players: state.players,
  };
};

const mapDispatchToProps = {
  loadSquads,
  loadPlayers,
  deletePlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(SquadPage);