import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
//Redux
import { connect } from "react-redux";
import { loadBudgets, deleteBudget } from "../../redux/actions/budget-actions";
//Components
import LineItemsList from "./line-item-list";
import Spinner from "../common/spinner";
import BudgetsPageFooter from "./budgets-page-footer";
// Utils
import { monthNames } from "../../utils/datetime-helpers";
import NoBudgetNotification from "./no-budget-notification";

const BudgetsPage = ({ budgets, loadBudgets, loading }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyBudget, setMonthlyBudget] = useState();

  useEffect(() => {
    loadBudgets().catch(error => {
      console.log(`Loading budgets failed ${error}`);
    });
  }, []);

  const getBudgetByMonthAndYear = (month, year) => {
    setSelectedMonth(month);
    setMonthlyBudget(
      budgets.find(budget => budget.month === month && budget.year === year)
    );
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
              onClick={() => getBudgetByMonthAndYear(index + 1, selectedYear)}
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
          <LineItemsList
            onDeleteClick={handleDeleteBudgetAsync}
            budgets={budgets}
          />
        </>
      ) : (
        <NoBudgetNotification month={selectedMonth} year={selectedYear} />
      )}
      <BudgetsPageFooter />
    </>
  );
};

BudgetsPage.propTypes = {
  budgets: PropTypes.array.isRequired,
  loadBudgets: PropTypes.func.isRequired,
  // loadCategories: PropTypes.func.isRequired,
  deleteBudget: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ budgets, apiCallsInProgress }) => {
  return {
    budgets,
    loading: apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadBudgets,
  deleteBudget
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetsPage);
