import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
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
  );
};

export default Header;
