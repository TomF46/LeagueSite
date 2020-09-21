import React from "react";
import { render } from "react-dom";
import { Router } from "react-router-dom";
import App from "./components/app";
// import "bulma/css/bulma.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./app.scss";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import history from "./history";

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
