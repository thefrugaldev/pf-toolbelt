import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import {
  saveLineItem,
  loadLineItems
} from "../../redux/actions/line-item-actions";
import { loadCategories } from "../../redux/actions/category-actions";
//Components
import LineItemForm from "./line-item-form";
import { newLineItem } from "../../../tools/mock-budget";
import { toast } from "react-toastify";

const ManageLineItemPage = ({
  lineItems,
  categories,
  saveLineItem,
  loadLineItems,
  loadCategories,
  ...props
}) => {
  const [lineItem, setLineItem] = useState({ ...props.lineItem });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (lineItems.length === 0) {
      loadLineItems().catch(error => {
        alert(`Loading line items failed ${error}`);
      });
    } else {
      setLineItem({ ...props.lineItem });
    }
    loadCategories().catch(error => {
      alert(`Loading categories failed ${error}`);
    });
  }, [props.lineItem]);

  const handleChange = event => {
    const { name, value } = event.target;
    setLineItem(prevLineItem => ({
      ...prevLineItem,
      [name]: value
    }));
    console.log(lineItem);
  };

  const formIsValid = () => {
    const { title, amount, date } = lineItem;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!amount) errors.amount = "Amount is required";
    if (!date) errors.date = "Please select a date";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };

  const handleSave = event => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveLineItem(lineItem)
      .then(() => {
        toast.success("Budget Saved.");
        history.push("/budget");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  return (
    <LineItemForm
      lineItem={lineItem}
      errors={errors}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageLineItemPage.propTypes = {
  lineItem: PropTypes.object.isRequired,
  lineItems: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  saveLineItem: PropTypes.func.isRequired,
  loadLineItems: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired
};

export function getLineItemById(lineItems, id) {
  return lineItems.find(lineItem => lineItem._id === id) || null;
}

const mapStateToProps = ({ lineItems, categories }, ownProps) => {
  const id = ownProps.match.params.id;
  const lineItem =
    id && lineItems.length > 0 ? getLineItemById(lineItems, id) : newLineItem;

  return {
    lineItem,
    lineItems,
    categories
  };
};

const mapDispatchToProps = {
  saveLineItem,
  loadLineItems,
  loadCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLineItemPage);
