import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadPlayers,
  savePlayer,
} from "../../../../redux/actions/playerActions";
import { newPlayer } from "../../../../../tools/mockData";
import PropTypes from "prop-types";
import Spinner from "../../../common/Spinner";
import PlayerForm from "./PlayerForm";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const ManagePlayerPage = ({
  players,
  clubId,
  squadId,
  loadPlayers,
  savePlayer,
  userIsAuthenticated,
  history,
  ...props
}) => {
  const [player, setPlayer] = useState({ ...props.player });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (players.length === 0) {
      loadPlayers().catch((err) => {
        alert("Loading Players failed, " + err);
      });
    } else {
      setPlayer({ ...props.player });
    }
  }, [props.player]);

  function handleChange(event) {
    const { name, value } = event.target;
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { firstName, lastName, position } = player;
    const errors = {};
    if (!firstName) errors.firstName = "First Name is required";
    if (!lastName) errors.firstName = "Last Name is required";
    if (!position) errors.firstName = "Position is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    if (!player.clubId) player.clubId = parseInt(clubId, 10);
    if (!player.squadId) player.squadId = parseInt(squadId, 10);
    savePlayer(player)
      .then(() => {
        toast.success("Player saved");
        if (player.id) {
          history.push(`/club/${clubId}/squad/${squadId}/player/${player.id}`);
        } else {
          history.push(`/club/${clubId}/squad/${squadId}`);
        }
      })
      .catch((err) => {
        setSaving(false);
        setErrors({ onSave: err.message });
      });
  }

  return (
    <>
      {!userIsAuthenticated && <Redirect to="/" />}
      {players.length === 0 ? (
        <Spinner />
      ) : (
        <PlayerForm
          player={player}
          errors={errors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </>
  );
};

ManagePlayerPage.propTypes = {
  player: PropTypes.object.isRequired,
  clubId: PropTypes.any.isRequired,
  squadId: PropTypes.any.isRequired,
  players: PropTypes.array.isRequired,
  loadPlayers: PropTypes.func.isRequired,
  savePlayer: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const getPlayerById = (players, id) => {
  return players.find((storedPlayer) => storedPlayer.id == id) || null;
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.playerId;
  const player =
    id && state.players.length > 0
      ? getPlayerById(state.players, id)
      : newPlayer;
  const clubId = ownProps.match.params.clubId;
  const squadId = ownProps.match.params.squadId;

  return {
    clubId,
    squadId,
    player,
    players: state.players,
    userIsAuthenticated: state.user != null,
  };
};

const mapDispatchToProps = {
  loadPlayers,
  savePlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePlayerPage);
