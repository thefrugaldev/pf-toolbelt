import * as React from "react";
import { FC, useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAuthenticationStatus } from "../../auth/auth-service";
// Redux
import { connect } from "react-redux";
import { logout } from "../../redux/actions/firebase-actions";
import { toast } from "react-toastify";

const Header: FC<{ logout: Function }> = ({ logout }) => {
  const activeStyle = { color: "#F15B2A" };
  const handleLogout = event => {
    event.preventDefault();
    logout();
    toast.success("Logout successful");
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  useLayoutEffect(() => {
    setIsAuthenticated(getAuthenticationStatus());
  });

  return (
    <>
      <nav className="navbar level">
        <NavLink
          to="/"
          activeStyle={activeStyle}
          exact
          className="link is-info"
        >
          Home
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/budget"
            activeStyle={activeStyle}
            exact
            className="link is-info"
          >
            Budget
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

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

export default connect(mapStateToProps, { logout })(Header);
