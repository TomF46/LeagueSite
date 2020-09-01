import React from "react";
import PropTypes from "prop-types";

const CheckboxInput = ({ name, label, onChange, value, error }) => {
  return (
    <div className="field">
      <div className="control">
        <label className="checkbox" htmlFor={name}>
          <input
            type="checkbox"
            name={name}
            value={value}
            onChange={onChange}
          />
          {label}
        </label>
      </div>
      {error && <div className="help is-danger">{error}</div>}
    </div>
  );
};

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default CheckboxInput;
