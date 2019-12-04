import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
//Redux
import { connect } from "react-redux";
import { loadBudgets, saveBudget } from "../../redux/actions/budget-actions";
import { loadUsers } from "../../redux/actions/user-actions";
//Components
import BudgetForm from "./budget-form";
import { newBudget } from "../../../tools/mock-budgets";
import Spinner from "../common/spinner";

const ManageBudgetPage = ({
  budgets,
  users,
  loadBudgets,
  loadUsers,
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
    if (users.length === 0) {
      loadUsers().catch(error => {
        alert(`Loading users failed ${error}`);
      });
    }
  }, [props.budget]);

  const handleChange = event => {
    const { name, value } = event.target;
    setBudget(prevBudget => ({
      ...prevBudget,
      [name]: name === "userId" ? parseInt(value, 10) : value
    }));
  };

  const formIsValid = () => {
    const { title, userId, category } = budget;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!userId) errors.user = "User is required";
    if (!category) errors.category = "Category is required";

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

  return users.length === 0 || budgets.length === 0 ? (
    <Spinner />
  ) : (
    <BudgetForm
      budget={budget}
      errors={errors}
      users={users}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageBudgetPage.propTypes = {
  budget: PropTypes.object.isRequired,
  budgets: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  loadBudgets: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  saveBudget: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getBudgetById(budgets, id) {
  return budgets.find(budget => budget.id === parseInt(id)) || null;
}

const mapStateToProps = ({ budgets, users }, ownProps) => {
  const id = ownProps.match.params.id;
  const budget =
    id && budgets.length > 0 ? getBudgetById(budgets, id) : newBudget;

  return {
    budget,
    budgets,
    users
  };
};

const mapDispatchToProps = {
  saveBudget,
  loadBudgets,
  loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBudgetPage);
