import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/app";
import "bootstrap/dist/css/bootstrap.min.css"; //Temporary until i have the skeleton of the site then will style my self
render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
