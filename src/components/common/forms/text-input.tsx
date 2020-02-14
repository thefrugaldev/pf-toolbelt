import * as React from "react";
import { FC } from "react";
// Interfaces
import { DefaultInputProps } from "./intefaces/default-input-props";

const TextInput: FC<DefaultInputProps> = props => {
  let inputClass = "input";
  if (props.error && props.error.length > 0) {
    inputClass += " " + "is-danger";
  }

  return (
    <div className="field">
      {props.label && (
        <label className="label" htmlFor={name}>
          {props.label}
        </label>
      )}
      <div className="control is-expanded">
        <input
          type="text"
          name={name}
          className={inputClass}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        {props.error && <p className="help is-danger">{props.error}</p>}
      </div>
    </div>
  );
};

export default TextInput;
