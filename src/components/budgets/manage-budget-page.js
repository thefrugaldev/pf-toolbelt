import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
//Redux
import { connect } from "react-redux";
import { loadBudgets, saveBudget } from "../../redux/actions/budget-actions";
import { loadCategories } from "../../redux/actions/category-actions";
//Components
import BudgetForm from "./budget-form";
import { newBudget } from "../../../tools/mock-budgets";
import Spinner from "../common/spinner";

const ManageBudgetPage = ({
  budgets,
  categories,
  loadBudgets,
  loadCategories,
  saveBudget,
  history,
  ...props
}) => {
  const [budget, setBudget] = useState({ ...props.budget });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (budgets.length === 0) {
      loadBudgets().catch(error => {
        alert(`Loading budgets failed ${error}`);
      });
    } else {
      setBudget({ ...props.budget });
    }
    loadCategories().catch(error => {
      alert(`Loading categories failed ${error}`);
    });
  }, [props.budget]);

  const handleChange = event => {
    const { name, value } = event.target;
    setBudget(prevBudget => ({
      ...prevBudget,
      [name]: name.toLowerCase().includes("id") ? parseInt(value, 10) : value
    }));
  };

  const formIsValid = () => {
    const { title, categoryId } = budget;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!categoryId) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };

  const handleSave = event => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveBudget(budget)
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
    <BudgetForm
      budget={budget}
      errors={errors}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageBudgetPage.propTypes = {
  budget: PropTypes.object.isRequired,
  budgets: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  loadBudgets: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  saveBudget: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getBudgetById(budgets, id) {
  return budgets.find(budget => budget._id === parseInt(id)) || null;
}

const mapStateToProps = ({ budgets, categories }, ownProps) => {
  const id = ownProps.match.params._id;
  const budget =
    id && budgets.length > 0 ? getBudgetById(budgets, id) : newBudget;

  return {
    budget,
    budgets,
    categories
  };
};

const mapDispatchToProps = {
  saveBudget,
  loadBudgets,
  loadCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBudgetPage);
