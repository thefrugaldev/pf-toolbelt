import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Redux
import { loadLineItems } from "../../redux/actions/line-item-actions";
import { loadCategories } from "../../redux/actions/category-actions";

const ReportsPage = ({ budgetsByYear, loadBudgets, loadCategories }) => {
  useEffect(() => {
    loadBudgets().catch(error => {
      console.log(`Loading budgets failed ${error}`);
    });
    loadCategories().catch(error => {
      console.log(`Loading categories failed ${error}`);
    });
  }, []);

  return (
    <>
      <h2>Reports</h2>
      <ul>
        {budgetsByYear.map(budget => {
          return <li key={budget._id}>{budget.title}</li>;
        })}
      </ul>
    </>
  );
};

ReportsPage.propTypes = {
  budgetsByYear: PropTypes.array.isRequired,
  categoriesByYear: PropTypes.array.isRequired,
  loadBudgets: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired
};

const mapStateToProps = ({ budgets, categories }) => {
  return {
    budgetsByYear: categories.length === 0 ? [] : budgets,
    categoriesByYear: categories
  };
};

const mapDispatchToProps = {
  loadBudgets: loadLineItems,
  loadCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsPage);
