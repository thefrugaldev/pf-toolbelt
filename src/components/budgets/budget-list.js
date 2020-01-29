import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BudgetList = ({ budgets, onDeleteClick }) => {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Date</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {budgets.map(budget => {
          return (
            <tr key={budget._id}>
              <td>
                <Link to={`/budget/${budget._id}`}>{budget.title}</Link>
              </td>
              <td>{budget.categoryName}</td>
              <td>{`${budget.month}-${budget.day}-${budget.year}`}</td>
              <td>
                <button
                  className="button is-danger"
                  onClick={() => onDeleteClick(budget)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

BudgetList.propTypes = {
  budgets: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default BudgetList;
