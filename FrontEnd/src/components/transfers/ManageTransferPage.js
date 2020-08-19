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

const TransferPage = ({
  players,
  squads,
  loadPlayers,
  loadSquads,
  saveTransfer,
  loading,
  history,
}) => {
  const [transfer, setTransfer] = useState({ ...newTransfer });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (players.length === 0) {
      loadPlayers().catch((error) => {
        alert("Loading players failed " + error);
      });
    }
  }, [players]);

  useEffect(() => {
    if (squads.length === 0) {
      loadSquads().catch((error) => {
        alert("Loading squads failed " + error);
      });
    }
  }, [squads]);

  function handleChange(event) {
    const { name, value } = event.target;
    setTransfer((prevTransfer) => ({
      ...prevTransfer,
      [name]: parseInt(value, 10),
    }));
  }

  function formIsValid() {
    const { playerId, toId } = transfer;
    const errors = {};
    if (!playerId) errors.player = "Player name is required";
    if (!toId) errors.to = "Destination team is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    let player = players.find((player) => player.id == transfer.playerId);

    let playerCurrentSquad = squads.find((squad) => squad.id == player.squadId);
    transfer.fromId = playerCurrentSquad.id;
    setSaving(true);
    saveTransfer(transfer)
      .then(() => {
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
      <h2>Transfers</h2>
      {loading ? (
        <Spinner />
      ) : (
        <TransferForm
          transfer={transfer}
          players={players}
          squads={squads}
          errors={errors}
          onChange={handleChange}
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
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    squads: state.squads,
    players: state.players,
    loading: state.apiCallsInProgrss > 0,
  };
};

const mapDispatchToProps = {
  loadSquads,
  loadPlayers,
  saveTransfer,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferPage);
