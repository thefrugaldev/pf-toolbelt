import React from "react";
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
