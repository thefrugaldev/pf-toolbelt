import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
// Components
import TextInput from "../common/text-input";
import SelectInput from "../common/select-input";
// Utils
import { monthNames } from "../../utils/datetime-helpers";
import TextArea from "../common/text-area";

const LineItemForm = ({
  lineItem,
  categories,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  const [budgetYears, setBudgetYears] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const budgetTypes = ["Expense", "Saving"];
  const [selectedDate, setSelectedDate] = useState({
    month: lineItem.month,
    day: lineItem.day,
    year: lineItem.year
  });

  useLayoutEffect(() => {
    let currentYear = new Date().getFullYear();
    let allyears = [];
    for (let i = currentYear; i >= currentYear - 10; i--) {
      allyears.push(i);
    }

    setBudgetYears(allyears);
  }, []);

  useEffect(() => {
    getDaysInMonth(selectedDate.month, selectedDate.year);
  }, [selectedDate.month]);

  const onDateChange = event => {
    const { name, value } = event.target;

    setSelectedDate({
      ...selectedDate,
      [name]: value
    });

    onChange(event);
  };

  const getDaysInMonth = (month, year) => {
    const numberOfDays = new Date(year, month, 0).getDate();
    let arrayOfDays = [];
    for (let i = 1; i <= numberOfDays; i++) {
      arrayOfDays.push(i);
    }

    setDaysInMonth(arrayOfDays);
  };

  return (
    <form onSubmit={onSave}>
      <h2 className="title">{lineItem._id ? "Edit" : "Add"} Budget</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="title"
        label="Title"
        value={lineItem.title}
        onChange={onChange}
        error={errors.title}
      />
      <TextInput
        name="amount"
        label="Amount"
        value={lineItem.amount}
        onChange={onChange}
        error={errors.amount}
      />
      <div className="field">
        <label className="label">Date</label>
        <div className="field-body">
          <SelectInput
            name="month"
            value={selectedDate.month}
            defaultOption="Select Month"
            options={monthNames.map((month, index) => ({
              value: index + 1,
              text: month
            }))}
            onChange={onDateChange}
          />
          <SelectInput
            name="day"
            value={selectedDate.day}
            defaultOption="Select Day"
            options={daysInMonth.map(day => ({
              value: day,
              text: day
            }))}
            onChange={onDateChange}
          />
          <SelectInput
            name="year"
            value={selectedDate.year}
            defaultOption="Select Year"
            options={budgetYears.map(year => ({
              value: year,
              text: year
            }))}
            onChange={onDateChange}
          />
        </div>
      </div>
      <div className="field level">
        <div className="field-body">
          <SelectInput
            name="type"
            label="Budget Type"
            value={lineItem.type || ""}
            defaultOption="Select Budget Type"
            options={budgetTypes.map(type => ({
              value: type,
              text: type
            }))}
            onChange={onChange}
            error={errors.budgetType}
          />
          <SelectInput
            name="categoryId"
            label="Expense Category"
            value={lineItem.categoryId || ""}
            defaultOption="Select Category"
            options={categories.map(cat => ({
              value: cat._id,
              text: cat.name
            }))}
            onChange={onChange}
            error={errors.category}
          />
        </div>
      </div>
      <TextArea
        name="description"
        label="Description"
        value={lineItem.description}
        onChange={onChange}
        error={errors.description}
      />
      <div className="control">
        <button type="submit" disabled={saving} className="button is-primary">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

LineItemForm.propTypes = {
  lineItem: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default LineItemForm;
