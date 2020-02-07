import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
//Redux
import { connect } from "react-redux";
import { loadCategories } from "../../redux/actions/category-actions";
import {
  loadLineItems,
  deleteLineItem
} from "../../redux/actions/line-item-actions";
//Components
import LineItemsList from "./line-item-list";
import Spinner from "../common/spinner";
import BudgetsPageFooter from "./budget-page-footer";
// Utils
import { monthNames } from "../../utils/datetime-helpers";
import NoBudgetNotification from "./no-budget-notification";

const BudgetPage = ({
  lineItems,
  categories,
  loadLineItems,
  loadCategories,
  loading
}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadLineItems().catch(error => {
      console.log(`Loading budgets failed ${error}`);
    });
    loadCategories().catch(error => {
      console.log(`Loading categories failed ${error}`);
    });
  }, [selectedMonth]);

  // useEffect(() => {
  //   getBudgetByMonthAndYear(selectedMonth, selectedYear);
  // }, [lineItems]);

  // const getBudgetByMonthAndYear = (month, year) => {
  //   setSelectedMonth(month);
  //   setMonthlyBudget(
  //     lineItems.find(budget => budget.month === month && budget.year === year)
  //   );
  // };

  const handleDeleteBudgetAsync = async budget => {
    try {
      await deleteLineItem(budget);
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
      ) : lineItems.length ? (
        <>
          <LineItemsList
            onDeleteClick={handleDeleteBudgetAsync}
            lineItems={lineItems}
          />

          <BudgetsPageFooter />
        </>
      ) : (
        <NoBudgetNotification
          month={selectedMonth}
          year={selectedYear}
          categories={categories}
        />
      )}
    </>
  );
};

BudgetPage.propTypes = {
  lineItems: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  loadLineItems: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  deleteLineItem: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ lineItems, categories, apiCallsInProgress }) => {
  return {
    lineItems,
    categories,
    loading: apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadLineItems,
  loadCategories,
  deleteLineItem
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPage);
