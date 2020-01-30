import React from "react";

const NoBudgetNotification = () => {
  return (
    <div className="columns is-centered">
      <div className="column is-three-fifths">
        <h2 className="title has-text-centered">No Budgets!</h2>
        <img
          src="./src/assets/images/no-content.svg"
          alt="No budgets created yet"
        />
      </div>
    </div>
  );
};

export default NoBudgetNotification;
