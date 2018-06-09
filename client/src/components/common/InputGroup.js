import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputGroup = ({
  htmlFor,
  labelText,
  value,
  onChange,
  name,
  error,
  icon,
  type
}) => {
  return (
    <div>
      <div className="form-field">
        <label htmlFor={htmlFor}>{labelText}</label>
        <div className="icon-field">
          <i className={icon} />
          <input
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
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
