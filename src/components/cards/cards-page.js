import React, { useState } from "react";

const CardsPage = () => {
  const [card, setCard] = useState({ vendor: "" });

  const handleChange = event => {
    const card = { ...card, vendor: event.target.value };
    setCard(card);
  };

  const handleSubmit = event => {
    event.preventDefault();
    alert(card.vendor);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Credit Cards</h2>
      <h3>Add Card</h3>
      <input type="text" onChange={handleChange} value={card.vendor} />
      <input type="submit" value="Save" />
    </form>
  );
};

export default CardsPage;
