import React, { useEffect } from "react";
import PropTypes from "prop-types";
import bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar.min";
import "bulma-calendar/dist/css/bulma-calendar.min.css";

const DateInput = ({ name, label, onChange, placeholder, value, error }) => {
  useEffect(() => {
    // Initialize all input of date type.
    const calendars = bulmaCalendar.attach('[type="date"]', {
      startDate: new Date(value)
    });

    // Loop on each calendar initialized
    // calendars.forEach(calendar => {
    //   // Add listener to date:selected event
    //   calendar.on("date:selected", date => {
    //     console.log(date);
    //   });
    // });

    // To access to bulmaCalendar instance of an element
    // eslint-disable-next-line no-undef
    // const element = document.querySelector("#datepicker");
    // if (element) {
    //   // bulmaCalendar instance is available as element.bulmaCalendar
    //   element.bulmaCalendar.on("select", datepicker => {
    //     console.log(datepicker.data.value());
    //   });
    // }
  }, []);

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
          id="datepicker"
          placeholder={placeholder}
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
