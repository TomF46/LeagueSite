import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/app";
import "bootstrap/dist/css/bootstrap.min.css"; //Temporary until i have the skeleton of the site then will style my self
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
