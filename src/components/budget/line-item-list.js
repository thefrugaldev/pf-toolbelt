import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const LineItemList = ({ lineItems, onDeleteClick }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalBody, setModalBody] = useState();

  const handleInfoClick = budget => {
    setModalTitle(budget.title);
    setModalBody(budget.description);
    setActiveModal(true);
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
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Notes</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {lineItems.map(lineItem => {
            return (
              <tr key={lineItem._id}>
                <td>
                  <Link to={`/budget/${lineItem._id}`}>{lineItem.title}</Link>
                </td>
                <td>{lineItem.categoryName}</td>
                <td>{lineItem.amount && `$${lineItem.amount}`}</td>
                <td>{`${lineItem.month}-${lineItem.day}-${lineItem.year}`}</td>
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
  onDeleteClick: PropTypes.func.isRequired
};

export default LineItemList;
