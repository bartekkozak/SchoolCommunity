import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  htmlFor,
  labelText,
  value,
  onChange,
  name,
  error,
  info
}) => {
  return (
    <div>
      <div className="form-field">
        <label htmlFor={htmlFor}>{labelText}</label>
        <textarea
          className={classnames({
            "invalid-field": error
          })}
          value={value}
          onChange={onChange}
          name={name}
          id={htmlFor}
          autoComplete="off"
        />
      </div>
      {info && <div className="info">{info}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string
};

export default TextAreaFieldGroup;
