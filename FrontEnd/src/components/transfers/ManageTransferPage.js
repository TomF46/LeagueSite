import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadPlayers } from "../../redux/actions/playerActions";
import { loadSquads } from "../../redux/actions/squadActions";
import { saveTransfer } from "../../redux/actions/transferActions";

import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import TransferForm from "./TransferForm";
import { newTransfer } from "../../../tools/mockData";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const TransferPage = ({
  players,
  squads,
  loadPlayers,
  loadSquads,
  saveTransfer,
  loading,
  userIsAuthenticated,
  history,
}) => {
  const [transfer, setTransfer] = useState({ ...newTransfer });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [currentSquadPlayers, setCurrentSquadPlayers] = useState([]);
  const [selectedSquad, setSelectedSquad] = useState({});

  useEffect(() => {
    if (players.length === 0) {
      loadPlayers().catch((error) => {
        toast.error("Loading players failed, " + error.message, {
          autoClose: false,
        });
      });
    }
  }, [players]);

  useEffect(() => {
    if (squads.length === 0) {
      loadSquads().catch((error) => {
        toast.error("Loading squads failed, " + error.message, {
          autoClose: false,
        });
      });
    }
  }, [squads]);

  function handleSelectedSquad(event) {
    const { name, value } = event.target;
    setSelectedSquad((prevSelectedSquad) => ({
      ...prevSelectedSquad,
      [name]: parseInt(value, 10),
    }));
    setCurrentSquadPlayers(getPlayersForSquad(value));
  }

  function getPlayersForSquad(squadId) {
    return players.filter((storedPlayer) => storedPlayer.squadId == squadId);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setTransfer((prevTransfer) => ({
      ...prevTransfer,
      [name]: parseInt(value, 10),
    }));
  }

  function formIsValid() {
    const { playerId, toSquadId } = transfer;
    const errors = {};
    if (!selectedSquad.id) errors.fromTeam = "From team is required";
    if (!playerId) errors.player = "Player name is required";
    if (!toSquadId) errors.to = "Destination team is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    let player = players.find((player) => player.id == transfer.playerId);

    let playerCurrentSquad = squads.find((squad) => squad.id == player.squadId);
    transfer.fromSquadId = playerCurrentSquad.id;
    setSaving(true);
    saveTransfer(transfer)
      .then(() => {
        loadPlayers().catch((error) => {
          toast.error("Loading players failed, " + error.message, {
            autoClose: false,
          });
        });
        toast.success("Transfer complete.");
        history.push("/transfers");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <>
      {!userIsAuthenticated && <Redirect to="/" />}
      {loading ? (
        <Spinner />
      ) : (
        <TransferForm
          transfer={transfer}
          players={currentSquadPlayers}
          squads={squads}
          selectedSquad={selectedSquad}
          errors={errors}
          onChange={handleChange}
          onChangeSelectedSquad={handleSelectedSquad}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </>
  );
};

TransferPage.propTypes = {
  squads: PropTypes.array.isRequired,
  loadSquads: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  loadPlayers: PropTypes.func.isRequired,
  saveTransfer: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    squads: state.squads,
    players: state.players,
    loading: state.apiCallsInProgress > 0,
    userIsAuthenticated: state.user != null,
  };
};

const mapDispatchToProps = {
  loadSquads,
  loadPlayers,
  saveTransfer,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferPage);
