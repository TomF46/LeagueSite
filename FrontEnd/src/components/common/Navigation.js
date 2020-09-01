import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const activeStyle = { color: "#026440" };

const Navigation = () => (
  <div>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="navbar-item"
            activeStyle={activeStyle}
            exact
          >
            Home
          </NavLink>
          <NavLink
            to="/clubs"
            className="navbar-item"
            activeStyle={activeStyle}
          >
            Clubs
          </NavLink>
          <NavLink
            to="/transfers"
            className="navbar-item"
            activeStyle={activeStyle}
          >
            Transfers
          </NavLink>
          <NavLink
            to="/leagues"
            className="navbar-item"
            activeStyle={activeStyle}
          >
            Leagues
          </NavLink>
        </div>
      </div>
    </nav>
  </div>
);

export default Navigation;

{
  /* <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/clubs" activeStyle={activeStyle}>
        Clubs
      </NavLink>
      {" | "}
      <NavLink to="/transfers" activeStyle={activeStyle}>
        Transfers
      </NavLink>
      {" | "}
      <NavLink to="/leagues" activeStyle={activeStyle}>
        Leagues
      </NavLink>
    </nav> */
}
