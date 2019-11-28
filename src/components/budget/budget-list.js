import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BudgetList = ({ budgets }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Date</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {budgets.map(budget => {
          return (
            <tr key={budget.id}>
              <td>
                <Link to={`/budget/${budget.id}`}>{budget.title}</Link>
              </td>
              <td>{budget.category}</td>
              <td>{`${budget.month}-${budget.day}-${budget.year}`}</td>
              <td>{budget.userName}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

BudgetList.propTypes = {
  budgets: PropTypes.array.isRequired
};

export default BudgetList;
