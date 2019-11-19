import React from "react";
import { Route, Switch } from "react-router-dom";
//Components
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CardsPage from "./cards/CardsPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/cards" component={CardsPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
