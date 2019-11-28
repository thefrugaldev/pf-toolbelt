import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import { loadBudgets } from "../../redux/actions/budget-actions";
import { loadUsers } from "../../redux/actions/user-actions";
//Components
import BudgetForm from "./budget-form";
import { newBudget } from "../../../tools/mock-budgets";

const ManageBudgetPage = ({ users, loadBudgets, loadUsers, ...props }) => {
  const [budget, setBudget] = useState({ ...props.budget });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadBudgets().catch(error => {
      alert(`Loading budgets failed ${error}`);
    });
    if (users.length === 0) {
      loadUsers().catch(error => {
        alert(`Loading users failed ${error}`);
      });
    }
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setBudget(prevBudget => ({
      ...prevBudget,
      [name]: name === "userId" ? parseInt(value, 10) : value
    }));
  };

  return (
    <>
      <BudgetForm
        budget={budget}
        errors={errors}
        users={users}
        onChange={handleChange}
      />
    </>
  );
};

ManageBudgetPage.propTypes = {
  budget: PropTypes.object.isRequired,
  budgets: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  loadBudgets: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired
};

const mapStateToProps = ({ budgets, users }) => {
  return {
    budget: newBudget,
    budgets,
    users
  };
};

const mapDispatchToProps = {
  loadBudgets,
  loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBudgetPage);
