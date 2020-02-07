import React from "react";
import PropTypes from "prop-types";
// Components
import TextInput from "../common/text-input";
import SelectInput from "../common/select-input";
// Utils
import TextArea from "../common/text-area";

const LineItemForm = ({
  lineItem,
  categories,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
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
        <div className="control">
          <input
            className="input"
            name="date"
            onChange={onChange}
            type="date"
          />
        </div>
      </div>
      <div className="field level">
        <div className="field-body">
          <SelectInput
            name="categoryName"
            label="Expense Category"
            value={lineItem.categoryName || ""}
            defaultOption="Select Category"
            options={categories.map(cat => ({
              value: cat.name,
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
