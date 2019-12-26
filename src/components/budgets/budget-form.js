import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Components
import TextInput from "../common/text-input";
import SelectInput from "../common/select-input";

const BudgetForm = ({
  budget,
  users,
  categories,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  const [budgetYears, setBudgetYears] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    month: budget.month,
    day: budget.day,
    year: budget.year
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

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

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
      <h2>{budget.id ? "Edit" : "Add"} Budget</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="title"
        label="Title"
        value={budget.title}
        onChange={onChange}
        error={errors.title}
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

      <SelectInput
        name="userId"
        label="User"
        value={budget.userId || ""}
        defaultOption="Select User"
        options={users.map(user => ({
          value: user.id,
          text: user.name
        }))}
        onChange={onChange}
        error={errors.user}
      />
      <div className="level">
        <div className="level-left">
          <SelectInput
            name="categoryId"
            label="Category"
            value={budget.categoryId || ""}
            defaultOption="Select Category"
            options={categories.map(cat => ({
              value: cat.id,
              text: cat.name
            }))}
            onChange={onChange}
            error={errors.category}
          />
        </div>
        <Link to="/categories" className="button is-link is-light level-right">
          Create new Category
        </Link>
      </div>
      <div className="control">
        <button type="submit" disabled={saving} className="button is-primary">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

BudgetForm.propTypes = {
  users: PropTypes.array.isRequired,
  budget: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default BudgetForm;
