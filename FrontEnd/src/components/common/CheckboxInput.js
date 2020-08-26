import React from "react";
import PropTypes from "prop-types";

const CheckboxInput = ({ name, label, onChange, value, error }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className={wrapperClass}>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name={name}
          value={value}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor={name}>
          {label}
        </label>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
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
