import * as React from "react";
import { FC } from "react";
// Interfaces
import { SelectInputProps } from "./intefaces/select-input-props";
import { DefaultInputProps } from "./intefaces/default-input-props";

const SelectInput: FC<DefaultInputProps & SelectInputProps> = props => {
  let selectClass = `select is-fullwidth`;
  if (props.error && props.error.length > 0) {
    selectClass += " " + "is-danger";
  }

  return (
    <div className="field">
      {props.label && (
        <label className="label" htmlFor={name}>
          {props.label}
        </label>
      )}
      <div className="control is-expanded">
        <div className={selectClass}>
          <select
            name={name}
            value={props.value}
            onChange={props.onChange}
            className="form-control"
          >
            <option value="">{props.defaultOption}</option>
            {props.options.map(option => {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>
        {props.error && <div className="help is-danger">{props.error}</div>}
      </div>
    </div>
  );
};

export default SelectInput;
