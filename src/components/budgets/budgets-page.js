import React, { useEffect } from "react";
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

const BudgetsPage = ({
  budgets,
  loadBudgets,
  deleteBudget,
  loadCategories,
  loading
}) => {
  useEffect(() => {
    loadBudgets().catch(error => {
      console.log(`Loading budgets failed ${error}`);
    });
    loadCategories().catch(error => {
      console.log(`Loading categories failed ${error}`);
    });
  }, []);

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
