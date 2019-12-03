import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import * as budgetActions from "../../redux/actions/budget-actions";
import * as userActions from "../../redux/actions/user-actions";
import { bindActionCreators } from "redux";
//Components
import BudgetList from "./budget-list";
import Spinner from "../common/spinner";

const BudgetPage = ({ users, budgets, actions, loading }) => {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);
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
      {redirectToAddCoursePage && <Redirect to="/budget" />}
      <h2>Budgets</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            className="btn btn-primary add-course mb-20"
            onClick={() => {
              setRedirectToAddCoursePage(true);
            }}
          >
            Add Budget
          </button>
          <BudgetList budgets={budgets} />
        </>
      )}
    </>
  );
};

BudgetPage.propTypes = {
  budgets: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ budgets, users, apiCallsInProgress }) => {
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
    users,
    loading: apiCallsInProgress > 0
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
