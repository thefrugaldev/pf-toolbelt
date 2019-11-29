import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import { loadBudgets, saveBudget } from "../../redux/actions/budget-actions";
import { loadUsers } from "../../redux/actions/user-actions";
//Components
import BudgetForm from "./budget-form";
import { newBudget } from "../../../tools/mock-budgets";

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

  const handleSave = event => {
    event.preventDefault();
    saveBudget(budget).then(() => {
      history.push("/budgets");
    });
  };

  return (
    <>
      <BudgetForm
        budget={budget}
        errors={errors}
        users={users}
        onChange={handleChange}
        onSave={handleSave}
      />
    </>
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
