import React, { useEffect } from "react";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import * as budgetActions from "../../redux/actions/budget-actions";
import * as userActions from "../../redux/actions/user-actions";
import { bindActionCreators } from "redux";
//Components
import BudgetList from "./budget-list";

const BudgetPage = ({ users, budgets, actions }) => {
  useEffect(() => {
    actions.loadBudgets().catch(error => {
      alert(`Loading budgets failed ${error}`);
    });
    if (users.length === 0) {
      actions.loadUsers().catch(error => {
        alert(`Loading users failed ${error}`);
      });
    }
  }, []);

  return (
    <>
      <h2>Budgets</h2>
      <BudgetList budgets={budgets} />
    </>
  );
};

BudgetPage.propTypes = {
  budgets: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = ({ budgets, users }) => {
  return {
    budgets:
      users.length === 0
        ? []
        : budgets.map(budget => {
            return {
              ...budget,
              userName: users.find(u => u.id === budget.userId).name
            };
          }),
    users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadBudgets: bindActionCreators(budgetActions.loadBudgets, dispatch),
      loadUsers: bindActionCreators(userActions.loadUsers, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPage);
