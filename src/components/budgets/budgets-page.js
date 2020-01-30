import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//Redux
import { connect } from "react-redux";
import { loadBudgets, deleteBudget } from "../../redux/actions/budget-actions";
import { loadCategories } from "../../redux/actions/category-actions";
//Components
import BudgetList from "./budget-list";
import Spinner from "../common/spinner";
// Utils
import { monthNames } from "../../utils/datetime-helpers";

const BudgetsPage = ({
  budgets,
  loadBudgets,
  deleteBudget,
  loadCategories,
  loading
}) => {
  const [budgetMonth, setBudgetMonth] = useState(new Date().getMonth() + 1);
  const [budgetYear, setBudgetYear] = useState(new Date().getFullYear());

  useEffect(() => {
    getBudgetsByMonthAndYear();
    loadCategories().catch(error => {
      console.log(`Loading categories failed ${error}`);
    });
  }, [budgetMonth]);

  const getBudgetsByMonthAndYear = () => {
    loadBudgets({ month: budgetMonth, year: budgetYear }).catch(error => {
      console.log(`Loading budgets failed ${error}`);
    });
  };

  const handleDeleteBudgetAsync = async budget => {
    try {
      await deleteBudget(budget);
      toast.success("Budget Deleted");
    } catch (error) {
      toast.error(`Delete Failed. ${error}`, { autoClose: false });
    }
  };

  return (
    <>
      <div className="tabs">
        <ul>
          {monthNames.map((month, index) => (
            <li key={month} onClick={() => setBudgetMonth(index + 1)}>
              <a>{month}</a>
            </li>
          ))}
        </ul>
      </div>
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
              Manage Categories
            </Link>
          </div>
        </>
      )}
    </>
  );
};

BudgetsPage.propTypes = {
  budgets: PropTypes.array.isRequired,
  loadBudgets: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  deleteBudget: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ budgets, categories, apiCallsInProgress }) => {
  return {
    budgets:
      categories.length === 0
        ? []
        : budgets.map(budget => {
            return {
              ...budget,
              categoryName: budget.categoryId
                ? categories.find(c => c._id === budget.categoryId).name
                : "No Category Specified"
            };
          }),
    categories,
    loading: apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadBudgets,
  deleteBudget,
  loadCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetsPage);
