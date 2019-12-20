import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextInput from "../common/text-input";
import SelectInput from "../common/select-input";

const BudgetForm = ({
  budget,
  users,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
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

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  const [budgetYears, setBudgetYears] = useState([]);

  useEffect(() => {
    let currentYear = new Date().getFullYear();
    let allyears = [];
    for (let i = currentYear; i >= currentYear - 10; i--) {
      allyears.push(i);
    }

    setBudgetYears(allyears);
  }, []);

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
      <SelectInput
        name="year"
        label="Year"
        value=""
        defaultOptions="Select Year"
        options={budgetYears.map(year => ({
          value: year,
          text: year
        }))}
        onChange={onChange}
      />
      <SelectInput
        name="month"
        label="Month"
        value=""
        defaultOptions="Select Month"
        options={monthNames.map((month, index) => ({
          value: index,
          text: month
        }))}
        onChange={onChange}
      />
      <SelectInput
        name="userId"
        label="User"
        value={budget.userId || ""}
        defaultOptions="Select User"
        options={users.map(user => ({
          value: user.id,
          text: user.name
        }))}
        onChange={onChange}
        error={errors.user}
      />
      <TextInput
        name="category"
        label="Category"
        value={budget.category}
        onChange={onChange}
        error={errors.category}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

BudgetForm.propTypes = {
  users: PropTypes.array.isRequired,
  budget: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default BudgetForm;
