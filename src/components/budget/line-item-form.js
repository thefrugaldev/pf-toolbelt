import React from "react";
import PropTypes from "prop-types";
// Components
import TextInput from "../common/forms/text-input.tsx";
import SelectInput from "../common/forms/select-input.tsx";
import TextArea from "../common/forms/text-area.tsx";
import DateInput from "../common/forms/date-input.tsx";

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
      <DateInput
        name="date"
        label="Date"
        value={lineItem.date}
        onChange={onChange}
        error={errors.date}
      />
      <div className="field level">
        <div className="field-body">
          <SelectInput
            name="category"
            label="Category"
            value={lineItem.category ? lineItem.category._id : ""}
            defaultOption="Select Category"
            options={categories.map(cat => ({
              value: cat._id,
              text: cat.name
            }))}
            onChange={onChange}
            error={errors.category}
          />
          <SelectInput
            name="isSavings"
            label="Type"
            value={lineItem.isSavings}
            defaultOption="Select Entry Type"
            options={[
              {
                value: false,
                text: "Expense"
              },
              {
                value: true,
                text: `Savings`
              }
            ]}
            onChange={onChange}
            error={errors.type}
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
