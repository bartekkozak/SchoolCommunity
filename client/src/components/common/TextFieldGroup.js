import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  labelText,
  value,
  onChange,
  type,
  name,
  error,
  disabled,
  info
}) => {
  return (
    <div>
      <div className="form-field">
        <label>{labelText}</label>
        <input
          className={classnames({
            "invalid-field": error
          })}
          value={value}
          onChange={onChange}
          type={type}
          name={name}
          size="50"
          autoComplete="off"
          disabled={disabled}
        />
      </div>
      {info && <div className="info">{info}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  labelText: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.string,
  info: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
