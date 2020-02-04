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
import CardsPage from "./cards/cards-page";
import BudgetsPage from "./budgets/budgets-page";
import ManageBudgetPage from "./budgets/manage-budget-page";
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
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={Login} />
        <Route path="/cards" component={CardsPage} />
        <PrivateRoute exact path="/budgets" component={BudgetsPage} />
        <PrivateRoute exact path="/budgets/reports" component={ReportsPage} />
        <PrivateRoute path="/budget/:id" component={ManageBudgetPage} />
        <PrivateRoute path="/budget" component={ManageBudgetPage} />
        <PrivateRoute path="/categories" component={ManageCategoriesPage} />
        <Route path="/register" component={Register} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired
};

export default connect(null, { fetchUser })(App);
