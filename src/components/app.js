import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Components
import HomePage from "./home/home-page";
import AboutPage from "./about/about-page";
import Header from "./common/header";
import PageNotFound from "./page-not-found";
import CardsPage from "./cards/cards-page";
import BudgetsPage from "./budgets/budget-pages";
import ManageBudgetPage from "./budgets/manage-budget-page";
import Login from "./common/login";
import Register from "./common/register";
import PrivateRoute from "./common/private-route";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={Login} />
        <Route path="/cards" component={CardsPage} />
        <PrivateRoute path="/budgets" component={BudgetsPage} />
        <PrivateRoute path="/budget/:id" component={ManageBudgetPage} />
        <PrivateRoute path="/budget" component={ManageBudgetPage} />
        <Route path="/register" component={Register} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
