import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
//Redux
import { connect } from "react-redux";
import { loadBudgets, deleteBudget } from "../../redux/actions/budget-actions";
import { loadCategories } from "../../redux/actions/category-actions";
//Components
import BudgetList from "./budget-list";
import Spinner from "../common/spinner";
import BudgetPageFooter from "./budget-page-footer";
// Utils
import { monthNames } from "../../utils/datetime-helpers";
import NoBudgetNotification from "./no-budget-notification";

const BudgetsPage = ({
  budgets,
  loadBudgets,
  deleteBudget,
  loadCategories,
  loading
}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    getBudgetsByMonthAndYear();
    loadCategories().catch(error => {
      console.log(`Loading categories failed ${error}`);
    });
  }, [selectedMonth]);

  const getBudgetsByMonthAndYear = () => {
    loadBudgets({ month: selectedMonth, year: selectedYear }).catch(error => {
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
      <h2 className="title">{selectedYear} Budgets</h2>
      <div className="tabs is-boxed">
        <ul>
          {monthNames.map((month, index) => (
            <li
              key={month}
              onClick={() => setSelectedMonth(index + 1)}
              className={selectedMonth == index + 1 ? "is-active" : ""}
            >
              <a>{month}</a>
            </li>
          ))}
        </ul>
      </div>
      {loading ? (
        <Spinner />
      ) : budgets.length ? (
        <>
          <BudgetList
            onDeleteClick={handleDeleteBudgetAsync}
            budgets={budgets}
          />
        </>
      ) : (
        <NoBudgetNotification />
      )}
      <BudgetPageFooter />
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
