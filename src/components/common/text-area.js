import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ name, label, onChange, placeholder, value, error }) => {
  let textAreaClass = "textarea";
  if (error && error.length > 0) {
    textAreaClass += " " + "is-danger";
  }

  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="control">
        <textarea
          name={name}
          value={value}
          className={textAreaClass}
          placeholder={placeholder}
          onChange={onChange}
        ></textarea>
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextArea;
