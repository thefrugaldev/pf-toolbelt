import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare
} from "@fortawesome/free-regular-svg-icons";

const BudgetPageFooter = () => {
  const [activeDropdown, setActiveDropdown] = useState(false);

  return (
    <div className="level">
      <div
        className={`dropdown ${activeDropdown ? "is-active" : ""}`}
        onClick={() => setActiveDropdown(!activeDropdown)}
      >
        <div className="dropdown-trigger">
          <button
            className="button is-primary is-light"
            aria-haspopup="true"
            aria-controls="add-budget-menu"
          >
            <span>Add New Entry</span>
            <span className="icon is-small">
              {activeDropdown ? (
                <FontAwesomeIcon icon={faMinusSquare} />
              ) : (
                <FontAwesomeIcon icon={faPlusSquare} />
              )}
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="add-budget-menu" role="menu">
          <div className="dropdown-content">
            <Link to="/budget" className="has-text-danger dropdown-item">
              Add Expense
            </Link>
            <Link to="/budget" className="has-text-success dropdown-item">
              Add Savings
            </Link>
          </div>
        </div>
      </div>
      <Link to="/budgets/reports" className="button is-success is-light">
        View Reports
      </Link>
      <Link to="/categories" className="button is-link is-light">
        Manage Categories
      </Link>
    </div>
  );
};

export default BudgetPageFooter;
