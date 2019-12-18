import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { logout } from "../../redux/actions/firebase-actions";
import { toast } from "react-toastify";

const Header = ({ currentUser, logout, history }) => {
  const activeStyle = { color: "#F15B2A" };
  const handleLogout = event => {
    event.preventDefault();
    logout();
    toast.success("Logout successful");
  };

  return (
    <>
      <nav className="level">
        <NavLink
          to="/"
          activeStyle={activeStyle}
          exact
          className="link is-info"
        >
          Home
        </NavLink>
        <NavLink
          to="/cards"
          activeStyle={activeStyle}
          exact
          className="link is-info"
        >
          Cards
        </NavLink>
        {currentUser && (
          <NavLink
            to="/budgets"
            activeStyle={activeStyle}
            exact
            className="link is-info"
          >
            Budgets
          </NavLink>
        )}
        <NavLink to="/about" activeStyle={activeStyle} className="link is-info">
          About
        </NavLink>

        {currentUser ? (
          <>
            <NavLink onClick={handleLogout} to="/" className="link is-info">
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              activeStyle={activeStyle}
              className="link is-info"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              activeStyle={activeStyle}
              className="link is-info"
            >
              Register
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
};

Header.propTypes = {
  currentUser: PropTypes.object,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object
};

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

export default connect(mapStateToProps, { logout })(Header);
