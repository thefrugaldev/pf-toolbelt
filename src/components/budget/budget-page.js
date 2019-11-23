import React, { useState } from "react";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import * as budgetActions from "../../redux/actions/budget-actions";
import { bindActionCreators } from "redux";

const BudgetPage = ({ actions, budgets }) => {
  const [budget, setBudget] = useState({ title: "" });

  const handleChange = event => {
    const budget = { ...budget, title: event.target.value };
    setBudget(budget);
  };

  const handleSubmit = event => {
    event.preventDefault();
    actions.createBudget(budget);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Budgets</h2>
      <h3>Create a New Budget</h3>
      <input type="text" onChange={handleChange} value={budget.title} />
      <input type="submit" value="Save" />

      {budgets.map(budget => (
        <div key={budget.title}>{budget.title}</div>
      ))}
    </form>
  );
};

BudgetPage.propTypes = {
  budgets: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = ({ budgets }) => {
  return {
    budgets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(budgetActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPage);
