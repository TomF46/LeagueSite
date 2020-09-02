import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../../common/TextInput";

const PlayerForm = ({
  player,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form className="box" onSubmit={onSave}>
      <h2 className="title is-2">{player.id ? "Edit" : "Add"} Player</h2>
      {errors.onSave && (
        <div className="help is-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="firstName"
        label="First Name"
        value={player.firstName}
        onChange={onChange}
        error={errors.firstName}
      />

      <TextInput
        name="lastName"
        label="Last Name"
        value={player.lastName}
        onChange={onChange}
        error={errors.lastName}
      />

      <TextInput
        name="position"
        label="Position"
        value={player.position}
        onChange={onChange}
        error={errors.position}
      />

      <button type="submit" disabled={saving} className="button is-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

PlayerForm.propTypes = {
  player: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default PlayerForm;
