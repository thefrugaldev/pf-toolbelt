import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Header = ({ currentUser }) => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <>
      <nav>
        <NavLink to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink>
        {" | "}
        <NavLink to="/cards" activeStyle={activeStyle} exact>
          Cards
        </NavLink>
        {" | "}
        <NavLink to="/budgets" activeStyle={activeStyle} exact>
          Budgets
        </NavLink>
        {" | "}
        <NavLink to="/about" activeStyle={activeStyle}>
          About
        </NavLink>
        {" | "}
        <NavLink to="/login" activeStyle={activeStyle}>
          Login
        </NavLink>
        {" | "}
        <NavLink to="/register" activeStyle={activeStyle}>
          Register
        </NavLink>
      </nav>

      {currentUser && (
        <h4 className="title is-4">Welcome {currentUser.email}</h4>
      )}
    </>
  );
};

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

export default connect(mapStateToProps)(Header);
