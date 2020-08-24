import React from "react";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";

const AddTeamForm = ({
  leagueAddition,
  squads,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>Add team to league</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      <SelectInput
        name="squadId"
        label="Team to add"
        value={leagueAddition.squadId || ""}
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

AddTeamForm.propTypes = {
  leagueAddition: PropTypes.any.isRequired,
  squads: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default AddTeamForm;