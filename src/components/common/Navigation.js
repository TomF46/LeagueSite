import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const activeStyle = { color: "#026440" };

const Navigation = () => (
  <div className="row">
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/clubs" activeStyle={activeStyle}>
        Clubs
      </NavLink>
    </nav>
  </div>
);

export default Navigation;
