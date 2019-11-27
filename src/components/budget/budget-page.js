import React, { useEffect } from "react";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import * as budgetActions from "../../redux/actions/budget-actions";
import { bindActionCreators } from "redux";
//Components
import BudgetList from "./budget-list";

const BudgetPage = ({ budgets, actions }) => {
  useEffect(() => {
    actions.loadBudgets().catch(error => {
      alert(`Loading budgets failed ${error}`);
    });
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
