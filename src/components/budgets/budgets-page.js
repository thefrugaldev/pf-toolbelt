import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//Redux
import { connect } from "react-redux";
import { loadBudgets, deleteBudget } from "../../redux/actions/budget-actions";
import { loadUsers } from "../../redux/actions/user-actions";
import { loadCategories } from "../../redux/actions/category-actions";
//Components
import BudgetList from "./budget-list";
import Spinner from "../common/spinner";

const BudgetsPage = ({
  users,
  budgets,
  loadBudgets,
  loadUsers,
  deleteBudget,
  loadCategories,
  loading
}) => {
  useEffect(() => {
    loadBudgets().catch(error => {
      alert(`Loading budgets failed ${error}`);
    });
    if (users.length === 0) {
      loadUsers().catch(error => {
        alert(`Loading users failed ${error}`);
      });
    }
    loadCategories().catch(error => {
      alert(`Loading categories failed ${error}`);
    });
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
      <h2>Budgets</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <BudgetList
            onDeleteClick={handleDeleteBudgetAsync}
            budgets={budgets}
          />
          <div className="level">
            <Link
              to="/budget"
              className="button is-primary is-light level-left"
            >
              Add Budget
            </Link>
            <Link
              to="/categories"
              className="button is-link is-light level-right"
            >
              Update Categories
            </Link>
          </div>
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

const mapStateToProps = ({
  budgets,
  users,
  categories,
  apiCallsInProgress
}) => {
  return {
    budgets:
      users.length === 0 || categories.length === 0
        ? []
        : budgets.map(budget => {
            return {
              ...budget,
              userName: users.find(u => u.id === budget.userId).name,
              categoryName: budget.categoryId
                ? categories.find(c => c.id === budget.categoryId).name
                : "No Category Specified"
            };
          }),
    users,
    categories,
    loading: apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadBudgets,
  loadUsers,
  deleteBudget,
  loadCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetsPage);
