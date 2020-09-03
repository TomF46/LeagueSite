import React from "react";
import PropTypes from "prop-types";

const PasswordInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
}) => {
  let wrapperClass = "input";
  if (error && error.length > 0) {
    wrapperClass += " " + "is-danger";
  }

  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <div className="control">
        <input
          type="password"
          name={name}
          className={wrapperClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="help is-danger">{error}</div>}
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default PasswordInput;
