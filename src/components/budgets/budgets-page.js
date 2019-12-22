import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
//Redux
import { connect } from "react-redux";
import { loadBudgets, deleteBudget } from "../../redux/actions/budget-actions";
import { loadUsers } from "../../redux/actions/user-actions";
//Components
import BudgetList from "./budget-list";
import Spinner from "../common/spinner";

const BudgetsPage = ({
  users,
  budgets,
  loadBudgets,
  loadUsers,
  deleteBudget,
  loading
}) => {
  const [redirectToAddBudgetPage, setRedirectToAddBudgetPage] = useState(false);
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

  const handleDeleteBudgetAsync = async budget => {
    toast.success("Budget Deleted");
    try {
      await deleteBudget(budget);
    } catch (error) {
      toast.error(`Delete Failed. ${error}`, { autoClose: false });
    }
  };

  return (
    <>
      {redirectToAddBudgetPage && <Redirect to="/budget" />}
      <h2>Budgets</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            className="button is-primary"
            onClick={() => {
              setRedirectToAddBudgetPage(true);
            }}
          >
            Add Budget
          </button>
          <BudgetList
            onDeleteClick={handleDeleteBudgetAsync}
            budgets={budgets}
          />
        </>
      )}
    </>
  );
};

BudgetsPage.propTypes = {
  budgets: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  loadBudgets: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  deleteBudget: PropTypes.func.isRequired,
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

const mapDispatchToProps = {
  loadBudgets,
  loadUsers,
  deleteBudget
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetsPage);
