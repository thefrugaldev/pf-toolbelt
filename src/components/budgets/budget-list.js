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
          <th>User</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {budgets.map(budget => {
          return (
            <tr key={budget.id}>
              <td>
                <Link to={`/budget/${budget.id}`}>{budget.title}</Link>
              </td>
              <td>{budget.categoryName}</td>
              <td>{`${budget.month}-${budget.day}-${budget.year}`}</td>
              <td>{budget.userName}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
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
