import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const BudgetList = ({ budgets, onDeleteClick }) => {
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
          {budgets.map(budget => {
            return (
              <tr key={budget._id}>
                <td>
                  <Link to={`/budget/${budget._id}`}>{budget.title}</Link>
                </td>
                <td>{budget.categoryName}</td>
                <td>{budget.price && `$${budget.price}`}</td>
                <td>{`${budget.month}-${budget.day}-${budget.year}`}</td>
                <td>
                  {budget.description && (
                    <span className="icon has-text-info">
                      <FontAwesomeIcon
                        onClick={() => handleInfoClick(budget)}
                        icon={faInfoCircle}
                      />
                    </span>
                  )}
                </td>
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
    </>
  );
};

BudgetList.propTypes = {
  budgets: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default BudgetList;
