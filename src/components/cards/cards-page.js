import React, { useState } from "react";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import * as cardActions from "../../redux/actions/card-actions";
import { bindActionCreators } from "redux";

const CardsPage = ({ actions, cards }) => {
  const [card, setCard] = useState({ vendor: "" });

  const handleChange = event => {
    const card = { ...card, vendor: event.target.value };
    setCard(card);
  };

  const handleSubmit = event => {
    event.preventDefault();
    actions.createCard(card);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Credit Cards</h2>
      <h3>Add Card</h3>
      <input type="text" onChange={handleChange} value={card.vendor} />
      <input type="submit" value="Save" />

      {cards.map(card => (
        <div key={card.vendor}>{card.vendor}</div>
      ))}
    </form>
  );
};

CardsPage.propTypes = {
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    cards: state.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(cardActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage);
