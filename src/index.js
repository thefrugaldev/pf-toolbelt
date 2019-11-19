import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import App from "./components/App";
//Styles
import "./index.scss";

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
