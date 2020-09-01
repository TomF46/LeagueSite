import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../common/TextInput";
import CheckboxInput from "../../common/CheckboxInput";

const SeasonForm = ({
  season,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2 className="title is-2">{season.id ? "Edit" : "Add"} Season</h2>
      {errors.onSave && (
        <div className="help is-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={season.name}
        onChange={onChange}
        error={errors.name}
      />

      <CheckboxInput
        name="active"
        label="Is current season?"
        value={season.active}
        onChange={onChange}
        error={errors.active}
      />

      <button type="submit" disabled={saving} className="button is-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

SeasonForm.propTypes = {
  season: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default SeasonForm;
