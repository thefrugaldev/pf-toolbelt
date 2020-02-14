import * as React from "react";
import { FC } from "react";
// Interfaces
import { DefaultInputProps } from "./intefaces/default-input-props";

const TextArea: FC<DefaultInputProps> = props => {
  let textAreaClass = "textarea";
  if (props.error && props.error.length > 0) {
    textAreaClass += " " + "is-danger";
  }

  return (
    <div className="field">
      {props.label && (
        <label className="label" htmlFor={name}>
          {props.label}
        </label>
      )}
      <div className="control">
        <textarea
          name={name}
          value={props.value}
          className={textAreaClass}
          placeholder={props.placeholder}
          onChange={props.onChange}
        ></textarea>
        {props.error && <p className="help is-danger">{props.error}</p>}
      </div>
    </div>
  );
};

export default TextArea;
