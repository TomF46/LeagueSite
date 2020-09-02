import React from "react";
import PropTypes from "prop-types";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  error,
  options,
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <div className="control">
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        <div className="select">
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="select"
          >
            <option value="">{defaultOption}</option>
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>
        {error && <div className="help is-danger">{error}</div>}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default SelectInput;
