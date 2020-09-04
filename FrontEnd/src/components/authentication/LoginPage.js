import React, { useState } from "react";
import { connect } from "react-redux";
// import { loadLeagues, saveLeague } from "../../redux/actions/leagueActions";
import { login } from "../../redux/actions/authenticationActions";
import { newLoginDetails } from "../../../tools/mockData";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import LoginForm from "./LoginForm";

const LoginPage = ({ login, history, ...props }) => {
  const [userLoginDetails, setUserLoginDetails] = useState({
    ...props.userLoginDetails,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserLoginDetails((prevUserLoginDetails) => ({
      ...prevUserLoginDetails,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { username, password } = userLoginDetails;
    const errors = {};
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSubmitting(true);
    login(userLoginDetails)
      .then(() => {
        toast.success("Logged in");
        history.push("/");
      })
      .catch((err) => {
        setSubmitting(false);
        setErrors({ onSave: err.message });
      });
  }

  return (
    <LoginForm
      userLoginDetails={userLoginDetails}
      onChange={handleChange}
      errors={errors}
      submitting={submitting}
      onSubmit={handleSubmit}
    ></LoginForm>
  );
};

LoginPage.propTypes = {
  userLoginDetails: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = () => {
  const userLoginDetails = newLoginDetails;
  return {
    userLoginDetails,
  };
};

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
