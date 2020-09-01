import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../common/TextInput";

const SquadForm = ({
  squad,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2 className="title is-2">{squad.id ? "Edit" : "Add"} Squad</h2>
      {errors.onSave && (
        <div className="help is-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={squad.name}
        onChange={onChange}
        error={errors.name}
      />

      <button type="submit" disabled={saving} className="button is-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

SquadForm.propTypes = {
  squad: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default SquadForm;
