import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  error,
  iconClass,
  options
}) => {
  let selectClass = `select is-fullwidth`;
  if (error && error.length > 0) {
    selectClass += " " + "is-danger";
  }

  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <div
        className={`control is-expanded ${iconClass ? `has-icons-left` : ""}`}
      >
        <div className={selectClass}>
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="form-control"
          >
            <option value="">{defaultOption}</option>
            {options.map(option => {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>
        {iconClass && (
          <div className={`icon is-left ${iconClass}`}>
            <FontAwesomeIcon icon={["fas", iconClass]} />
          </div>
        )}
        {error && <div className="help is-danger">{error}</div>}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  iconClass: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;
