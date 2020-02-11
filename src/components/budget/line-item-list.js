import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// Utils
import { getDisplayFormattedDate } from "../../utils/datetime-helpers";
// Redux
import { connect } from "react-redux";
import { sortLineItems } from "../../redux/actions/line-item-actions";

const LineItemList = ({ lineItems, onDeleteClick, dispatch }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalBody, setModalBody] = useState();
  const [sortedProperty, setSortedProperty] = useState("");

  const handleInfoClick = budget => {
    setModalTitle(budget.title);
    setModalBody(budget.description);
    setActiveModal(true);
  };

  const sortByType = key => {
    key === sortedProperty ? sortDescending(key) : sortAscending(key);
  };

  const sortAscending = key => {
    dispatch(sortLineItems(key));
    setSortedProperty(key);
  };

  const sortDescending = key => {
    dispatch(sortLineItems(key, "desc"));
    setSortedProperty("");
  };

  return (
    <>
      <div className={`modal ${activeModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{modalTitle}</p>
            <button
              className="delete"
              onClick={() => setActiveModal(false)}
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">{modalBody}</section>
        </div>
      </div>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th onClick={() => sortByType("title")}>Title</th>
            <th>Category</th>
            <th onClick={() => sortByType("amount")}>Amount</th>
            <th onClick={() => sortByType("date")}>Date</th>
            <th>Notes</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {lineItems.map(lineItem => {
            return (
              <tr key={lineItem._id}>
                <td>
                  <Link to={`/budget/line-item/${lineItem._id}`}>
                    {lineItem.title}
                  </Link>
                </td>
                <td>
                  {lineItem.category
                    ? lineItem.category.name
                    : "No Category Specified"}
                </td>
                <td
                  className={
                    lineItem.isSavings ? `has-text-success` : `has-text-danger`
                  }
                >
                  {lineItem.amount && `$${lineItem.amount}`}
                </td>
                <td>{getDisplayFormattedDate(lineItem.date)}</td>
                <td>
                  {lineItem.description && (
                    <span className="icon has-text-info">
                      <FontAwesomeIcon
                        onClick={() => handleInfoClick(lineItem)}
                        icon={faInfoCircle}
                      />
                    </span>
                  )}
                </td>
                <td>
                  <button
                    className="button is-danger"
                    onClick={() => onDeleteClick(lineItem)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

LineItemList.propTypes = {
  lineItems: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  sortLineItems,
  dispatch
});

export default connect(null, mapDispatchToProps)(LineItemList);
