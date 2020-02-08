import React from "react";
import PropTypes from "prop-types";
// Utils
import { getInputFormattedDate } from "../../../utils/datetime-helpers";

const DateInput = ({ name, label, onChange, placeholder, value, error }) => {
  let inputClass = "input";
  if (error && error.length > 0) {
    inputClass += " " + "is-danger";
  }

  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="control">
        <input
          type="date"
          name={name}
          className={inputClass}
          placeholder={placeholder}
          value={getInputFormattedDate(value)}
          onChange={onChange}
        />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default DateInput;
