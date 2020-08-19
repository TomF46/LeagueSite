import React from "react";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";

const TransferForm = ({
  transfer,
  players,
  squads,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{transfer.id ? "Edit" : "Add"} Transfer</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      <SelectInput
        name="playerId"
        label="Player"
        value={transfer.playerId || ""}
        defaultOption="Select Player"
        options={players.map((player) => ({
          value: player.id,
          text: `${player.firstName} ${player.lastName}`,
        }))}
        onChange={onChange}
        error={errors.player}
      />

      <SelectInput
        name="toId"
        label="to Team"
        value={transfer.toId || ""}
        defaultOption="Select Team"
        options={squads.map((squad) => ({
          value: squad.id,
          text: `${squad.clubName} ${squad.name}`,
        }))}
        onChange={onChange}
        error={errors.to}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

TransferForm.propTypes = {
  transfer: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  squads: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default TransferForm;