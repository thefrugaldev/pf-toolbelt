import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import { loadCategories } from "../../redux/actions/category-actions";

const NoBudgetNotification = ({ month, year, categories, loadCategories }) => {
  useEffect(() => {
    // loadCategories().catch(error => {
    //   console.log(`Loading categories failed ${error}`);
    // });
    console.log(categories);
  }, []);

  return (
    <div className="columns is-centered">
      <div className="column is-three-fifths has-text-centered">
        <h2 className="title">
          No Budgets for {month} {year}!
        </h2>
        <Link to="/budget/create" className="button is-primary">
          Create a New Budget
        </Link>
        <p>
          <img
            src="./src/assets/images/no-content.svg"
            alt="No budgets created yet"
          />
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ categories, apiCallsInProgress }) => {
  return {
    categories,
    loading: apiCallsInProgress > 0
  };
};

NoBudgetNotification.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
  loadCategories: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { loadCategories })(
  NoBudgetNotification
);
