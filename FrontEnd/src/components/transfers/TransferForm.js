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
      <h2 className="title is-2">{transfer.id ? "Edit" : "Add"} Transfer</h2>
      {errors.onSave && (
        <div className="help is-danger" role="alert">
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
          text: player.displayName,
        }))}
        onChange={onChange}
        error={errors.player}
      />

      <SelectInput
        name="toSquadId"
        label="to Team"
        value={transfer.toSquadId || ""}
        defaultOption="Select Team"
        options={squads.map((squad) => ({
          value: squad.id,
          text: `${squad.clubName} ${squad.name}`,
        }))}
        onChange={onChange}
        error={errors.to}
      />

      <button type="submit" disabled={saving} className="button is-primary">
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
