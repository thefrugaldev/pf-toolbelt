import React from "react";
import PropTypes from "prop-types";

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
              <td>{budget.title}</td>
              <td>{budget.category}</td>
              <td>{`${budget.month}-${budget.day}-${budget.year}`}</td>
              <td>{budget.userId}</td>
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
