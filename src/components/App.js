import React from "react";
import { Route, Switch } from "react-router-dom";
//Components
import HomePage from "./home/home-page";
import AboutPage from "./about/about-page";
import Header from "./common/header";
import PageNotFound from "./page-not-found";
import CardsPage from "./cards/cards-page";
import BudgetsPage from "./budget/budget-page";
import ManageBudgetPage from "./budget/manage-budget-page";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/cards" component={CardsPage} />
        <Route path="/budgets" component={BudgetsPage} />
        <Route path="/budget/:id" component={ManageBudgetPage} />
        <Route path="/budget" component={ManageBudgetPage} />

        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
