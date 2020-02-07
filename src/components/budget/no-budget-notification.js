import React, { useEffect } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { saveLineItem } from "../../redux/actions/line-item-actions";

const NoBudgetNotification = ({ month, year, categories, saveBudget }) => {
  useEffect(() => {}, []);

  const createBudget = () => {
    categories.length
      ? saveBudget({ categories })
      : console.log("No categories :(");
  };

  return (
    <div className="columns is-centered">
      <div className="column is-three-fifths has-text-centered">
        <h2 className="title">
          No Budgets for {month} {year}!
        </h2>
        <button onClick={createBudget} className="button is-primary">
          Create a New Budget
        </button>
        {/* <p>
          <img
            src="./src/assets/images/no-content.svg"
            alt="No budgets created yet"
          />
        </p> */}
      </div>
    </div>
  );
};

NoBudgetNotification.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
  saveBudget: PropTypes.func.isRequired
};

export default connect(null, { saveBudget: saveLineItem })(
  NoBudgetNotification
);
