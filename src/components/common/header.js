import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { logout } from "../../redux/actions/firebase-actions";

const Header = ({ currentUser, logout }) => {
  const activeStyle = { color: "#F15B2A" };
  const handleLogout = event => {
    event.preventDefault();
    logout();
  };

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

        {currentUser ? (
          <div>
            Welcome {currentUser.email} | {currentUser.uid}
            <button
              onClick={handleLogout}
              className="button is-danger is-light"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Please Login</p>
        )}
      </nav>
    </>
  );
};

Header.propTypes = {
  currentUser: PropTypes.object,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

export default connect(mapStateToProps, { logout })(Header);
