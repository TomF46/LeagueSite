import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import PasswordInput from "../common/PasswordInput";

const LoginForm = ({
  userLoginDetails,
  onSubmit,
  onChange,
  submitting = false,
  errors = {},
}) => {
  return (
    <form className="box" onSubmit={onSubmit}>
      <h2 className="title is-2">Login</h2>
      {errors.onSave && (
        <div className="help is-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="username"
        label="Username"
        value={userLoginDetails.username}
        onChange={onChange}
        error={errors.username}
      />

      <PasswordInput
        name="password"
        label="Password"
        value={userLoginDetails.password}
        onChange={onChange}
        error={errors.password}
      />

      <button type="submit" disabled={submitting} className="button is-primary">
        {submitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  userLoginDetails: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

export default LoginForm;
