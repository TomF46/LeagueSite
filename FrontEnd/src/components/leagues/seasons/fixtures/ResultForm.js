import React from "react";
import PropTypes from "prop-types";
import NumberInput from "../../../common/NumberInput";

const ResultForm = ({
  result,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>Add Result</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <NumberInput
        name="homeScore"
        label="Home score"
        value={result.homeScore}
        onChange={onChange}
        error={errors.name}
      />

      <NumberInput
        name="awayScore"
        label="Away score"
        value={result.awayScore}
        onChange={onChange}
        error={errors.name}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

ResultForm.propTypes = {
  result: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ResultForm;
