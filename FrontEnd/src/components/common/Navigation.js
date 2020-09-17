import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import "./Navigation.scss";
import { logout } from "../../redux/actions/authenticationActions";
import { confirmAlert } from "react-confirm-alert";

const activeStyle = { color: "#026440" };

const Navigation = ({ user, logout, history }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [menuClass, setMenuClass] = useState("navbar-menu");
  function confirmLogout() {
    confirmAlert({
      title: "Confirm logout",
      message: `Are you sure you want to logout?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => handleLogout(),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  function handleLogout() {
    logout(user);
    history.push("/");
  }

  const toggleMenuClass = () => {
    let menuState = !menuIsOpen;
    setMenuIsOpen(menuState);
    let theMenuClass = menuState ? "navbar-menu is-active" : "navbar-menu";
    setMenuClass(theMenuClass);
  };

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <h1
            className="navbar-item has-text-weight-bold pointer"
            onClick={() => {
              history.push("/");
            }}
          >
            LeagueApp
          </h1>
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            onClick={toggleMenuClass}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={menuClass}>
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
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* <a className="button is-primary">
                <strong>Sign up</strong>
              </a> */}
                {user == null ? (
                  <a
                    className="button is-primary"
                    onClick={() => history.push("/login")}
                  >
                    Log in
                  </a>
                ) : (
                  <a
                    className="button is-danger"
                    onClick={() => confirmLogout()}
                  >
                    Logout - {user.username}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

Navigation.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logout,
};

const navigationWithRouter = withRouter(Navigation);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigationWithRouter);
