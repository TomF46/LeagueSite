import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const ClubForm = ({ club, onSave, onChange, saving = false, errors = {} }) => {
  return (
    <form className="box" onSubmit={onSave}>
      <h2 className="title is-2">{club.id ? "Edit" : "Add"} Club</h2>
      {errors.onSave && (
        <div className="help is-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={club.name}
        onChange={onChange}
        error={errors.name}
      />

      <TextInput
        name="location"
        label="Location"
        value={club.location}
        onChange={onChange}
        error={errors.location}
      />

      <button type="submit" disabled={saving} className="button is-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

ClubForm.propTypes = {
  club: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ClubForm;
