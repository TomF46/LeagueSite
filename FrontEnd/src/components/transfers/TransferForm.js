import React from "react";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";
import PlayerSelect from "../common/PlayerSelect";

const TransferForm = ({
  transfer,
  players,
  squads,
  selectedSquad,
  onSave,
  onChange,
  onChangeSelectedSquad,
  saving = false,
  errors = {},
}) => {
  return (
    <form id="transfer-form" className="box" onSubmit={onSave}>
      <h2 className="title is-2">{transfer.id ? "Edit" : "Add"} Transfer</h2>
      {errors.onSave && (
        <div className="help is-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <div className="columns">
        <div className="column is-4">
          <SelectInput
            name="id"
            label="From team"
            value={selectedSquad.id || ""}
            defaultOption="Select Team"
            options={squads.map((squad) => ({
              value: squad.id,
              text: `${squad.clubName} ${squad.name}`,
            }))}
            onChange={onChangeSelectedSquad}
            error={errors.fromTeam}
          />
          <br></br>
          <PlayerSelect
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
        </div>
        <div className="column is-4">
          <SelectInput
            name="toSquadId"
            label="To team"
            value={transfer.toSquadId || ""}
            defaultOption="Select Team"
            options={squads.map((squad) => ({
              value: squad.id,
              text: `${squad.clubName} ${squad.name}`,
            }))}
            onChange={onChange}
            error={errors.to}
          />
        </div>
      </div>

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
  selectedSquad: PropTypes.object,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeSelectedSquad: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default TransferForm;
