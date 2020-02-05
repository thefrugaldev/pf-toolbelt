import React, { useLayoutEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions/firebase-actions";
// Components
import HomePage from "./home/home-page";
import AboutPage from "./about/about-page";
import Header from "./common/header";
import PageNotFound from "./page-not-found";
import BudgetsPage from "./budgets/budgets-page";
import ManageLineItemPage from "./budgets/manage-line-item-page";
import ManageCategoriesPage from "./budgets/manage-categories-page";
import Login from "./common/login";
import Register from "./common/register";
import PrivateRoute from "./common/private-route";
import ReportsPage from "./budgets/reports-page";

function App({ fetchUser }) {
  useLayoutEffect(() => {
    fetchUser();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/budgets" component={BudgetsPage} />
          <PrivateRoute exact path="/budgets/reports" component={ReportsPage} />
          <PrivateRoute
            path="/budgets/:id/line-item/:id"
            component={ManageLineItemPage}
          />
          <PrivateRoute
            path="/budgets/:id/line-item"
            component={ManageLineItemPage}
          />
          <PrivateRoute path="/categories" component={ManageCategoriesPage} />
          <Route path="/register" component={Register} />
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
    </section>
  );
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired
};

export default connect(null, { fetchUser })(App);
