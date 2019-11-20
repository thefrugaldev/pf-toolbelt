import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1>PF Financial Toolbelt</h1>
    <p>
      Welcome to the finanical toolbelt for all of your personal finance needs.
    </p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
  </div>
);

export default HomePage;
