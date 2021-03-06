import React from "react";
import PropTypes from "prop-types";

const PlayerSelect = ({
  name,
  label,
  side,
  onChange,
  index,
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
      <div className="control has-icons-left is-expanded">
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        <div className="select">
          <select
            name={name}
            value={value}
            side={side}
            index={index}
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
        <div className="icon is-left">
          <ion-icon name="person-outline"></ion-icon>
        </div>
        {error && <div className="help is-danger">{error}</div>}
      </div>
    </div>
  );
};

PlayerSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  side: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default PlayerSelect;
