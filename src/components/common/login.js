import React, { createRef } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
// Redux
import { connect } from "react-redux";
import { login } from "../../redux/actions/firebase-actions";

const Login = ({ login }) => {
  const email = createRef();
  const password = createRef();

  const handleSubmit = event => {
    event.preventDefault();
    login(email.current.value, password.current.value)
      .then(() => {
        toast.success("Login successful");
      })
      .catch(error => {
        toast.error("Login failed");
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="control">
        <input
          name="name"
          type="email"
          ref={email}
          placeholder="Email"
          className="input is-primary"
        />
      </div>

      <div className="control">
        <input
          name="password"
          type="password"
          ref={password}
          placeholder="Password"
          autoComplete="none"
          className="input is-primary"
        />
      </div>

      <div className="control">
        <button type="submit" className="button is-link">
          Submit
        </button>
      </div>
    </form>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  login
};

export default connect(null, mapDispatchToProps)(Login);
