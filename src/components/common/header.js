import React, { useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { getAuthenticationStatus } from "../../auth/auth-service";
// Redux
import { connect } from "react-redux";
import { logout, fetchUser } from "../../redux/actions/firebase-actions";
import { toast } from "react-toastify";

const Header = ({ logout }) => {
  const activeStyle = { color: "#F15B2A" };
  const handleLogout = event => {
    event.preventDefault();
    logout();
    toast.success("Logout successful");
  };

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useLayoutEffect(() => {
    setIsAuthenticated(getAuthenticationStatus());
  });

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
        {isAuthenticated && (
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

        {isAuthenticated ? (
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

export default connect(mapStateToProps, { logout, fetchUser })(Header);
