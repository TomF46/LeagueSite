import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const ClubForm = ({ club, onSave, onChange, saving = false, errors = {} }) => {
  return (
    <form onSubmit={onSave}>
      <h2>{club.id ? "Edit" : "Add"} Club</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={club.name}
        onChange={onChange}
        error={errors.category}
      />

      <TextInput
        name="location"
        label="Location"
        value={club.location}
        onChange={onChange}
        error={errors.category}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
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
