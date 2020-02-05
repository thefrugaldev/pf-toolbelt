import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
//Redux
import { connect } from "react-redux";
import { loadBudgets, saveBudget } from "../../redux/actions/budget-actions";
import { loadCategories } from "../../redux/actions/category-actions";
//Components
import LineItemForm from "./line-item-form";
import { newBudget } from "../../../tools/mock-budgets";
import Spinner from "../common/spinner";

const ManageLineItemPage = ({
  budgets,
  categories,
  loadBudgets,
  loadCategories,
  saveBudget,
  history,
  ...props
}) => {
  const [lineItem, setLineItem] = useState({ ...props.budget });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (budgets.length === 0) {
      loadBudgets().catch(error => {
        alert(`Loading budgets failed ${error}`);
      });
    } else {
      setLineItem({ ...props.budget });
    }
    loadCategories().catch(error => {
      alert(`Loading categories failed ${error}`);
    });
  }, [props.budget]);

  const handleChange = event => {
    const { name, value } = event.target;
    setLineItem(prevLineItem => ({
      ...prevLineItem,
      [name]: value
    }));
  };

  const formIsValid = () => {
    const { title, amount } = lineItem;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!amount) errors.amount = "Amount is required";
    // if (!categoryId) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };

  const handleSave = event => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveBudget(lineItem)
      .then(() => {
        toast.success("Budget Saved.");
        history.push("/budgets");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  return budgets.length === 0 ? (
    <Spinner />
  ) : (
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
  budget: PropTypes.object.isRequired,
  budgets: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  loadBudgets: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  saveBudget: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getLineItemById(lineItems, id) {
  return lineItems.find(lineItem => lineItem._id === id) || null;
}

const mapStateToProps = ({ budgets, categories }, ownProps) => {
  const id = ownProps.match.params.id;
  const lineItem =
    id && budgets.length > 0 ? getLineItemById(budgets, id) : newBudget;

  return {
    lineItem,
    budgets,
    categories
  };
};

const mapDispatchToProps = {
  saveBudget,
  loadBudgets,
  loadCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLineItemPage);
