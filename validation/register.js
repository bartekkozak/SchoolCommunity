const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirmation = !isEmpty(data.passwordConfirmation)
    ? data.passwordConfirmation
    : "";

  if (!Validator.isLength(data.name, { min: 2, max: 25 })) {
    errors.name = "Name must be between 2 and 25 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 25 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Password must match";
  }

  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "Password confirmation field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
